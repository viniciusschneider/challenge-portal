<template>
  <v-container>
    <v-row>
      <v-col v-if="!data.load && data.items.length === 0" cols="12">
        {{ emptyMessage }}
      </v-col>
      <template v-if="data.load">
        <v-col
          class="d-flex justify-center"
          cols="12"
          sm="6"
          md="4"
          v-for="index in data.meta.itemsPerPage"
          :key="index"
        >
          <v-skeleton-loader type="card" width="100%"></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <slot></slot>
      </template>
      <v-col cols="12" v-if="data.meta.totalPages > 1 && !data.load">
        <v-pagination
          :length="data.meta.totalPages"
          :total-visible="5"
          :value="page"
          circle
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { IRenderList } from '@/interfaces/render-list.interface';

@Component
export default class RenderList extends Vue {
  @Prop({ required: true }) data: IRenderList<any>;
  @Prop({ required: true }) emptyMessage: string;

  page = 1;

  changePage(value: number): void {
    this.page = value;
    this.$emit('changePage', this.page);
  }

  @Watch('data', { deep: true })
  changeData(): void {
    this.page = this.data.meta.currentPage;
  }
}
</script>
