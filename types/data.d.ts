type FeatureObject = {
  id: number;
  name: string;
  description: string;
  value: string;
};

type StripeObject = {
  id: string;
  product: string;
  unit_amount: number;
  currency: string;
  description?: string;
  interval: string;
  interval_count: number;
  active: boolean;
  created_by: string;
  updated_by?: string;
  livemode: string;
  version: string;
};

export interface Plan {
  id: number;
  name: String;
  amount: number;
  features: Array<FeatureObject>;
  max_products: number;
  stripe_plan_id: StripeObject;
}

type ArrayObject = {
  name?: String;
};

interface subsciptionPlan {
  title?: String;
  price?: Number;
  period?: String;
  description?: String;
  advantages?: Array<ArrayObject>;
}
