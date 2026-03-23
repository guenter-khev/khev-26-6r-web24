const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.keywords || 'cat';
  const apiKey = process.env.APILEAGUE_KEY; 

  try {
    const response = await fetch(`https://api.apileague.com/search-memes?keywords=${query}&number=9`, {
      headers: { "x-api-key": apiKey }
    });
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
