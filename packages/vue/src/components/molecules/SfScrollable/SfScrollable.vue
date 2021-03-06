<template>
  <div class="sf-scrollable" :class="{ 'sf-scrollable--is-open': !isHidden }">
    <Simplebar ref="content" class="sf-scrollable__content" :style="style">
      <slot />
    </Simplebar>
    <SfButton
      v-show="hasScroll"
      class="sf-button--text sf-scrollable__button"
      @click="isHidden = !isHidden"
    >
      <span v-if="isHidden">{{ showText }}</span>
      <span v-else>{{ hideText }}</span>
    </SfButton>
  </div>
</template>
<script>
import Simplebar from "simplebar-vue";
import SfButton from "../../atoms/SfButton/SfButton.vue";
export default {
  name: "SfScrollable",
  components: {
    Simplebar,
    SfButton,
  },
  props: {
    /*
     * Maximum height of visible content
     */
    maxContentHeight: {
      type: String,
      default: "",
    },
    /*
     * Text for button showing content
     */
    showText: {
      type: String,
      default: "Show",
    },
    /*
     * Text for button hiding content
     */
    hideText: {
      type: String,
      default: "Hide",
    },
  },
  data() {
    return {
      isHidden: true,
      hasScroll: false,
      contentEl: undefined,
    };
  },
  computed: {
    style() {
      return {
        "--_scrollable-max-height": this.maxContentHeight.trim()
          ? this.maxContentHeight
          : undefined,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.contentEl = this.$refs.content.$el.querySelector(
        ".simplebar-content"
      );
      if (typeof MutationObserver === "undefined") return;
      const observer = new MutationObserver(this.sizeCalc);
      this.sizeCalc();
      observer.observe(this.contentEl, { childList: true });
    });
  },
  methods: {
    sizeCalc() {
      const containerHeight = this.$refs.content.$el.offsetHeight;
      const contentHeight = this.contentEl.offsetHeight;
      this.hasScroll = contentHeight > containerHeight;
    },
  },
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfScrollable.scss";
</style>
