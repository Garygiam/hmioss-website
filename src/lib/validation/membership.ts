import { z } from "zod";

export const membershipSchema = z.object({
  membershipType: z.enum(["individual", "corporate", "lifetime"]),
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6),
  idNumber: z.string().trim().min(4),
  reason: z.string().trim().min(10),
});

export type MembershipPayload = z.infer<typeof membershipSchema>;
