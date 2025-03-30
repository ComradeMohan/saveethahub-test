require('dotenv').config(); // Load .env variables

const axios = require('axios');

exports.handler = async (event) => {
  const { code, language, input } = JSON.parse(event.body);

  const languageMap = {
    python: 'python3',
    java: 'java',
    cpp: 'cpp17',
    c: 'c99',
  };
  const apiLanguage = languageMap[language] || language;

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: code,
      language: apiLanguage,
      stdin: input,
      versionIndex: '0',
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_API_KEY,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
