import { Router } from 'express';
import { validate } from '../../../common/middlewares/validation-middleware';
import { ProjectController } from '../controller/project-controller';
import { ProjectService } from '../service/project-service';
import { CreateProjectSchema } from '../validations/schemas';
import { ProjectRepository } from '../repository/project-repository';
import { ClientRepository } from '../../client/repository/client-repository';

const projectController = new ProjectController(
  new ProjectService(new ProjectRepository(), new ClientRepository())
);

export default (router: Router): void => {
  router.post('/projects', validate(CreateProjectSchema), (req, res, next) =>
    projectController.create(req, res, next)
  );
};
