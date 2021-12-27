<template>
  <div>
    <div
      class="modal fade"
      :id="stock['symbol']"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div v-if="amountToBuy">
              <h5 class="modal-title" id="exampleModalLabel">
                You've bought {{ amountToBuy }} of {{ stock["name"] }}
              </h5>
            </div>
            <div v-if="amountToSell">
              You've sold {{ amountToSell }} of {{ stock["name"] }}
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["stock", "amountToBuy", "amountToSell"],
});
</script>

<style></style>
