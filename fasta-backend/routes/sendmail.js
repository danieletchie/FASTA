const express = require('express');

const router = express.Router();

router.post('/send', (req, res) => {
  // what will be sent to the registrants after registering
    const output = `
          <div style='margin: 0 auto; background: #ededed; border:1px solid #ccc'>
          <h1>Hey! ${req.body.email} Welcome to Fasta</h1>
          <hr>
          <p>FASTA helps you plan your Trip and allow you to go faster, click this <a href='#'>Link</a> to confirm your registration</p>
          <h4>Welcome on board</h4>
          </div>
          `;
    // Nodemailer setup
    let fastaMailer = nodemailer.createTransport({
        host: "mail.google.com",
        port: 287,
        secure: false,
        auth: {
          user: "fastamovement@gmail.com", //gmail created just for testing purposes
          pass: "Fasta123" //for testing purposes
        }
      });

      let mailOptions = {
          from: '"Welcome to FASTA" <fastamovement@gmail.com>',
          to: `${req.body.email}`,
          subject: 'Your Registration was successful',
          text: 'Hey there, it’s our first message from FASTA Team;) ', 
          html: output,
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
});
})

module.exports = router;
