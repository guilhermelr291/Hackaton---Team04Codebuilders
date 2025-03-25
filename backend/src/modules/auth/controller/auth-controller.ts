import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../service/auth-service';
import { User } from '@prisma/client';
import { FieldsComparer } from '../protocols/fields-comparer';

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fieldsComparer: FieldsComparer
  ) {
    this.authService = authService;
    this.fieldsComparer = fieldsComparer;
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      this.fieldsComparer.compare(data);

      await this.authService.signUp(data);

      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
      console.log('Erro no signup: ', error);
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response<{ token: string; user: User }>,
    next: NextFunction
  ) {
    try {
      const userAndToken = await this.authService.login(req.body);

      res.status(200).json(userAndToken);
    } catch (error) {
      console.log('Erro no login: ', error);
      next(error);
    }
  }
}
