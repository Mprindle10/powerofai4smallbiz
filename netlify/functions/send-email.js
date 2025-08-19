const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
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
        body: JSON.stringify({ error: 'Name and email are required' }),
      };
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'powerofai4smallbiz@gmail.com',
      replyTo: email,
      subject: `AI Kit Request from ${name} - ${email}`,
      text: `Name: ${name}\nEmail: ${email}\n\nThis person requested the AI Starter Kit from your website.\nReply directly to this email to send them the kit.`,
      html: `
        <h3>New AI Kit Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p>This person requested the AI Starter Kit from your website.</p>
        <p>Reply directly to this email to send them the kit.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
