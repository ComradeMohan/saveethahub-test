const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const readFile = promisify(fs.readFile);

exports.handler = async (event, context) => {
  try {
    // Verify authentication
    const user = context.clientContext.user;
    if (!user) return { statusCode: 401, body: 'Unauthorized' };

    // Validate request
    const fileHash = event.queryStringParameters.file;
    if (!/^[a-f0-9]{64}$/.test(fileHash)) {
      return { statusCode: 400, body: 'Invalid file hash' };
    }

    // Map hash to actual filename (implement your own mapping logic)
    const fileName = await getFileNameFromHash(fileHash);
    
    // Path to private PDFs directory
    const filePath = path.join(process.cwd(), 'private-pdfs', fileName);
    
    // Read and serve file
    const pdfBuffer = await readFile(filePath);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

// Example hash mapping - implement your own secure version
async function getFileNameFromHash(hash) {
  const manifest = {
    'examplehash123...': 'document1.pdf'
  };
  return manifest[hash] || null;
}