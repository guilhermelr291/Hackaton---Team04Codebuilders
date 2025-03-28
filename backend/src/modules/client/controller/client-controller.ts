import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../service/client-service';

export class ClientController {
  constructor(private readonly clientService: ClientService) {
    this.clientService = clientService;
  }

  async getUserClients(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const clients = await this.clientService.getUserClients(userId);

      res.status(200).json(clients);
    } catch (error) {
      console.log('Erro ao obter clientes: ', error);
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const id = Number(req.params.id);

      const client = await this.clientService.getById(id, userId);

      res.status(200).json(client);
    } catch (error) {
      console.log('Erro ao obter cliente: ', error);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const dataToSave = { userId: req.userId, ...data };

      await this.clientService.create(dataToSave);

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

      const dataToUpdate = { id, userId: req.userId, ...data };

      await this.clientService.update(dataToUpdate);

      res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
      console.log('Erro ao atualizar cliente: ', error);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const userId = req.userId!;

      await this.clientService.delete(id, userId);

      res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    } catch (error) {
      console.log('Erro ao excluir cliente: ', error);
      next(error);
    }
  }
}
