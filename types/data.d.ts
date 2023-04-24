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

interface SubscriptionData {
  [{
    id: number,
    user: number,
    plan: {
      id: number,
      name: string,
      amount: string,
      features: [
        {
          id: number,
          name: string,
          description: string,
          value: string,
        },
      ],
      max_products: number,
      stripe_plan_id: string,
    },
    customer_id: string,
    stripe_subscription: string,
    start_date: string,
    end_date: string,
    status: string,
    assigned_surveys: [],
    subscription_data: {
      id: string,
      object: string,
      application: null,
      application_fee_percent: null,
      automatic_tax: {
        enabled: false,
      },
      billing_cycle_anchor: number,
      billing_thresholds: null,
      cancel_at: number,
      cancel_at_period_end: true,
      canceled_at: number,
      cancellation_details: {
        comment: null,
        feedback: null,
        reason: string,
      },
      collection_method: string,
      created: number,
      currency: string,
      current_period_end: number,
      current_period_start: number,
      customer: string,
      days_until_due: number,
      default_payment_method: null,
      default_source: null,
      default_tax_rates: [],
      description: string,
      discount: null,
      ended_at: null,
      items: {
        object: string,
        data: [
          {
            id: string,
            object: string,
            billing_thresholds: null,
            created: number,
            metadata: {},
            plan: {
              id: string,
              object: string,
              active: true,
              aggregate_usage: null,
              amount: number,
              amount_decimal: string,
              billing_scheme: string,
              created: number,
              currency: string,
              interval: string,
              interval_count: number,
              livemode: false,
              metadata: {
                created_by: string,
                version: string,
              },
              nickname: string,
              product: string,
              tiers_mode: null,
              transform_usage: null,
              trial_period_days: null,
              usage_type: string,
            },
            price: {
              id: string,
              object: string,
              active: true,
              billing_scheme: string,
              created: number,
              currency: string,
              custom_unit_amount: null,
              livemode: false,
              lookup_key: null,
              metadata: {
                created_by: string,
                version: string,
              },
              nickname: string,
              product: string,
              recurring: {
                aggregate_usage: null,
                interval: string,
                interval_count: number,
                trial_period_days: null,
                usage_type: string,
              },
              tax_behavior: string,
              tiers_mode: null,
              transform_quantity: null,
              type: string,
              unit_amount: number,
              unit_amount_decimal: string,
            },
            quantity: number,
            subscription: string,
            tax_rates: [],
          },
        ],
        has_more: false,
        total_count: number,
        url: string,
      },
      latest_invoice: string,
      livemode: false,
      metadata: {},
      next_pending_invoice_item_invoice: null,
      on_behalf_of: null,
      pause_collection: null,
      payment_settings: {
        payment_method_options: null,
        payment_method_types: null,
        save_default_payment_method: string,
      },
      pending_invoice_item_interval: null,
      pending_setup_intent: null,
      pending_update: null,
      plan: {
        id: string,
        object: string,
        active: true,
        aggregate_usage: null,
        amount: number,
        amount_decimal: string,
        billing_scheme: string,
        created: number,
        currency: string,
        interval: string,
        interval_count: number,
        livemode: false,
        metadata: {
          created_by: string,
          version: string,
        },
        nickname: string,
        product: string,
        tiers_mode: null,
        transform_usage: null,
        trial_period_days: null,
        usage_type: string,
      },
      quantity: number,
      schedule: null,
      start_date: number,
      status: string,
      test_clock: null,
      transfer_data: null,
      trial_end: number,
      trial_settings: {
        end_behavior: {
          missing_payment_method: string,
        },
      },
      trial_start: number,
    },
  }];
}
