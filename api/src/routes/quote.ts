import type { QuoteInsert } from '../db/schema';

import { z } from 'zod';
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { zValidator } from "@hono/zod-validator";

import { dbConn } from "../db/index";
import { quotes } from '../db/schema';
import { sendEmail } from '../lib/send-email';
import createRouter from "../lib/create-router";

const schema = z.object({
  tripType: z.enum(["punto-punto", "fuera-ciudad"], {
    message: "Tipo de viaje no válido",
  }),
  origin: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  destination: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  departureDate: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  returnDate: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  passengers: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  contactName: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  contactPhone: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "Campo inválido",
  }),
  contactEmail: z.string().optional(),
});

const quoteRouter = createRouter();
quoteRouter.post(
  "/",
  zValidator('json', schema), 
  async ( c ) => {
    try {
      const db = dbConn(c.env.DB);
      const rawValues = await c.req.json();
      const values: QuoteInsert = {
        ...rawValues,
        departureDate: rawValues.departureDate ? new Date(rawValues.departureDate) : undefined,
        returnDate: rawValues.returnDate ? new Date(rawValues.returnDate) : undefined
      };
      const result = await db.insert(quotes).values(values).returning({ id: quotes.id });

      if (!result || result.length === 0) {
        return c.json({
          success: false,
          message: "Hubo un problema al generar la cotización, por favor intenta nuevamente"
        }, 500);
      }

      const emailResult = await sendEmail({
        name: values.contactName,
        from: values.contactEmail || "Sin email",
        message: `
          Nombre: ${values.contactName} \n
          Teléfono: ${values.contactPhone} \n
          Email: ${values.contactEmail || "No proporcionado"} \n
          Tipo de viaje: ${values.tripType} \n
          Origen: ${values.origin} \n
          Destino: ${values.destination} \n
          Fecha de salida: ${format(values.departureDate, 'PPP', { locale: es})} \n
          Fecha de regreso: ${format(values.returnDate, 'PPP', { locale: es})} \n
          Pasajeros: ${values.passengers}
        `,
        context: c
      })
      console.warn("EMAIL RESULT: ", emailResult);

      return c.json({
        success: true,
        message: "Gracias por tu consulta, pronto nos pondremos en contacto contigo lo más pronto posible"
      }, 200);
    } catch (error) {
      return c.json({
        success: false,
        message: "Error interno del servidor"
      }, 500);
    }
  }
);

export default quoteRouter;