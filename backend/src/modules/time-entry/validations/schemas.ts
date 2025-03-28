import { z } from 'zod';

export const CreateTimeEntrySchema = z.object({
  projectId: z.coerce.number(),
  duration: z.coerce.number(),
  description: z.string(),
  date: z.string().datetime({ offset: true }),
});
export const UpdateTimeEntrySchema = z.object({
  duration: z.coerce.number().optional(),
  description: z.string().optional(),
  date: z.string().datetime({ offset: true }).optional(),
});
