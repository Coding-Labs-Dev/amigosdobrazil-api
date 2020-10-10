import { Router } from 'express';

import wrapper from '@utils/Wrapper';

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
  // UploadFileController,
  UserController,
  WhyUsController,
  HeroController,
  SessionController,
  TripController,
  PaymentPlanController,
  ItineraryController,
  IncludeController,
  DocumentController,
  NextTripController,
  PaymentSessionController,
  PaymentController,
  TransactionController,
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
  FileValidator,
  SessionValidator,
  TripValidator,
  PaymentPlanValidator,
  ItineraryValidator,
  IncludeValidator,
  DocumentValidator,
} from '@validators/index';
import TransportPlanController from '@controllers/TransportPlanController';

const routes = Router();

routes
  .route('/sessions')
  .post(ValidatorMiddleware(SessionValidator), wrapper(SessionController.store))
  .get(AuthenticationMiddleware, wrapper(SessionController.show))
  .put(wrapper(SessionController.update));

routes.use(AuthenticationMiddleware);

routes
  .route('/files')
  .get(ValidatorMiddleware(FileValidator), wrapper(FileController.index))
  .post(
    UploadFileMiddleware.array('files'),
    ValidatorMiddleware(FileValidator),
    wrapper(FileController.store),
  );
routes
  .route('/files/:id')
  .get(ValidatorMiddleware(FileValidator), wrapper(FileController.show))
  .delete(ValidatorMiddleware(FileValidator), FileController.delete);

routes
  .route('/clients')
  .get(wrapper(ClientController.index))
  .post(ValidatorMiddleware(ClientValidator), wrapper(ClientController.store));
routes.use('/clients/:id', ValidatorMiddleware(ClientValidator));
routes
  .route('/clients/:id')
  .get(wrapper(ClientController.show))
  .put(wrapper(ClientController.update))
  .delete(ClientController.delete);

routes
  .route('/formcontacts')
  .get(wrapper(FormContactController.index))
  .post(
    ValidatorMiddleware(FormContactValidator),
    wrapper(FormContactController.store),
  );
routes.use('/formcontacts/:id', ValidatorMiddleware(FormContactValidator));
routes
  .route('/formcontacts/:id')
  .get(wrapper(FormContactController.show))
  .put(wrapper(FormContactController.update))
  .delete(FormContactController.delete);

routes
  .route('/settings')
  .post(ValidatorMiddleware(SettingValidator), wrapper(SettingController.store))
  .get(wrapper(SettingController.show))
  .put(
    ValidatorMiddleware(SettingValidator),
    wrapper(SettingController.update),
  );

routes
  .route('/testimonials')
  .get(wrapper(TestimonialController.index))
  .post(
    ValidatorMiddleware(TestimonialValidator),
    wrapper(TestimonialController.store),
  );
routes.use('/testimonials', ValidatorMiddleware(TestimonialValidator));
routes
  .route('/testimonials/:id')
  .get(wrapper(TestimonialController.show))
  .put(wrapper(TestimonialController.update))
  .delete(TestimonialController.delete);

routes
  .route('/users')
  .get(wrapper(UserController.index))
  .put(ValidatorMiddleware(UserValidator), wrapper(UserController.update))
  .post(ValidatorMiddleware(UserValidator), wrapper(UserController.store));

routes.use('/users/:id', ValidatorMiddleware(UserValidator));

routes
  .route('/users/:id')
  .get(wrapper(UserController.show))
  .put(ValidatorMiddleware(UserValidator), wrapper(UserController.update))
  .delete(UserController.delete);

routes
  .route('/whyus')
  .get(wrapper(WhyUsController.index))
  .post(ValidatorMiddleware(WhyUsValidator), wrapper(WhyUsController.store));
routes.use('/whyus/:id', ValidatorMiddleware(WhyUsValidator));
routes
  .route('/whyus/:id')
  .get(wrapper(WhyUsController.show))
  .put(wrapper(WhyUsController.update))
  .delete(WhyUsController.delete);

routes
  .route('/heroes')
  .get(wrapper(HeroController.index))
  .post(ValidatorMiddleware(HeroValidator), wrapper(HeroController.store));
routes.use('/heroes/:id', ValidatorMiddleware(HeroValidator));
routes
  .route('/heroes/:id')
  .get(wrapper(HeroController.show))
  .put(wrapper(HeroController.update))
  .delete(HeroController.delete);

routes
  .route('/trips')
  .get(wrapper(TripController.index))
  .post(ValidatorMiddleware(TripValidator), wrapper(TripController.store));
routes
  .route('/trips/:id')
  .get(ValidatorMiddleware(TripValidator), wrapper(TripController.show))
  .put(ValidatorMiddleware(TripValidator), wrapper(TripController.update))
  .delete(ValidatorMiddleware(TripValidator), TripController.delete);

routes.use(
  '/trips/:tripId/itineraries',
  ValidatorMiddleware(ItineraryValidator),
);
routes
  .route('/trips/:tripId/itineraries')
  .get(wrapper(ItineraryController.index))
  .post(wrapper(ItineraryController.store));
routes
  .route('/trips/:tripId/itineraries/:id')
  .put(wrapper(ItineraryController.update))
  .get(wrapper(ItineraryController.show))
  .delete(ItineraryController.delete);

routes.use('/trips/:tripId/includes', ValidatorMiddleware(IncludeValidator));
routes
  .route('/trips/:tripId/includes')
  .get(wrapper(IncludeController.index))
  .post(wrapper(IncludeController.store));
routes
  .route('/trips/:tripId/includes/:id')
  .put(wrapper(IncludeController.update))
  .get(wrapper(IncludeController.show))
  .delete(IncludeController.delete);

routes.use(
  '/trips/:tripId/paymentplans',
  ValidatorMiddleware(PaymentPlanValidator),
);
routes
  .route('/trips/:tripId/paymentplans')
  .get(wrapper(PaymentPlanController.index))
  .post(wrapper(PaymentPlanController.store));
routes
  .route('/trips/:tripId/paymentplans/:id')
  .put(wrapper(PaymentPlanController.update))
  .get(wrapper(PaymentPlanController.show))
  .delete(PaymentPlanController.delete);

routes
  .route('/trips/:tripId/transportplans')
  .get(wrapper(TransportPlanController.index));

routes.get('/nexttrips', wrapper(NextTripController.index));

routes.route('/paymentsessions').post(wrapper(PaymentSessionController.store));
routes.route('/book/:slug').post(wrapper(PaymentController.store));
routes.route('/transaction').post(wrapper(TransactionController.store));

routes.use('/documents', ValidatorMiddleware(DocumentValidator));
routes
  .route('/documents')
  .get(wrapper(DocumentController.index))
  .post(wrapper(DocumentController.store));
routes
  .route('/documents/:id')
  .put(wrapper(DocumentController.update))
  .get(wrapper(DocumentController.show))
  .delete(DocumentController.delete);

export default routes;
