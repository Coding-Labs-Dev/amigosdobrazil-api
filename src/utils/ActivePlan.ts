import moment from 'moment';
import { PaymentPlanAttributes } from '@models/PaymentPlan';

export const getActivePlanIndex = (
  paymentPlans: PaymentPlanAttributes[] | undefined,
): number => {
  if (!paymentPlans) return -1;
  const moments = [...paymentPlans.map(({ date }) => moment(date))];
  const activePlanIndex = moments.findIndex(date => {
    return moment().isSameOrBefore(date, 'd');
  });
  return activePlanIndex >= 0 ? activePlanIndex : moments.length - 1;
};
