import { Router } from 'express';

/**
 * Middlewares
 */

import ValidatorMiddleware from '@middlewares/ValidatorMiddleware';

/**
 * Controllers
 */

import FileController from '@controllers/FileController';
import FormContactController from '@controllers/FormContactController';
import GalleryController from '@controllers/GalleryController';
import HeroController from '@controllers/HeroController';
import NextTripController from '@controllers/NextTripController';
import PaymentController from '@controllers/PaymentController';
import PaymentSessionController from '@controllers/PaymentSessionController';
import SettingController from '@controllers/SettingController';
import TestimonialController from '@controllers/TestimonialController';
import TOSController from '@controllers/TOSController';
import TransactionController from '@controllers/TransactionController';
import TripController from '@controllers/TripController';
import WhyUsController from '@controllers/WhyUsController';

/**
 * Validators
 */

import FormContactValidator from '@validators/FormContactValidator';
import FileValidator from '@validators/FileValidator';

const routes = Router();

routes.get(
  '/files/:id',
  ValidatorMiddleware(FileValidator),
  FileController.show,
);

routes.post(
  '/formcontacts',
  ValidatorMiddleware(FormContactValidator),
  FormContactController.store,
);

routes.get('/heroes', HeroController.index);

routes.get('/nexttrips', NextTripController.index);

routes.get('/whyus', WhyUsController.index);

routes.get('/testimonials', TestimonialController.index);

routes.get('/settings', SettingController.show);

routes.get('/trips', TripController.index);
routes.get('/trips/:id', TripController.show);

routes.post('/paymentsessions', PaymentSessionController.store);
routes.post('/book/:slug', PaymentController.store);

routes.get('/tos', TOSController.show);

routes.get('/galleries', GalleryController.index);
routes.get('/galleries/:slug', GalleryController.show);

routes.post('/transactions', TransactionController.store);

export default routes;
