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
      console.log('Erro ao obter cliente: ', error);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await this.clientService.create(data);

      res.status(201).json({ message: 'Cliente criado com sucesso!' });
    } catch (error) {
      console.log('Erro ao criar cliente: ', error);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const id = Number(req.params.id);

      await this.clientService.update(id, data);

      res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
      console.log('Erro ao atualizar cliente: ', error);
      next(error);
    }
  }
}
