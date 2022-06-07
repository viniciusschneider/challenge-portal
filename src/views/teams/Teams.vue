<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>Times</h1>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn link :to="{ name: 'TeamsCreate' }" color="primary" elevation="2">Novo</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-if="!listTeams.load && listTeams.items.length === 0" cols="12">
          Você ainda não possui nenhum time cadastrado.
        </v-col>
        <template v-if="listTeams.load">
          <v-col class="d-flex justify-center" cols="12" sm="6" md="4" v-for="index in listTeams.meta.itemsPerPage" :key="index">
            <v-skeleton-loader
              type="card"
              width="100%"
            ></v-skeleton-loader>
          </v-col>
        </template>
        <v-col v-else class="d-flex justify-center" cols="12" sm="6" md="4" v-for="team of listTeams.items" :key="team.url">
          <v-card
            class="card-item"
            max-width="375"
          >
            <v-img
              height="250"
              :src="team.url"
            ></v-img>
            <div class="card-effect"></div>
            <div class="icon">
              <v-btn
                color="primary"
                elevation="2"
                icon
                x-large
              >
                <v-icon>mdi-briefcase-eye</v-icon>
              </v-btn>
            </div>
            <v-card-title class="card-title">{{ team.name }}</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="listTeams.meta.totalPages > 1">
          <v-pagination
            :length="listTeams.meta.totalPages"
            :total-visible="5"
            circle
            v-model="page"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { IListTeams } from '@/interfaces/teams.interface';
import { IPaginationParams } from '@/interfaces/pagination-params.interface';
import { TeamsModule } from '@/store/namespaces';
import Component from 'vue-class-component';
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';

@Component
export default class Teams extends Vue {
  @TeamsModule.Action('getListTeams') getListTeams: (params: IPaginationParams) => void;
  @TeamsModule.Getter('listTeams') listTeams: IListTeams;
  page = 0;

  mounted() {
    this.page = 1;
  }

  @Watch('page')
  pagination() {
    this.getListTeams({ page: this.page, limit: this.listTeams.meta.itemsPerPage });
  }
}
</script>
<style lang="scss" scoped>
  $transition: ease-in-out all .3s;

  .card-item {
    box-shadow: 0;
    overflow: hidden;
    position: relative;
    transition: $transition;

    .card-effect {
      background: white;
      border-radius: 50%;
      display: inline-block;
      height: 0;
      left: -50%;
      position: absolute;
      top: -50%;
      transition: $transition;
      width: 0;
    }

    .icon {
      left: -50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: $transition;
    }

    .card-title {
      position: relative;
      transition: $transition;
    }

    &:hover {
      box-shadow: 0 0 30px -10px !important;
      cursor: pointer;

      .card-effect {
        height: 200%;
        width: 200%;
      }

      .icon {
        left: 50%;
      }

      .card-title {
        color: #1976d2;
      }
    }
  }
</style>