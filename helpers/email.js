import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  

  const { email, nombre, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Informacio del emeail

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyecctos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Confirma tu cuenta",
    text: "Confirma tu cuenta en Uptask",
    html: `
      <p>Hola: ${nombre} Comprueba tu cuenta en Uptask</p>
      <p>Tu cuenta ya esta casi lista, solo debes comrprobarla en el siguiente enlace: </p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `
  })
}


export const emailOlvidePassword = async (datos) => {
  

  const { email, nombre, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Informacio del emeail

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyecctos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Reestablecer Password",
    text: "Reestablece tu password en UpTask",
    html: `
      <p>Hola: ${nombre}, Reestablece tu password en Uptask</p>
      <p>Sigue el siguiente enlace para generar un nuevo password: </p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>

      <p>Si tu no solicitaste este correo, puedes ignorar el mensaje</p>
    
    
    `
  })
}
