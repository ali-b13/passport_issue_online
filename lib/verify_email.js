"use server"
import mailgun from 'mailgun-js';
mailgun({
    apiKey: process.env.API_KEY_MAILGUN ,
    domain: process.env.DOMAIN_MAILGUN ,
  });


  
  
 export const verify_email=async(email,token)=>{
  console.log("verifying")
    const htmlContent = `
    <html>
      <head>
        <style>
          /* Add CSS styles here */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .otp {
            font-weight: bold;
            font-size: 1.2em;
            color: #ff6600; /* Orange color for emphasis */
          }
        </style>
      </head>
      <body>
        <p>Hello,</p>
        <p>The OTP code is:</p>
        <p class="otp">${token}</p>
        <p>Please make sure to write it down or use it as required.</p>
        <p>Thank you!</p>
      </body>
    </html>
  `;
  const data = {
    from: 'ABC BANK <aliiskran004@gmail.com>',
    to: email,
    subject: 'Verify Your Email on ABC BANK',
    html: htmlContent
  };
  
  console.log("to send")
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', body);
    }
  });
 }