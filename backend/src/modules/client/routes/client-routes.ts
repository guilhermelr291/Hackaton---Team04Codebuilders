import { Router } from 'express';
import { makeClientController } from '../../../common/factories/auth/client-controller-factory';

const clientController = makeClientController();

export default (router: Router): void => {
  router.get('/clients/:id', (req, res, next) =>
    clientController.getById(req, res, next)
  );
};
