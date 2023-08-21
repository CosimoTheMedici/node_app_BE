const nodemailer = require('nodemailer');
// const fs = require('fs');
// const path = require('path');


exports.sendEmailWithAttachment = (emailto,password,Subject) => {
  // create a nodemailer transporter
  let transporter1 = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cosmasthuku4@outlook.com', // replace with your email address
      pass: 'Devicemanger,1000', // replace with your email password
    },
    port: 587,
    secure: false,
    socketTimeout: 30000,
    connectionTimeout: 300000,
  });

  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'cosmasthuku4@outlook.com', // replace with your email address
        pass: '9T7bd4^Ukne#V*', // replace with your email password
      },
    tls: {
        ciphers: 'SSLv3'
    }
});
  //console.log("transporter",transporter)
  // read the PDF file
  //let pdf = fs.readFileSync(path.join(__dirname, 'path_to_pdf_file.pdf'));

  // create the email message

  const message = {
    from: 'cosmasthuku4@outlook.com', // replace with your email address
    to: emailto, // replace with recipient email address
    subject: Subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>Hello!</h1>
          <p>Find on this mail your login credentials.</p>
          <ul>
            <li>Username: ${emailto}</li>
            <li>Password: ${password}</li>
          </ul>
          <p>Regards</p>
          <p>Management</p>
        </body>
      </html>
    `,
  };
  

  // send the email
  try {
    transporter.sendMail(message, (error, info) => {
        if (error) {
          //console.log('Error occurred while sending email:', error);
          return false;
        }
        //console.log('Message sent successfully:', info);
        return true;
      });
  } catch (error) {
    console.log({error})
    console.log("transporter",transporter)
  }

  
}

// call the function to send the email with the PDF attachment

