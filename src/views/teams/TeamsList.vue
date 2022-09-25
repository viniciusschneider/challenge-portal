<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>Times</h1>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            link
            :to="{ name: enumRouteNames.TEAMS_CREATE }"
            color="primary"
            elevation="2"
            >Novo</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <RenderList
      :data="listTeams"
      :emptyMessage="'Você ainda não possui nenhum time cadastrado.'"
      @changePage="changePage"
    >
      <v-col
        class="d-flex justify-center"
        cols="12"
        sm="6"
        md="4"
        v-for="team of listTeams.items"
        :key="team.url"
      >
        <v-card class="card-item" max-width="375">
          <v-img height="250" :src="team.url"></v-img>
          <div class="card-effect"></div>
          <div class="icon">
            <v-btn color="primary" elevation="2" icon x-large>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              elevation="2"
              icon
              x-large
              link
              :to="{
                name: enumRouteNames.GAME_SCHEDULE,
                params: { id: team.id }
              }"
            >
              <v-icon>mdi-briefcase-eye</v-icon>
            </v-btn>
          </div>
          <v-card-title class="card-title">{{ team.name }}</v-card-title>
        </v-card>
      </v-col>
    </RenderList>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { ITeamItem } from '@/interfaces/teams.interface'
import { IPaginationParams } from '@/interfaces/pagination-params.interface'
import { TeamsModule } from '@/store/namespaces'
import RenderList from '@/components/RenderList.vue'
import Vue from 'vue'
import { IRenderList } from '@/interfaces/render-list.interface'
import { EnumRouteNames } from '@/router'

@Component({ components: { RenderList } })
export default class Teams extends Vue {
  @TeamsModule.Action('getListTeams') getListTeams: (
    params: IPaginationParams
  ) => Promise<void>
  @TeamsModule.Getter('listTeams') listTeams: IRenderList<ITeamItem>
  @TeamsModule.Mutation('cancelGetListTeams') cancelGetListTeams: () => void
  enumRouteNames = EnumRouteNames

  mounted(): void {
    this.changePage(1)
  }

  destroyed(): void {
    this.cancelGetListTeams()
  }

  changePage(page: number): void {
    this.getListTeams({ page: page, limit: this.listTeams.meta.itemsPerPage })
  }
}
</script>

<style lang="scss" scoped>
$transition: ease-in-out all 0.3s;

.card-item {
  box-shadow: 0;
  overflow: hidden;
  position: relative;
  transition: $transition;

  .card-effect {
    background: inherit;
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
    display: flex;
    gap: 10px;
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
