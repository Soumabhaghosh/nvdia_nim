const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
})
 
async function main(prompt) {
  const completion = await openai.chat.completions.create({
    model: "meta/llama-3.1-8b-instruct",
    messages: [{"role":"user","content":`${prompt}`}],
    temperature: 0.2,
    top_p: 0.7,
    max_tokens: 1024,
    stream: true
  })
  
  var str=""

  for await (const chunk of completion) {
    str+=`${chunk.choices[0]?.delta?.content || ''}`
  }
  
  return str

}

const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors()) 

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a POST route
app.post('/submit-data',  async (req, res) => {
    // Access the data sent in the POST request body
    const data = req.body;

    
    const response= await main(`${data.message}`)

  res.send(response)
    

    // Perform any necessary processing with the data
    // For example, save it to a database, process it, etc.

    // Send a response back to the client
    

});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


