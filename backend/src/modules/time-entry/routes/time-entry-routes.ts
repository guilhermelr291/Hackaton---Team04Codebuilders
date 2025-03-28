import { Router } from 'express';
import { makeTimeEntryController } from '../../../common/factories/auth/time-entry-controller-factory';
import { validate } from '../../../common/middlewares/validation-middleware';
import { CreateTimeEntrySchema } from '../validations/schemas';

const timeEntryController = makeTimeEntryController();

export default (router: Router): void => {
  router.post(
    '/time-entries',
    validate(CreateTimeEntrySchema),
    (req, res, next) => timeEntryController.create(req, res, next)
  );
};
