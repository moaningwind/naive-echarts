import EChart from './EChart'
import NChart from './NChart.vue'

export { EChart, NChart }

export default {
  install(Vue) {
    Vue.component(EChart.name, EChart)
    Vue.component(NChart.name, NChart)
  },
}
