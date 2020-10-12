/* eslint-disable no-restricted-globals */
import { Request, Response } from 'express';
import { getActivePlanIndex } from '@utils/ActivePlan';
import { getCanBook } from '@utils/CanBook';
import getAttachedIds from '@utils/GetAttachedIds';

import {
  Trip,
  File,
  Itinerary,
  Include,
  Document,
  PaymentPlan,
} from '@models/index';
import TransportPlan from '@models/TransportPlan';
import { ItineraryAttributes } from '@models/Itinerary';
import { IncludeAttributes } from '@models/Include';
import { PaymentPlanAttributes } from '@models/PaymentPlan';
import { removeFile } from '@utils/File';
import { DocumentAttributes } from '@models/Document';

class TripController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Trip.findAll({
        where: { deleted: false },
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['id', 'file', 'url'],
          },
          {
            model: File,
            as: 'bannerImage',
            attributes: ['id', 'file', 'url'],
          },
        ],
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const { includes = [], documents = [], itinerary = [] } = body;

    delete body.includes;
    delete body.documents;
    delete body.itinerary;
    delete body.paymentPlans;

    const trip = await Trip.create(body);

    await trip.setIncludes(includes);
    await trip.setDocuments(documents);
    await trip.setItinerary(itinerary);

    return res.json(trip);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { slug: id, active: true, deleted: false },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'file', 'url'],
        },
        {
          model: File,
          as: 'bannerImage',
          attributes: ['id', 'file', 'url'],
        },
        {
          model: Itinerary,
          as: 'itinerary',
        },
        {
          model: Include,
          as: 'includes',
          attributes: ['description', 'included'],
        },
        {
          model: Document,
          as: 'documents',
          attributes: ['description'],
        },
        {
          model: PaymentPlan,
          as: 'paymentPlans',
        },
        {
          model: TransportPlan,
          as: 'transportPlans',
        },
      ],
      order: [
        ['itinerary', 'order', 'ASC'],
        ['paymentPlans', 'date', 'ASC'],
      ],
    });

    if (!trip) return res.status(404).send();

    const { paymentPlans } = trip;

    const activePlanIndex = getActivePlanIndex(paymentPlans);

    const canBook =
      activePlanIndex >= 0 && getCanBook(trip.bookStart, trip.bookEnd);

    return res.json({ ...trip.toJSON(), canBook, activePlanIndex });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { id, deleted: false },
      include: [
        {
          model: File,
          as: 'image',
        },
        {
          model: File,
          as: 'bannerImage',
        },
        {
          model: Itinerary,
          as: 'itinerary',
        },
        {
          model: Include,
          as: 'includes',
        },
        {
          model: Document,
          as: 'documents',
        },
        {
          model: PaymentPlan,
          as: 'paymentPlans',
        },
        {
          model: TransportPlan,
          as: 'transportPlans',
        },
      ],
    });

    if (!trip) return res.status(404).send();

    const tripData = {
      ...body,
      transportPlan: undefined,
      itinerary: undefined,
      includes: undefined,
      paymentPlans: undefined,
      documents: undefined,
    };

    if (
      typeof tripData.backgroundId !== 'undefined' &&
      tripData.backgroundId !== trip.backgroundId
    )
      await removeFile(trip.backgroundId);
    if (
      typeof tripData.bannerId !== 'undefined' &&
      tripData.bannerId !== trip.bannerId
    )
      await removeFile(trip.bannerId);

    await trip.update(tripData);

    const {
      transportPlan,
      itinerary = [],
      includes = [],
      paymentPlans = [],
      documents = [],
    } = body;

    if (transportPlan) {
      const data = {
        ...transportPlan,
        installmentsQty: Number(transportPlan.installmentsQty),
      };
      const [instance, isNew] = await TransportPlan.findOrCreate({
        where: { tripId: id },
        defaults: data,
      });
      if (!isNew) await instance.update(data);
    }

    const itineraryInstances: Array<Itinerary> = await Promise.all(
      itinerary.map(async (item: ItineraryAttributes) => {
        const instanceId = item.id && !isNaN(Number(item.id)) ? item.id : null;
        const [instance, isNew] = await Itinerary.findOrCreate({
          where: { id: instanceId, tripId: id },
          defaults: { ...item, id: instanceId, tripId: id },
        });
        if (!isNew) return instance.update(item);
        return instance;
      }),
    );

    const paymentPlansInstances: Array<PaymentPlan> = await Promise.all(
      paymentPlans.map(async (item: PaymentPlanAttributes) => {
        const instanceId = item.id && !isNaN(Number(item.id)) ? item.id : null;
        const [instance, isNew] = await PaymentPlan.findOrCreate({
          where: { id: instanceId, tripId: id },
          defaults: { ...item, id: instanceId, tripId: id },
        });
        if (!isNew) return instance.update(item);
        return instance;
      }),
    );

    const includesInstances: Array<Include> = await Promise.all(
      includes.map(async (item: IncludeAttributes) => {
        const instanceId = item.id && !isNaN(Number(item.id)) ? item.id : null;
        const [instance, isNew] = await Include.findOrCreate({
          where: { id: instanceId, tripId: id },
          defaults: { ...item, id: instanceId, tripId: id },
        });
        if (!isNew) return instance.update(item);
        return instance;
      }),
    );

    const documentsInstances: Array<Document> = await Promise.all(
      documents.map(async (item: DocumentAttributes) => {
        const instanceId = item.id && !isNaN(Number(item.id)) ? item.id : null;
        const [instance, isNew] = await Document.findOrCreate({
          where: { id: instanceId, tripId: id },
          defaults: { ...item, id: instanceId, tripId: id },
        });
        if (!isNew) return instance.update(item);
        return instance;
      }),
    );

    const newItinerariesIds = itineraryInstances.map(
      item => (item.toJSON() as ItineraryAttributes).id,
    );

    const newPaymentPlansIds = paymentPlansInstances.map(
      item => (item.toJSON() as PaymentPlanAttributes).id,
    );

    const newIncludesIds = includesInstances.map(
      item => (item.toJSON() as IncludeAttributes).id,
    );

    const newDocumentsIds = documentsInstances.map(
      item => (item.toJSON() as DocumentAttributes).id,
    );

    const itinerariesId = getAttachedIds(
      newItinerariesIds,
      trip.itinerary.map(({ id: itineraryId }) => itineraryId),
    );

    const paymentPlansId = getAttachedIds(
      newPaymentPlansIds,
      trip.paymentPlans?.map(({ id: paymentPlanId }) => paymentPlanId) || [],
    );

    const includesId = getAttachedIds(
      newIncludesIds,
      trip.includes?.map(({ id: includeId }) => includeId) || [],
    );

    const documentsIds = getAttachedIds(
      newDocumentsIds,
      trip.documents?.map(({ id: documentId }) => documentId) || [],
    );

    if (itinerariesId.removedIds)
      await Itinerary.destroy({ where: { id: itinerariesId.removedIds } });

    if (paymentPlansId.removedIds)
      await PaymentPlan.destroy({ where: { id: paymentPlansId.removedIds } });

    if (includesId.removedIds)
      await Include.destroy({ where: { id: includesId.removedIds } });

    if (documentsIds.removedIds)
      await Document.destroy({ where: { id: documentsIds.removedIds } });

    return res.json({ trip });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { id, deleted: false },
    });

    if (!trip) return res.status(404).send();

    await trip.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new TripController();
