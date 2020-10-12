import { Router } from 'express';

import wrapper from '@utils/Wrapper';

/**
 * Middlewares
 */

import UploadFileMiddleware from '@middlewares/UploadFileMiddleware';
import ValidatorMiddleware from '@middlewares/ValidatorMiddleware';
import AuthenticationMiddleware from '@middlewares/AuthenticationMiddleware';

/**
 * Controllers
 */

import ClientController from '@controllers/internal/ClientController';
import DocumentControllers from '@controllers/internal/DocumentController';
import FileController from '@controllers/internal/FileController';
import FormContactController from '@controllers/internal/FormContactController';
import GalleryController from '@controllers/internal/GalleryController';
import HeroController from '@controllers/internal/HeroController';
import IncludeController from '@controllers/internal/IncludeController';
import ItineraryController from '@controllers/internal/ItineraryController';
import PaymentPlanController from '@controllers/internal/PaymentPlanController';
import SessionController from '@controllers/internal/SessionController';
import SettingController from '@controllers/internal/SettingController';
import TestimonialController from '@controllers/internal/TestimonialController';
import TransportPlanController from '@controllers/internal/TransportPlanController';
import TripController from '@controllers/internal/TripController';
import UserController from '@controllers/internal/UserController';
import WhyUsController from '@controllers/internal/WhyUsController';

/**
 * Validators
 */

import ClientValidator from '@validators/ClientValidator';
import FormContactValidator from '@validators/FormContactValidator';
import HeroValidator from '@validators/HeroValidator';
import SettingValidator from '@validators/SettingValidator';
import TestimonialValidator from '@validators/TestimonialValidator';
import WhyUsValidator from '@validators/WhyUsValidator';
import UserValidator from '@validators/UserValidator';
import FileValidator from '@validators/FileValidator';
import SessionValidator from '@validators/SessionValidator';
import TripValidator from '@validators/TripValidator';
import PaymentPlanValidator from '@validators/PaymentPlanValidator';
import ItineraryValidator from '@validators/ItineraryValidator';
import IncludeValidator from '@validators/IncludeValidator';
import DocumentValidator from '@validators/DocumentValidator';

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

routes.use('/trips/:tripId/documents', ValidatorMiddleware(DocumentValidator));
routes
  .route('/trips/:tripId/documents')
  .get(wrapper(DocumentControllers.index));

routes
  .route('/galleries')
  .get(wrapper(GalleryController.index))
  .post(wrapper(GalleryController.store));

routes
  .route('/galleries/:id')
  .put(wrapper(GalleryController.update))
  .get(wrapper(GalleryController.show))
  .delete(wrapper(GalleryController.delete));

export default routes;
