import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '../service/project-service';

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
    this.projectService = projectService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const dataToSave = { userId: req.userId, ...data };

      await this.projectService.create(dataToSave);

      res.status(201).json({ message: 'Projeto criado com sucesso!' });
    } catch (error) {
      console.log('Erro ao criar projeto: ', error);
      next(error);
    }
  }
}
