var nodemailer = require("nodemailer");

const mailer = async (req, res) => {
  const { emailTo, subject, body, fromName, electionId, electionTitle } =
    req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });

  var mailOptions = {
    from: fromName,
    to: emailTo,
    subject: subject,
    text: `Election Id: ${electionId}\nElection Title: ${electionTitle}\n\n${body}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(200).json("error");
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json("sent");
    }
  });
};

module.exports = mailer;
