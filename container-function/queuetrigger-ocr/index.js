module.exports = async function (context, req) {
    // Get the array of image URLs from the request body
    const imageUrls = req.body;
  
    // Get a reference to the Azure Storage Queue
    const { QueueServiceClient } = require("@azure/storage-queue");
    const queueServiceClient = QueueServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    const queueName = "urls-queue";
    const queueClient = queueServiceClient.getQueueClient(queueName);
  
    // Insert the image URLs into the Azure Storage Queue
    for (let i = 0; i < imageUrls.length; i++) {
      const message = { url: imageUrls[i] };
      const messageBuffer = Buffer.from(JSON.stringify(message));
      await queueClient.sendMessage(messageBuffer.toString("base64"));
    }
  
    // Read messages from the Azure Storage Queue and process them
    while (true) {
      const response = await queueClient.receiveMessages({ maxMessages: 10 });
      if (response.receivedMessageItems.length === 0) {
        break;
      }
  
      for (let i = 0; i < response.receivedMessageItems.length; i++) {
        const message = response.receivedMessageItems[i];
        const imageUrl = JSON.parse(Buffer.from(message.messageText, "base64").toString()).url;
  
        // Call the Image => Text API to extract text from the image
        const apiKey = "c0cbcd7832e94aeba55720a8bf1fd885";
        const apiEndpoint = "https://warehouse-vision-api.cognitiveservices.azure.com/";
        const httpOptions = {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey
          }
        };
        const requestBody = {
          url: imageUrl
        };
        const httpResponse = await axios.post(apiEndpoint, requestBody, httpOptions);
        const extractedText = httpResponse.data.extractedText;
  
        // Insert the extracted text into the database
        const { CosmosClient } = require("@azure/cosmos");
        const cosmosClient = new CosmosClient(process.env.CosmosDbConnectionString);
        const databaseName = "db-warehouse";
        const containerName = "container2";
        const container = cosmosClient.database(databaseName).container(containerName);
        const item = {
          id: message.messageId,
          url: imageUrl,
          text: extractedText
        };
        await container.items.create(item);
  
        // Delete the message from the Azure Storage Queue
        const messageClient = queueClient.getMessages();
        await messageClient.delete(message.messageId, message.popReceipt);
      }
    }
  
    // Return a success response
    context.res = {
      status: 200,
      body: "Images processed successfully"
    };
  };
  