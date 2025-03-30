exports.handler = async (event) => {
    const pdfUrl = event.queryStringParameters.file;
    
    if (!pdfUrl) {
      return {
        statusCode: 400,
        body: "Missing file parameter",
      };
    }
  
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline", // Prevents download prompt
      },
      body: pdfUrl, // Fetch and stream the PDF here if needed
    };
  };
  