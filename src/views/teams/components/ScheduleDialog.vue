<template>
  <v-dialog width="100%" v-model="show" persistent max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <h2>Nova partida</h2>
        <v-btn color="primary" elevation="3" icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <Form @send="send" class="pa-5">
        <v-row>
          <v-col cols="12">
            <p class="ma-0 color-primary text-info">Quando será?</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.date"
              type="datetime-local"
              label="Data e hora"
              :rules="rules.date"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <p class="ma-0 color-primary text-info">Onde será?</p>
          </v-col>
          <Address v-model="form.address" />
          <v-col cols="12" class="d-flex justify-end" style="gap: 10px">
            <v-btn
              color="accent"
              elevation="3"
              type="button"
              large
              @click="show = false"
              >Cancelar</v-btn
            >
            <v-btn color="primary" elevation="3" type="submit" large
              >Confirmar</v-btn
            >
          </v-col>
        </v-row>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { IScheduleGameForm } from '@/interfaces/schedule-game-form.interface';
import { required } from '@/common/form-validate';
import Address from '@/components/inputs/Address.vue';
import Form from '@/components/Form.vue';
import Vue from 'vue';
import matchesService from '@/services/matches.service';
import { ICreateMatch } from '@/interfaces/create-match.interface';
import { MatchesModule, UiModule } from '@/store/namespaces';
import { IUiSnackbar } from '@/interfaces/state-ui.interface';
import { ITeamItem } from '@/interfaces/teams.interface';
import { IPaginationParams } from '@/interfaces/pagination-params.interface';
import axios, { CancelTokenSource } from 'axios';

@Component({
  components: { Address, Form }
})
export default class ScheduleDialog extends Vue {
  @UiModule.Mutation('setSnackbar') setSnackbar: (state: IUiSnackbar) => void;
  @MatchesModule.Getter('team') team: ITeamItem;
  @MatchesModule.Action('getTeamMatches') getTeamMatches: (
    payload: IPaginationParams
  ) => Promise<void>;
  @UiModule.Mutation('setLoading') setLoading: (state: boolean) => void;

  @Prop({ required: true }) value: boolean;
  cancelToken: CancelTokenSource | null = null;
  form: IScheduleGameForm = {
    date: null,
    address: {
      save: false,
      name: '',
      cep: '',
      city: '',
      complement: '',
      neighborhood: '',
      number: null,
      state: '',
      street: ''
    }
  };
  rules = {
    date: [required]
  };

  get show(): boolean {
    return this.value;
  }

  set show(value: boolean) {
    this.$emit('input', value);
  }

  destroyed(): void {
    if (this.cancelToken) this.cancelToken.cancel();
  }

  async send(): Promise<void> {
    try {
      this.setLoading(true);
      const { address, date } = this.form;
      const match: ICreateMatch = { date, teamId: this.team.id };

      if (address.id) {
        match.addressId = address.id;
      } else {
        delete address.id;
        match.address = address;
      }

      this.cancelToken = axios.CancelToken.source();
      await matchesService.create(this.cancelToken.token, match);
      this.show = false;
      this.setSnackbar({ text: 'Partida criada com sucesso!' });
      this.getTeamMatches({ page: 1, limit: 6 });
    } catch (e) {
      if (axios.isCancel(e)) return;
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }
}
</script>

<style lang="scss">
.v-dialog {
  margin: 5px !important;
}
@media only screen and (max-width: 959.98px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: flex;
    margin-left: 8px;
  }
}
.color-primary {
  color: #1976d2;
}
.text-info {
  font-weight: bold;
  letter-spacing: 1.5;
  text-transform: uppercase;
}
</style>
