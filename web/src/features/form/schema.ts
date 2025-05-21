import { z } from "zod"

export const FormSchema = z.object({
  tripType: z.enum(['punto-punto', 'fuera-ciudad']),
  origin: z.string().min(1, { message: "Campo requerido" }),
  destination: z.string().min(1, { message: "Campo requerido" }),
  passengers: z.number().min(1, { message: "Campo requerido" }),
  departureDate: z.date(),
  returnDate: z.date(),
  
  contactName: z.string().min(1, { message: "Campo requerido" }),
  contactPhone: z.string().min(1, { message: "Campo requerido" }),
  
  contactEmail: z.string().email({ message: "Email inválido" }).optional(),
})