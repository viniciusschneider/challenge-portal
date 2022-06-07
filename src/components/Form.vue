<template>
  <v-form @submit.prevent="submit" v-model="valid" ref="form">
    <v-container>
      <v-row>
        <slot />
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";

type VForm = Vue & {
  reset: () => boolean;
  resetValidation: () => boolean;
  validate: () => boolean;
};

@Component
export default class Form extends Vue {
  valid = false;

  @Ref("form") form!: VForm;

  reset() {
    this.form.reset();
  }

  resetValidation() {
    this.form.resetValidation();
  }

  validate() {
    this.form.validate();
  }

  submit() {
    this.validate();

    if (this.valid) this.$emit("send", this.valid);
  }
}
</script>
