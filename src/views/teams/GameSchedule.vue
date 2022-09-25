<template>
  <div>
    <ScheduleDialog v-if="dialog" v-model="dialog" />
    <v-container>
      <v-row class="align-center">
        <v-col>
          <h1 v-if="team">{{ team.name }}</h1>
          <v-skeleton-loader v-else type="text@1"></v-skeleton-loader>
        </v-col>
        <v-col class="d-flex justify-start justify-md-end buttons-container">
          <v-btn
            color="accent"
            elevation="2"
            large
            link
            :to="{ name: enumRouteNames.TEAMS_FIND, params: { id } }"
            >Buscar partida</v-btn
          >
          <v-btn color="primary" elevation="2" large @click="dialog = true"
            >Criar partida</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <RenderList
      :data="listMatches"
      emptyMessage="Você ainda não possui nenhuma partida agendada."
      @changePage="changePage"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="match of listMatches.items"
        :key="match.id"
      >
        <CardMatch :data="match" />
      </v-col>
    </RenderList>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { EnumRouteNames } from '@/router';
import { IPaginationParams } from '@/interfaces/pagination-params.interface';
import { IRenderList } from '@/interfaces/render-list.interface';
import { ITeamItem } from '@/interfaces/teams.interface';
import { ITeamMatchesItem } from '@/interfaces/team-matches.interface';
import { MatchesModule } from '@/store/namespaces';
import CardMatch from '@/components/CardMatch.vue';
import RenderList from '@/components/RenderList.vue';
import ScheduleDialog from './components/ScheduleDialog.vue';
import Vue from 'vue';

@Component({
  components: { CardMatch, RenderList, ScheduleDialog }
})
export default class GameSchedule extends Vue {
  @MatchesModule.Action('getTeam') getTeam: (
    payload: number
  ) => Promise<boolean>;
  @MatchesModule.Action('getTeamMatches') getTeamMatches: (
    payload: IPaginationParams
  ) => Promise<void>;
  @MatchesModule.Getter('team') team: ITeamItem | null;
  @MatchesModule.Getter('listMatches')
  listMatches: IRenderList<ITeamMatchesItem>;
  @MatchesModule.Mutation('cancelGetTeamMatches')
  cancelGetTeamMatches: () => void;
  @MatchesModule.Mutation('cancelGetTeam') cancelGetTeam: () => void;

  enumRouteNames = EnumRouteNames;
  dialog = false;

  get id(): number {
    return +this.$router.currentRoute.params.id;
  }

  async mounted(): Promise<void> {
    if (await this.getTeam(this.id)) this.changePage(1);
  }

  destroyed(): void {
    this.cancelGetTeamMatches();
    this.cancelGetTeam();
  }

  changePage(page: number): void {
    this.getTeamMatches({
      page: page,
      limit: this.listMatches.meta.itemsPerPage
    });
  }
}
</script>

<style lang="scss" scoped>
.buttons-container {
  gap: 10px;
}
</style>
