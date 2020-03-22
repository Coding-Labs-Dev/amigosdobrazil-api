import { Router, Request, Response, NextFunction } from 'express';

/**
 * Middlewares
 */

import {
  UploadFileMiddleware,
  ValidatorMiddleware,
  AuthenticationMiddleware,
} from '@middlewares/index';

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
  TripController,
  PaymentPlanController,
  IncludeController,
} from '@controllers/index';

/**
 * Validators
 */

import {
  ClientValidator,
  FormContactValidator,
  HeroValidator,
  SettingValidator,
  TestimonialValidator,
  WhyUsValidator,
  UserValidator,
  UploadValidator,
  SessionValidator,
  TripValidator,
  PaymentPlanValidator,
  IncludeValidator,
} from '@validators/index';

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
  .post(
    ValidatorMiddleware(SessionValidator),
    wrapper(SessionController.store),
  );

routes
  .route('/clients')
  .get(AuthenticationMiddleware, wrapper(ClientController.index))
  .post(ValidatorMiddleware(ClientValidator), wrapper(ClientController.store));

routes.use(
  '/clients/:id',
  AuthenticationMiddleware,
  ValidatorMiddleware(ClientValidator),
);
routes
  .route('/clients/:id')
  .get(wrapper(ClientController.show))
  .put(wrapper(ClientController.update))
  .delete(wrapper(ClientController.delete));

routes
  .route('/formcontacts')
  .get(AuthenticationMiddleware, wrapper(FormContactController.index))
  .post(
    ValidatorMiddleware(FormContactValidator),
    wrapper(FormContactController.store),
  );
routes.use(
  '/formcontacts/:id',
  AuthenticationMiddleware,
  ValidatorMiddleware(FormContactValidator),
);
routes
  .route('/formcontacts/:id')
  .get(wrapper(FormContactController.show))
  .put(wrapper(FormContactController.update))
  .delete(wrapper(FormContactController.delete));

routes
  .route('/settings')
  .get(wrapper(SettingController.index))
  .post(
    AuthenticationMiddleware,
    ValidatorMiddleware(SettingValidator),
    wrapper(SettingController.store),
  );

routes.use(
  '/settings/:id',
  AuthenticationMiddleware,
  ValidatorMiddleware(SettingValidator),
);
routes
  .route('/settings/:id')
  .get(wrapper(SettingController.show))
  .put(wrapper(SettingController.update))
  .delete(wrapper(SettingController.delete));

routes
  .route('/testimonials')
  .get(wrapper(TestimonialController.index))
  .post(
    AuthenticationMiddleware,
    ValidatorMiddleware(TestimonialValidator),
    wrapper(TestimonialController.store),
  );
routes.use(
  '/testimonials',
  AuthenticationMiddleware,
  ValidatorMiddleware(TestimonialValidator),
);
routes
  .route('/testimonials/:id')
  .get(wrapper(TestimonialController.show))
  .put(wrapper(TestimonialController.update))
  .delete(wrapper(TestimonialController.delete));

routes
  .route('/users')
  .get(AuthenticationMiddleware, wrapper(UserController.index))
  .put(
    AuthenticationMiddleware,
    ValidatorMiddleware(UserValidator),
    wrapper(UserController.update),
  )
  .post(ValidatorMiddleware(UserValidator), wrapper(UserController.store));
routes.use(
  '/users/:id',
  AuthenticationMiddleware,
  ValidatorMiddleware(UserValidator),
);
routes
  .route('/users/:id')
  .get(AuthenticationMiddleware, wrapper(UserController.show))
  .put(
    AuthenticationMiddleware,
    ValidatorMiddleware(UserValidator),
    wrapper(UserController.update),
  )
  .delete(AuthenticationMiddleware, wrapper(UserController.delete));

routes
  .route('/whyus')
  .get(wrapper(WhyUsController.index))
  .post(
    AuthenticationMiddleware,
    ValidatorMiddleware(WhyUsValidator),
    wrapper(WhyUsController.store),
  );
routes.use(
  '/whyus/:id',
  AuthenticationMiddleware,
  ValidatorMiddleware(WhyUsValidator),
);
routes
  .route('/whyus/:id')
  .get(wrapper(WhyUsController.show))
  .put(wrapper(WhyUsController.update))
  .delete(wrapper(WhyUsController.delete));

routes
  .route('/heroes')
  .get(wrapper(HeroController.index))
  .post(
    AuthenticationMiddleware,
    ValidatorMiddleware(HeroValidator),
    wrapper(HeroController.store),
  );
routes.use(
  '/heroes/:id',
  AuthenticationMiddleware,
  ValidatorMiddleware(HeroValidator),
);
routes
  .route('/heroes/:id')
  .get(wrapper(HeroController.show))
  .put(wrapper(HeroController.update))
  .delete(wrapper(HeroController.delete));
routes
  .route('/trips')
  .get(wrapper(TripController.index))
  .post(
    AuthenticationMiddleware,
    ValidatorMiddleware(TripValidator),
    wrapper(TripController.store),
  );
routes
  .route('/trips/:id')
  .get(ValidatorMiddleware(TripValidator), wrapper(TripController.show))
  .put(
    AuthenticationMiddleware,
    ValidatorMiddleware(TripValidator),
    wrapper(TripController.update),
  )
  .delete(
    AuthenticationMiddleware,
    ValidatorMiddleware(TripValidator),
    wrapper(TripController.delete),
  );

/**
 *  Admin Only Routes
 */

routes.use(
  '/includes',
  AuthenticationMiddleware,
  ValidatorMiddleware(IncludeValidator),
);
routes
  .route('/includes')
  .get(wrapper(IncludeController.index))
  .post(wrapper(IncludeController.store));
routes
  .route('/includes/:id')
  .put(wrapper(IncludeController.update))
  .get(wrapper(IncludeController.show))
  .delete(wrapper(IncludeController.delete));

routes.use(
  '/paymentplans',
  AuthenticationMiddleware,
  ValidatorMiddleware(PaymentPlanValidator),
);
routes
  .route('/includes')
  .get(wrapper(PaymentPlanController.index))
  .post(wrapper(PaymentPlanController.store));
routes
  .route('/includes/:id')
  .put(wrapper(PaymentPlanController.update))
  .get(wrapper(PaymentPlanController.show))
  .delete(wrapper(PaymentPlanController.delete));

export default routes;
