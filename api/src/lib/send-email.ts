import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
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
  const msg = createMimeMessage();
  msg.setSender({ name: name, addr: `${from}` });
  msg.setRecipient("contacto@traveltourgdl.com");
  msg.setSubject("Cotización de viaje desde el sitio web");
  msg.addMessage({
      contentType: 'text/plain',
      data: message
  });

  var emailMsg = new EmailMessage(
    `${from}`,
    "contacto@traveltourgdl.com",
    msg.asRaw()
  );
  
  try {
    await context.env.SEB.send(emailMsg);
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

// export default {
//  async fetch(request, env) {
//    const msg = createMimeMessage();
//    msg.setSender({ name: "GPT-4", addr: "<SENDER>@example.com" });
//    msg.setRecipient("contacto@traveltourgdl.com");
//    msg.setSubject("An email generated in a worker");
//    msg.addMessage({
//        contentType: 'text/plain',
//        data: `Congratulations, you just sent an email from a worker.`
//    });

//    var message = new EmailMessage(
//      msg.getSender(),
//      "contacto@traveltourgdl.com",
//      msg.asRaw()
//    );
//    try {
//      await env.SEB.send(message);
//    } catch (e) {
//      return new Response(e.message);
//    }

//    return new Response("Hello Send Email World!");
//  },
// };


// export default {
//   async email(message, env, ctx) {
//     const allowList = ["friend@example.com", "coworker@example.com"];
//     if (allowList.indexOf(message.from) == -1) {
//       message.setReject("Address not allowed");
//     } else {
//       await message.forward("inbox@corp");
//     }
//   },
// };