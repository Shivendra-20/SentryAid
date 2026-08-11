import emailjs from "@emailjs/browser";
export const sendMail = (toMail, msg, title) => {
  const serviceID = "service_l2q428w";
  const templateId = "template_g5l3305";
  const publicKey = "qJ4Tcvue6l9SD1xtf";

  const templateParam = {
    title: title,
    to_name: toMail,
    message: msg,
    name: "Admin",
  };

  emailjs
    .send(
      serviceID, // from Email Services
      templateId, // from your template
      templateParam,
      publicKey // from Account settings
    )
    .then((result) => {
      console.log("Email sent!", result.text);
      // alert("Email sent!");
    })
    .catch((error) => {
      console.error("Email failed:", error);
      alert("Failed to send email");
    });
};
