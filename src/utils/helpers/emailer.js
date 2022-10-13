const nodemailer = require("nodemailer");
// NOS IMPORTAMOS EL TEMPLATE DE HTTML PARA EL EMAIL
const henryTemplate = require("../helpers/template");
// IMPORTAMOS NODEMAILER-SENDGRID
const nodemailerSendgrid = require("nodemailer-sendgrid");
const { sendgridApi } = require("../config/index");

// ESTA ES LA FUNCION QUE CREA EL TRANSPORT
const createTrans = () => {
  // -- ESTE ES EL METODO PARA CREAR UN TRANSPORT PARA MAILTRAP (ES PARA HACER TESTING) --
  /*   const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "52736b9cf36aba",
      pass: "8e4328b143c74e",
    },
  }); */

  // -- ESTE ES EL METODO PARA CREAR UN TRANSPORT PARA NODEMAILER-SENDGRID --
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: sendgridApi,
    })
  );
  //console.log(transport);
  return transport; // nos retorna la coneccion
};

// funcion que se va a encargar de disparar el correo
const sendMail = async (user) => {
  //console.log(user.email);
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from: '"DisneyApi" <martinfiguerola.dev@gmail.com>', // email de donde envian el correo
    to: `${user.email}`, // correo de la persona a la que vamos a enviar el correo
    subject: `Hi ${user.name}!`, // Subject line
    html: henryTemplate, // html body
  });
  // muestra el id del envio para ver si se ejecuto correctamente
  console.log("Message sent: %s", info.messageId);

  return;
};

// exportamos una funcion
module.exports = (user) => sendMail(user);
