import { Router } from 'express';
import { validate } from '../../../common/middlewares/validation-middleware';
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from '../validations/schemas';
import { makeProjectController } from '../../../common/factories/auth/project-controller-factory';

const projectController = makeProjectController();

export default (router: Router): void => {
  router.post('/projects', validate(CreateProjectSchema), (req, res, next) =>
    projectController.create(req, res, next)
  );
  router.patch(
    '/projects/:id',
    validate(UpdateProjectSchema),
    (req, res, next) => projectController.update(req, res, next)
  );
};
