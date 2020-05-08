<script lang="ts">
import Vue from "vue";
import { Line, mixins } from "vue-chartjs";
export default Vue.extend({
  name: "LineChart",
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});
</script>

