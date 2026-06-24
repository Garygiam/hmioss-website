import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  subject: z.string().trim().min(2),
  message: z.string().trim().min(10),
});

export type ContactPayload = z.infer<typeof contactSchema>;
