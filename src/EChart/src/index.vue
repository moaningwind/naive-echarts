<template>
  <!-- Custom elements have a low css style weight so that they can be easily overwritten -->
  <naive-echarts />
</template>

<script>
import { init as initInstance } from 'echarts/core'
import { constant, merge } from 'lodash-es'
import { addResizeListener, removeResizeListener } from './resize-event'

export default {
  name: 'EChart',
  props: {
    defineOption: {
      type: Function,
      default: constant({}),
    },
    option: {
      type: Object,
      default: constant({}),
    },
    theme: {
      type: [Object, String],
      default: constant({}),
    },
    group: {
      type: String,
      default: '',
    },
    initOptions: {
      type: Object,
      default: constant({}),
    },
    updateOptions: {
      type: Object,
      default: constant({}),
    },
    onChartReady: {
      type: Function,
      default: undefined,
    },
    autoResize: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingOptions: {
      type: Object,
      default: constant({}),
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    option: {
      handler() {
        this.setOption(
          Object.assign({}, this.updateOptions, {
            notMerge: true,
          }),
        )
      },
      deep: true,
    },
    theme() {
      this.cleanup()
      this.init()
    },
    group(newVal) {
      if (!this.chart)
        return
      this.chart.group = newVal
    },
    initOptions() {
      this.cleanup()
      this.init()
    },
    autoResize(newVal) {
      if (!this.chart)
        return
      if (newVal) {
        this.__resizeListener__ = () => {
          this.resize()
        }
        addResizeListener(this.$el, this.__resizeListener__)
      }
      else {
        if (this.__resizeListener__)
          removeResizeListener(this.$el, this.__resizeListener__)
      }
    },
    loading(newVal) {
      if (!this.chart)
        return
      if (newVal)
        this.chart.showLoading(this.loadingOptions)
      else
        this.chart.hideLoading()
    },
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    this.cleanup()
  },
  methods: {
    setOption(updateOptions) {
      if (!this.chart) {
        this.init()
      }
      else {
        this.chart.setOption(
          merge({}, this.defineOption(), this.option),
          updateOptions || this.updateOptions,
        )
      }
    },
    init() {
      if (!this.$el)
        return

      this.chart = initInstance(this.$el, this.theme, this.initOptions)

      if (this.group)
        this.chart.group = this.group

      if (this.loading)
        this.chart.showLoading(this.loadingOptions)

      Object.keys(this.$listeners).forEach((key) => {
        const handler = this.$listeners[key]

        if (!handler)
          return

        if (key.indexOf('zr:') === 0)
          this.chart.getZr().on(key.slice(3).toLowerCase(), handler)
        else
          this.chart.on(key.toLowerCase(), handler)
      })

      if (this.onChartReady)
        this.onChartReady(this.chart)

      if (this.autoResize) {
        this.$nextTick(() => {
          this.resize()
          this.setOption()

          this.__resizeListener__ = () => {
            this.resize()
          }
          addResizeListener(this.$el, this.__resizeListener__)
        })
      }
      else {
        this.setOption()
      }
    },
    cleanup() {
      if (!this.chart)
        return
      this.chart.dispose()
      this.chart = null
    },
    resize() {
      if (this.chart && !this.chart.isDisposed())
        this.chart.resize()
    },
  },
}
</script>

<style>
naive-echarts {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
