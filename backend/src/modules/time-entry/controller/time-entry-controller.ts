import { NextFunction, Request, Response } from 'express';

import { TimeEntryService } from '../service/time-entry-service';

export class TimeEntryController {
  constructor(private readonly timeEntryService: TimeEntryService) {
    this.timeEntryService = timeEntryService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const dataToSave = { userId: req.userId, ...data };

      await this.timeEntryService.create(dataToSave);

      res.status(201).json({ message: 'Temporizador criado com sucesso!' });
    } catch (error) {
      console.log('Erro ao criar temporizador: ', error);
      next(error);
    }
  }
}
