// netlify/functions/trefle-proxy.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
  const API_TOKEN = "QsalOZWocweRZaED9kT3tBwIOMkRY58PYlRVBZx8ajc"; // your token
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'q' parameter" }),
    };
  }

  const url = `https://trefle.io/api/v1/plants/search?token=${API_TOKEN}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from Trefle" }),
    };
  }
};
