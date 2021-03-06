import { storiesOf } from "@storybook/vue";
import {
  withKnobs,
  text,
  optionsKnob as options,
} from "@storybook/addon-knobs";
import { SfBadge } from "@storefront-ui/vue";
storiesOf("Atoms|Badge", module)
  .addDecorator(withKnobs)
  .add("Common", () => ({
    props: {
      customClass: {
        default: options(
          "CSS modifiers",
          {
            "sf-badge--full-width": "sf-badge--full-width",
            "sf-badge--number": "sf-badge--number",
            "color-primary": "color-primary",
            "color-secondary": "color-secondary",
            "color-warning": "color-warning",
            "color-danger": "color-danger",
            "color-info": "color-info",
            "color-success": "color-success",
          },
          "",
          { display: "multi-select" },
          "CSS Modifiers"
        ),
      },
      customLabel: {
        default: text("default", "Limited", "Slots"),
      },
    },
    components: { SfBadge },
    template: `<SfBadge
      :class="customClass">
      {{customLabel}}
     </SfBadge>`,
  }))
  .add("as Number", () => ({
    props: {
      customLabel: {
        default: text("default", "99", "Slots"),
      },
    },
    components: { SfBadge },
    template: `<SfBadge
        class="sf-badge--number">
      {{customLabel}}
    </SfBadge>`,
  }));
