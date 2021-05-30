<template>
  <NEmpty
    v-if="isEmpty"
    v-bind="$props"
  >
    <template #image>
      <slot
        v-if="$slots.image"
        name="image"
      />
    </template>
    <template #default>
      <slot
        v-if="$slots.default"
        name="default"
      />
    </template>
  </NEmpty>
  <EChart
    v-else
    ref="echarts"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import NEmpty from './NEmpty'
import EChart from './EChart'

export default {
  name: 'NChart',
  components: {
    NEmpty,
    EChart,
  },
  inheritAttrs: false,
  props: {
    isEmpty: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
    imageSize: {
      type: Number,
      default: undefined,
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    getEchartsInstance() {
      return this.$refs.echarts && this.$refs.echarts.chart
    },
  },
}
</script>
