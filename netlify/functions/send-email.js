exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: 'Method Not Allowed',
    };
  }

  try {
    // Parse the form data
    const data = JSON.parse(event.body);
    const { name, email } = data;

    // Validate required fields
    if (!name || !email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Name and email are required' }),
      };
    }

    // Instead of sending email directly, we'll create a mailto link
    // This is a simple approach that works without server email configuration
    const subject = encodeURIComponent(`AI Kit Request from ${name} - ${email}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nThis person requested the AI Starter Kit from your website.\nReply directly to this email to send them the kit.`);
    const mailtoLink = `mailto:powerofai4smallbiz@gmail.com?subject=${subject}&body=${body}`;

    // Return success with the mailto link
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        message: 'Request processed successfully',
        mailtoLink: mailtoLink,
        name: name,
        email: email
      }),
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Failed to process request' }),
    };
  }
};
