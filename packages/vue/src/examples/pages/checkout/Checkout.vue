<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="updateStep($event)">
          <SfStep name="Details">
            <PersonalDetails
              :value="personalDetails"
              :button-name="getButtonName"
              @input="personalDetails = $event"
              @click:next="currentStep++"
              @click:back="currentStep--"
            />
          </SfStep>
          <SfStep name="Shipping">
            <Shipping
              :value="shipping"
              :shipping-methods="shippingMethods"
              @input="shipping = $event"
              @click:next="currentStep++"
              @click:back="currentStep--"
            />
          </SfStep>
          <SfStep name="Payment">
            <Payment
              :value="payment"
              :payment-methods="paymentMethods"
              :shipping="shipping"
              @input="payment = $event"
              @click:next="currentStep++"
              @click:back="currentStep--"
            />
          </SfStep>
          <SfStep name="Review">
            <ConfirmOrder
              :shipping-methods="shippingMethods"
              :order="getOrder"
              :payment-methods="paymentMethods"
              :characteristics="characteristics"
              @click:back="currentStep--"
              @click:edit="currentStep = $event"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside desktop-only">
        <transition name="fade">
          <OrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
            class="checkout__aside-order"
            :order="getOrder"
            :shipping-methods="shippingMethods"
            :payment-methods="paymentMethods"
            :characteristics="characteristics"
            :button-name="getButtonName"
            @click:next="currentStep++"
            @click:back="currentStep--"
          />
          <OrderReview
            v-else
            key="order-review"
            class="checkout__aside-order"
            :order="getOrder"
            :shipping-methods="shippingMethods"
            :payment-methods="paymentMethods"
            :characteristics="characteristics"
            @click:edit="currentStep = $event"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps } from "@storefront-ui/vue";
import {
  PersonalDetails,
  Shipping,
  Payment,
  ConfirmOrder,
  OrderSummary,
  OrderReview,
} from "./_internal/index.js";
export default {
  name: "Checkout",
  components: {
    SfSteps,
    PersonalDetails,
    Shipping,
    Payment,
    ConfirmOrder,
    OrderSummary,
    OrderReview,
  },
  data() {
    return {
      currentStep: 0,
      personalDetails: { firstName: "", lastName: "", email: "" },
      shipping: {
        firstName: "",
        lastName: "",
        streetName: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
        shippingMethod: "",
      },
      payment: {
        sameAsShipping: false,
        firstName: "",
        lastName: "",
        streetName: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
        paymentMethod: "",
        invoice: false,
        card: {
          number: "",
          holder: "",
          month: "",
          year: "",
          cvc: "",
          keep: false,
        },
      },
      order: {
        password: "",
        createAccount: false,
        review: {
          subtotal: "$150.00",
          shipping: "$9.00",
          total: "$159.00",
        },
        products: [
          {
            title: "Cream Beach Bag",
            image: "/assets/storybook/Home/productA.jpg",
            price: { regular: "$50.00" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" },
            ],
            qty: 1,
            sku: "MSD23-345-324",
          },
          {
            title: "Vila stripe maxi dress",
            image: "/assets/storybook/Home/productB.jpg",
            price: { regular: "$50.00", special: "$20.05" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" },
            ],
            qty: 2,
            sku: "MSD23-345-325",
          },
        ],
      },
      paymentMethods: [
        {
          label: "Visa Debit",
          value: "debit",
        },
        {
          label: "MasterCard",
          value: "mastercard",
        },
        {
          label: "Visa Electron",
          value: "electron",
        },
        {
          label: "Cash on delivery",
          value: "cash",
        },
        {
          label: "Check",
          value: "check",
        },
      ],
      shippingMethods: [
        {
          isOpen: false,
          price: "Free",
          delivery: "Delivery from 3 to 7 business days",
          label: "Pickup in the store",
          value: "store",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Delivery to home",
          value: "home",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Paczkomaty InPost",
          value: "inpost",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$11.00",
          delivery: "Delivery within 48 hours",
          label: "48 hours coffee",
          value: "coffee",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$14.00",
          delivery: "Delivery within 24 hours",
          label: "Urgent 24h",
          value: "urgent",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
      ],
      buttonNames: [
        { name: "Go to shipping" },
        { name: "Go to payment" },
        { name: "Review Order" },
        { name: "Place my order" },
      ],
      characteristics: [
        {
          title: "Safety",
          description: "It carefully packaged with a personal touch",
          icon: "safety",
        },
        {
          title: "Easy shipping",
          description:
            "You’ll receive dispatch confirmation and an arrival date",
          icon: "shipping",
        },
        {
          title: "Changed your mind?",
          description: "Rest assured, we offer free returns within 30 days",
          icon: "return",
        },
      ],
    };
  },
  computed: {
    getOrder() {
      return {
        ...this.order,
        ...this.personalDetails,
        shipping: { ...this.shipping },
        payment: { ...this.payment },
      };
    },
    getButtonName() {
      return this.buttonNames[this.currentStep].name;
    },
  },
  methods: {
    updateStep(next) {
      // prevent to move next by SfStep header
      if (next < this.currentStep) {
        this.currentStep = next;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
    margin: 0 auto;
  }
}
.checkout {
  --steps-content-padding: 0 var(--spacer-sm);
  @include for-desktop {
    --steps-content-padding: 0;
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 26.8125rem;
      margin: 0 0 0 var(--spacer-xl);
    }
    &-order {
      box-sizing: border-box;
      width: 100%;
      box-shadow: 0px 4px 11px rgba(var(--c-dark-base), 0.1);
      background: var(--c-light);
      padding: var(--spacer-xl) calc(var(--spacer-lg) * 2);
    }
  }
}
</style>
