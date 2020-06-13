<script lang="ts">
import Vue from "vue";
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default Vue.extend({
  name: "LineChart",
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  // chartData: (): any => ({
  //   type: Object,
  //   default: {
  //     labels: [],
  //     datesets: []
  //   }
  // }),
  // options: {
  //   type: Object,
  //   default: null
  // }
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});
</script>

