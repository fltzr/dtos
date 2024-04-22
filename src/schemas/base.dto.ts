// import { z } from 'zod';

// export const BaseOutputSchema = z
//   .object({
//     uuid: z.coerce.string(),
//     access_level: z.coerce.number().default(1),
//     is_deleted: z.coerce.boolean().default(false),
//     created_by: z.string(),
//     created_at: z.coerce.string(),
//     updated_by: z.coerce.string(),
//     updated_at: z.coerce.string(),
//   })
//   .partial({ created_by: true });

// export const BaseInputSchema = z.object({
//   accessLevel: z.number().default(1),
//   isDeleted: z.boolean().default(false),
//   createdBy: z.string(),
//   updatedBy: z.string(),
// });

// export type BaseOutputSchema = z.infer<typeof BaseOutputSchema>;
// export type BaseInputSchema = z.infer<typeof BaseInputSchema>;

import { z } from 'zod';

export const BaseInputSchema = z.object({
  accessLevel: z.coerce.number().min(1).max(6),
  isDeleted: z.boolean().default(false),
  createdBy: z.string().min(1).max(10),
  updatedBy: z.string().min(1).max(10),
});

export const BaseOutputSchema = z.object({
  uuid: z.string().uuid(),
  access_level: z.coerce.number().min(1),
  is_deleted: z.coerce.boolean(),
  created_by: z.string(),
  created_at: z.date(),
  updated_by: z.string(),
  updated_at: z.date(),
});

export type BaseInput = z.infer<typeof BaseInputSchema>;
export type BaseOutput = z.infer<typeof BaseOutputSchema>;
