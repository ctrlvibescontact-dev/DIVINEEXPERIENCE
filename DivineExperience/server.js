const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');

const upload = multer();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD"
    }
  });

  const mailOptions = {
    from: email,
    to: "YOUR_EMAIL@gmail.com",
    subject: `New Booking Inquiry from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (err) {
    console.error(err);
    res.send("Failed to send message.");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
