<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="viewDate"
        label="Data"
        dense
        prepend-icon="mdi-calendar"
        @click:prepend="menu = true"
        v-bind="attrs"
        v-on="on"
        readonly
        :rules="rules"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      range
      no-title
      @input="formatDate"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { isAfter } from 'date-fns'
import { requiredIntervalDates } from '@/common/form-validate'
import Vue from 'vue'

@Component
export default class RangeDatePicker extends Vue {
  @Prop({ required: true }) value: Date[]

  dates: Date[] = []
  menu = false
  rules = [requiredIntervalDates]
  viewDate: any = null

  formatDate(): void {
    const [first, second] = this.dates

    if (!second) {
      this.viewDate = `${first} até`
      return
    }

    if (isAfter(first, second)) this.dates = [second, first]

    this.menu = false
    this.viewDate = this.dates.join(' até ')
    this.$emit('input', [...this.dates])
  }
}
</script>
