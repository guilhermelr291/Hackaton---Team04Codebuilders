import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../service/client-service';

export class ClientController {
  constructor(private readonly clientService: ClientService) {
    this.clientService = clientService;
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const client = await this.clientService.getById(id);

      res.status(200).json(client);
    } catch (error) {
      console.log('Erro ao excluir projeto: ', error);
      next(error);
    }
  }
}
