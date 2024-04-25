import { z } from 'zod';
import { BaseInputSchema, BaseOutputSchema } from '../base.dto';

const CCInputSchema = BaseInputSchema.extend({
  cCId: z.number().min(1).optional(),
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters long.')
    .toLowerCase()
    .refine(
      (value) => /^[a-zA-Z0-9]*$/.test(value),
      'Name must not contain special characters.'
    ),
  description: z.string().max(500).optional(),
});

export const CCOutputSchema = BaseOutputSchema.extend({
  catalog_category_id: z.number(),
  name: z.string(),
  description: z.string().optional(),
}).transform((dbData) => ({
  cCId: dbData.catalog_category_id,
  uuid: dbData.uuid,
  name: dbData.name,
  description: dbData.description,
  accessLevel: dbData.access_level,
  isDeleted: dbData.is_deleted,
  createdAt: dbData.created_at,
  createdBy: dbData.created_by,
  updatedAt: dbData.updated_at,
  updatedBy: dbData.updated_by,
}));

export const CCCreateSchema = CCInputSchema.omit({
  cCId: true,
  createdBy: true,
  updatedBy: true,
  isDeleted: true,
})
  .extend({
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  })
  .transform((appData) => ({
    name: appData.name,
    description: appData.description,
    access_level: appData.accessLevel,
    created_at: appData.createdAt,
    updated_at: appData.updatedAt,
  }));

export const CCUpdateSchema = CCInputSchema.pick({
  name: true,
  description: true,
  accessLevel: true,
  updatedBy: true,
})
  .partial()
  .extend({
    updatedAt: z.date().default(() => new Date()),
  })
  .superRefine((data, context) => {
    if (Object.keys(data).length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'No valid fields provided to update.',
      });
    }
  })
  .transform((appData) => ({
    name: appData.name,
    description: appData.description,
    access_level: appData.accessLevel,
    updated_at: appData.updatedAt,
    updated_by: appData.updatedBy,
  }));

export type CCOutput = z.infer<typeof CCOutputSchema>;
export type CCCreate = z.infer<typeof CCCreateSchema>;
export type CCUpdate = z.infer<typeof CCUpdateSchema>;
