import { z } from 'zod';

export const CreateProjectSchema = z.object({
  name: z.string(),
  clientId: z.coerce.number(),
  status: z
    .enum([
      'PLANNING',
      'IN_PROGRESS',
      'COMPLETED',
      'PENDING_PAYMENT',
      'OVERDUE',
    ])
    .optional(),
  price: z.coerce.number().optional(),
});
export const UpdateProjectSchema = z.object({
  name: z.string(),
  status: z
    .enum([
      'PLANNING',
      'IN_PROGRESS',
      'COMPLETED',
      'PENDING_PAYMENT',
      'OVERDUE',
    ])
    .optional(),
  price: z.coerce.number().optional(),
});
