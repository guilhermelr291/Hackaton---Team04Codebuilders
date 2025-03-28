import { z } from 'zod';

export const CreateTimeEntrySchema = z.object({
  projectId: z.coerce.number(),
  duration: z.coerce.number(),
  description: z.string(),
  date: z.string().datetime({ offset: true }),
});
