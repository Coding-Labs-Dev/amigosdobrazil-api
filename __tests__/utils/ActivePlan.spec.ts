import MockDate from 'mockdate';
import { getActivePlanIndex } from '@utils/ActivePlan';
import { PaymentPlanAttributes } from '@models/PaymentPlan';

describe('getActivePlan', () => {
  afterEach(() => {
    MockDate.reset();
  });

  const genericData = {
    id: 1,
    tripId: 1,
    usd: 1,
    brl: 1,
    downPayment: 1,
    installmentsQty: 1,
    installmentsValue: 1,
    deleted: false,
    createdAt: new Date('2019-06-30T00:00:00+0000'),
    updatedAt: new Date('2019-06-30T00:00:00+0000'),
  };

  const paymentPlans: PaymentPlanAttributes[] = [
    {
      ...genericData,
      date: new Date('2020-08-01T00:00:00+0000'), // 0
    },
    {
      ...genericData,
      date: new Date('2020-08-15T00:00:00+0000'), // 1
    },
    {
      ...genericData,
      date: new Date('2020-09-01T00:00:00+0000'), // 2
    },
    {
      ...genericData,
      date: new Date('2020-09-02T00:00:00+0000'), // 2
    },
  ];

  it("returns the first payment plan when it's after today's date", () => {
    MockDate.set('2020-07-01');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(0);
  });

  it("returns the next payment plan after today's date (1)", () => {
    MockDate.set('2020-08-10');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(1);
  });

  it("returns the next payment plan after today's date (2)", () => {
    MockDate.set('2020-08-20');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(2);
  });

  it("returns the latest payment plan it it's before today's date", () => {
    MockDate.set('2020-10-10');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(3);
  });

  it("returns today's payment plan (1)", () => {
    MockDate.set('2020-08-01');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(0);
  });

  it("returns today's payment plan (2)", () => {
    MockDate.set('2020-08-15');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(1);
  });

  it("returns today's payment plan (3)", () => {
    MockDate.set('2020-09-01');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(2);
  });

  it("returns today's payment plan (4)", () => {
    MockDate.set('2020-09-02');
    const result = getActivePlanIndex(paymentPlans);
    expect(result).toBe(3);
  });
});
