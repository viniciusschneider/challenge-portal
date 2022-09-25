<template>
  <div>
    <Form @send="send">
      <v-col cols="12" md="4">
        <RangeDatePicker v-model="form.dates" />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :rules="rules.address"
          dense
          label="Endereço"
          v-model.trim="form.address"
          maxLength="100"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2" class="d-flex justify-end">
        <v-btn
          color="primary"
          elevation="3"
          type="submit"
          :loading="searchMatches.load"
          >Buscar</v-btn
        >
      </v-col>
    </Form>
    <RenderList
      :data="searchMatches"
      emptyMessage="Nenhuma partida encontrada!"
      @changePage="changePage"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="match of searchMatches.items"
        :key="match.id"
      >
        <CardMatch @confirm="confirmMatch" :confirmMatch="true" :data="match" />
      </v-col>
    </RenderList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Form from '@/components/Form.vue'
import { maxLength, required } from '@/common/form-validate'
import { IFindTeams } from '@/interfaces/find-teams.interface'
import RangeDatePicker from '@/components/inputs/RangeDatePicker.vue'
import CardMatch from '@/components/CardMatch.vue'
import RenderList from '@/components/RenderList.vue'
import { MatchesModule, UiModule } from '@/store/namespaces'
import { ITeamMatchesItem } from '@/interfaces/team-matches.interface'
import { IRenderList } from '@/interfaces/render-list.interface'
import { IPaginationParams } from '@/interfaces/pagination-params.interface'
import matchesService from '@/services/matches.service'
import { ITeamItem } from '@/interfaces/teams.interface'
import { IUiSnackbar } from '@/interfaces/state-ui.interface'
import axios, { CancelTokenSource } from 'axios'

@Component({
  components: { CardMatch, Form, RangeDatePicker, RenderList }
})
export default class TeamsFind extends Vue {
  @MatchesModule.Getter('searchMatches')
  searchMatches: IRenderList<ITeamMatchesItem>
  @MatchesModule.Getter('team') team: ITeamItem
  @MatchesModule.Mutation('resetSearchMatches') resetSearchMatches: () => void
  @MatchesModule.Mutation('setSearchFilter') setSearchFilter: (
    payload: IFindTeams
  ) => void
  @MatchesModule.Action('getSearchMatches') getSearchMatches: (
    params: IPaginationParams
  ) => Promise<void>
  @UiModule.Mutation('setSnackbar') setSnackbar: (payload: IUiSnackbar) => void
  @MatchesModule.Action('getTeam') getTeam: (
    payload: number
  ) => Promise<boolean>
  @UiModule.Mutation('setLoading') setLoading: (state: boolean) => void
  @MatchesModule.Mutation('cancelGetTeam') cancelGetTeam: () => void
  @MatchesModule.Mutation('cancelGetSearchMatches')
  cancelGetSearchMatches: () => void

  cancelToken: CancelTokenSource | null = null
  form: IFindTeams = {
    address: '',
    dates: []
  }
  rules = {
    address: [required, maxLength(100)]
  }

  get id(): number {
    return +this.$router.currentRoute.params.id
  }

  async mounted(): Promise<void> {
    this.setLoading(true)
    this.resetSearchMatches()
    await this.getTeam(this.id)
    this.setLoading(false)
  }

  destroyed(): void {
    this.cancelGetTeam()
    this.cancelGetSearchMatches()
    if (this.cancelToken) this.cancelToken.cancel()
  }

  changePage(page: number): void {
    this.getSearchMatches({
      page,
      limit: this.searchMatches.meta.itemsPerPage
    })
  }

  async send(): Promise<void> {
    this.setSearchFilter({ ...this.form })
    this.changePage(1)
  }

  async confirmMatch(matchId: number): Promise<void> {
    try {
      this.setLoading(true)
      this.cancelToken = axios.CancelToken.source()
      await matchesService.confirmMatch(this.cancelToken.token, {
        matchId,
        teamId: this.id
      })
      this.setSnackbar({ text: 'Partida agendada com sucesso!' })
    } catch (e) {
      if (axios.isCancel(e)) return
      console.error(e)
    } finally {
      this.setLoading(false)
      this.changePage(1)
    }
  }
}
</script>
