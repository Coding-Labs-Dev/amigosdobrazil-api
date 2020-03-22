import { Router, Request, Response, NextFunction } from 'express';

/**
 * Middlewares
 */

import UploadFileMiddleware from '@middlewares/UploadFileMiddleware';
import ValidatorMiddleware from '@middlewares/ValidatorMiddleware';
import AuthenticationMiddleware from '@middlewares/AuthenticationMiddleware';

/**
 * Controllers
 */

import {
  ClientController,
  FormContactController,
  FileController,
  SettingController,
  TestimonialController,
  UploadFileController,
  UserController,
  WhyUsController,
  HeroController,
  SessionController,
} from '@controllers/index';

/**
 * Validators
 */

import UserValidator from '@validators/UserValidator';
import UploadValidator from '@validators/UploadValidator';

function wrapper(
  fn: Function,
): (req: Request, res: Response, next: NextFunction) => void {
  const wrapperFn = (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
  return wrapperFn;
}

const routes = Router();

routes.post(
  '/upload/:type',
  ValidatorMiddleware(UploadValidator),
  UploadFileMiddleware.single('file'),
  wrapper(UploadFileController.store),
);

routes
  .route('/files')
  .get(wrapper(FileController.index))
  .post(wrapper(FileController.store));
routes
  .route('/files/:id')
  .get(wrapper(FileController.show))
  .put(wrapper(FileController.update))
  .delete(wrapper(FileController.delete));

routes
  .route('/sessions')
  // .get(wrapper(FileController.index))
  .post(wrapper(SessionController.store));

routes
  .route('/clients')
  .get(wrapper(ClientController.index))
  .post(wrapper(ClientController.store));
routes
  .route('/clients/:id')
  .get(wrapper(ClientController.show))
  .put(wrapper(ClientController.update))
  .delete(wrapper(ClientController.delete));

routes
  .route('/formcontacts')
  .get(wrapper(FormContactController.index))
  .post(wrapper(FormContactController.store));
routes
  .route('/formcontacts/:id')
  .get(wrapper(FormContactController.show))
  .put(wrapper(FormContactController.update))
  .delete(wrapper(FormContactController.delete));

routes
  .route('/settings')
  .get(wrapper(SettingController.index))
  .post(wrapper(SettingController.store));
routes
  .route('/settings/:id')
  .get(wrapper(SettingController.show))
  .put(wrapper(SettingController.update))
  .delete(wrapper(SettingController.delete));

routes
  .route('/testimonials')
  .get(wrapper(TestimonialController.index))
  .post(wrapper(TestimonialController.store));
routes
  .route('/testimonials/:id')
  .get(wrapper(TestimonialController.show))
  .put(wrapper(TestimonialController.update))
  .delete(wrapper(TestimonialController.delete));

routes
  .route('/users')
  .get(AuthenticationMiddleware, wrapper(UserController.index))
  .put(AuthenticationMiddleware, wrapper(UserController.update))
  .post(
    ValidatorMiddleware(UserValidator.store),
    wrapper(UserController.store),
  );
routes
  .route('/users/:id')
  .get(AuthenticationMiddleware, wrapper(UserController.show))
  .put(
    AuthenticationMiddleware,
    ValidatorMiddleware(UserValidator.update),
    wrapper(UserController.update),
  )
  .delete(AuthenticationMiddleware, wrapper(UserController.delete));

routes
  .route('/whyus')
  .get(wrapper(WhyUsController.index))
  .post(wrapper(WhyUsController.store));
routes
  .route('/whyus/:id')
  .get(wrapper(WhyUsController.show))
  .put(wrapper(WhyUsController.update))
  .delete(wrapper(WhyUsController.delete));

routes
  .route('/heroes')
  .get(wrapper(HeroController.index))
  .post(wrapper(HeroController.store));
routes
  .route('/heroes/:id')
  .get(wrapper(HeroController.show))
  .put(wrapper(HeroController.update))
  .delete(wrapper(HeroController.delete));

export default routes;
