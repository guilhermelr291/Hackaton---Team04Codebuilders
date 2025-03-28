import { Router } from 'express';
import { makeClientController } from '../../../common/factories/auth/client-controller-factory';
import { validate } from '../../../common/middlewares/validation-middleware';
import { ClientSchema } from '../validations/schemas';

const clientController = makeClientController();

export default (router: Router): void => {
  router.get('/clients/:id', (req, res, next) =>
    clientController.getById(req, res, next)
  );
  router.post('/clients', validate(ClientSchema), (req, res, next) =>
    clientController.create(req, res, next)
  );
  router.patch('/clients/:id', validate(ClientSchema), (req, res, next) =>
    clientController.update(req, res, next)
  );
};
