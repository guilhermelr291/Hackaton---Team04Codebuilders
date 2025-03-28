import prisma from '../../../prisma/db';
import { CreateTimeEntryParams } from '../service/time-entry-service';

export class TimeEntryRepository {
  async create(data: CreateTimeEntryParams) {
    const timeEntry = await prisma.timeEntry.create({ data });
    return timeEntry;
  }
}
