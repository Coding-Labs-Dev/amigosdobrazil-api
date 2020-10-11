import { Router } from 'express';

/**
 * Middlewares
 */

import { ValidatorMiddleware } from '@middlewares/index';

/**
 * Controllers
 */

import {
  FormContactController,
  SettingController,
  TestimonialController,
  WhyUsController,
  HeroController,
  TripController,
  TOSController,
  NextTripController,
  PaymentSessionController,
  PaymentController,
  FileController,
} from '@controllers/index';

/**
 * Validators
 */

import { FormContactValidator, FileValidator } from '@validators/index';
import GalleryController from '@controllers/GalleryController';

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

export default routes;
