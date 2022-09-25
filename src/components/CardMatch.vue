<template>
  <v-card class="pa-5 card-container" max-width="375px">
    <div class="teams">
      <div>
        <img :src="data.localTeamImage" alt="Logo do time local" />
        <p>{{ data.localTeamName }}</p>
      </div>
      <template v-if="!confirmMatch">
        <span class="primary-color">&times;</span>
        <div>
          <template v-if="data.visitingTeamImage">
            <img :src="data.visitingTeamImage" alt="Logo do time visitante" />
            <p>{{ data.visitingTeamName }}</p>
          </template>
          <p v-else>Aguardando adversário!</p>
        </div>
      </template>
    </div>
    <v-divider class="pa-3"></v-divider>
    <div>
      <p class="pa-0 d-flex align-center">
        <v-icon color="primary">mdi-calendar-clock</v-icon>
        <span class="ps-3">{{ data.date | date('DD/MM/YYYY HH:mm') }}</span>
      </p>
      <p class="pa-0 d-flex align-center">
        <v-icon color="primary">mdi-home</v-icon>
        <span class="ps-3">
          {{ data.number }} - {{ data.street }}, {{ data.neighborhood }}
          <br />
          {{ data.city }} - {{ data.state }}, {{ data.cep }}
          <br />
          {{ data.complement }}
        </span>
      </p>
    </div>
    <div class="d-flex justify-end" v-if="confirmMatch">
      <v-btn
        color="accent"
        elevation="3"
        type="button"
        @click="confirm(data.id)"
        >Agendar</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts">
import { ITeamMatchesItem } from '@/interfaces/team-matches.interface'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class CardMatch extends Vue {
  @Prop({ required: true }) data: ITeamMatchesItem
  @Prop({ default: false }) confirmMatch: boolean

  confirm(matchId: number): void {
    this.$emit('confirm', matchId)
  }
}
</script>

<style lang="scss" scoped>
.teams {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  span {
    font-size: 60px;
  }

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      border-radius: 50%;
      height: 100px;
      width: 100px;
    }
  }
}

.card-container {
  min-height: 100%;
}
</style>
