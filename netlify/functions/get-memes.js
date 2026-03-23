// Diese Datei läuft auf einem Server, nicht im Browser!
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.keywords;
  const apiKey = process.env.APILEAGUE_KEY; // Key sicher in Netlify hinterlegt

  const response = await fetch(`https://api.apileague.com/search-memes?keywords=${query}`, {
    headers: { "x-api-key": apiKey }
  });
  
  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Hier erlaubst DU den Zugriff
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};
