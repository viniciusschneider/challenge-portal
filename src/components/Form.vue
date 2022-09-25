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
import Vue from 'vue';
import { Component, Ref } from 'vue-property-decorator';

type VForm = Vue & {
  reset: () => boolean;
  resetValidation: () => boolean;
  validate: () => boolean;
};

@Component
export default class Form extends Vue {
  valid = false;

  @Ref('form') form!: VForm;

  reset(): void {
    this.form.reset();
  }

  resetValidation(): void {
    this.form.resetValidation();
  }

  validate(): void {
    this.form.validate();
  }

  submit(): void {
    this.validate();

    if (this.valid) this.$emit('send', this.valid);
  }
}
</script>

<style lang="scss" scoped>
v-form {
  position: relative;
}
</style>
