const sgMail = require("@sendgrid/mail");
const { text } = require("express");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kanishthajaiswal0@gmail.com",
    subject: "Thanks for joining in",
    text: `Welcome to the Task app, ${name}. Hope you have a good time using our app. - TASK APP`,
  });
};

const sendExitEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kanishthajaiswal0@gmail.com",
    subject: "Adios Amigo!",
    text: `Hey, ${name}! It is sad to see you leave. But We hope we will meet again. Thankyou for using our app. :)`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendExitEmail,
};
