const router = require('express').Router();
const transporter = require('../../configs/nodemailer');

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  const maped = JSON.parse(text).map(
    (el) =>
      `Номер носка: ${el.id}\n Цвет:${el.color} \n Номер узора:${el.pattern} \n Цвет узора:${el.patternColor} \n Номер картинки:${el.picture} \n Количество:${el.quantity}\n\n`,
  );
  const finalText = `Подробности вашего заказа: \n\n ${maped.join('')} Спасибо за ваш заказ!!!`;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: finalText,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(200).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
