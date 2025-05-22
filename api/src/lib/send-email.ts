import { Resend } from "resend";
import { Context } from 'hono';

type SendEmail = {
  name: string;
  from: string;
  message: string;
  context: Context
}

export async function sendEmail({
  name,
  from,
  message,
  context,
}: SendEmail) {
  try {
    const resend = new Resend(context.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${name} <${from}>`,
      to: "contacto@traveltourgdl.com",
      subject: "Cotización de viaje desde el sitio web",
      text: `${message}`
    });
  } catch (e) {
    return {
      success: false,
      message: "Error al enviar el correo electrónico. Por favor intenta nuevamente más tarde."
    }
  }
  
  return {
    success: true, 
    message: "Gracias por tu consulta, pronto nos pondremos en contacto contigo lo más pronto posible" 
  };
}