import { z } from 'zod';

export const PSCSchema = z.object({
  uuid: z.string(),
  description: z.string(),
  categoryName: z.string(),
  mName: z.string(),
  productTypeName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PSC = z.infer<typeof PSCSchema>;
