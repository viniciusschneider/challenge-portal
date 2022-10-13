<template>
  <div style="display: contents">
    <v-col cols="12">
      <v-chip-group active-class="pa-4" @change="setAddress">
        <v-slide-x-transition group>
          <v-chip
            v-for="address of userAddress"
            :key="address.id"
            class="ma-2"
            color="green"
            outlined
            :value="address"
          >
            <v-icon left> mdi-home </v-icon>
            {{ address.name }}
          </v-chip>
        </v-slide-x-transition>
      </v-chip-group>
    </v-col>
    <v-slide-x-transition>
      <v-col cols="12" v-if="!usedUserAddress">
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-switch v-model="value.save" label="Salvar endereço?"></v-switch>
          </v-col>
          <v-slide-x-transition>
            <v-col cols="12" md="6" v-if="value.save">
              <v-text-field
                :rules="rules.name"
                dense
                label="Defina um apelido para o endereço"
                v-model.trim="value.name"
                v-model="value.name"
                maxLength="50"
              ></v-text-field>
            </v-col>
          </v-slide-x-transition>
        </v-row>
      </v-col>
    </v-slide-x-transition>
    <v-col cols="12" md="6">
      <v-text-field
        @input="findCEP"
        maxLength="8"
        :rules="rules.cep"
        dense
        label="CEP"
        v-model.trim="value.cep"
        :disabled="usedUserAddress"
      >
        <template v-slot:append>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="loading"
              size="24"
              color="info"
              indeterminate
            ></v-progress-circular>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :disabled="disabled"
        :rules="rules.state"
        dense
        label="Estado"
        v-model.trim="value.state"
        maxLength="50"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :disabled="disabled"
        :rules="rules.city"
        dense
        label="Cidade"
        v-model.trim="value.city"
        maxLength="50"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :disabled="disabled"
        :rules="rules.neighborhood"
        dense
        label="Bairro"
        v-model.trim="value.neighborhood"
        maxLength="50"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :disabled="disabled"
        :rules="rules.street"
        dense
        label="Rua"
        v-model.trim="value.street"
        maxLength="50"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :disabled="disabled"
        :rules="rules.number"
        dense
        label="Número"
        v-model.trim="value.number"
        maxLength="50"
        type="number"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-textarea
        label="Complemento"
        v-model.trim="value.complement"
        :disabled="disabled"
        solo
        maxLength="100"
      ></v-textarea>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { IAddress } from '@/interfaces/address.interface';
import { maxLength, minLength, required } from '@/common/form-validate';
import addressService from '@/services/address.service';
import Vue from 'vue';
import { ConfigsModule } from '@/store/namespaces';
import { IUserAddress } from '@/interfaces/user-address.interface';

@Component({})
export default class Address extends Vue {
  @ConfigsModule.Action('getUserAddress') getUserAddress: () => Promise<void>;
  @ConfigsModule.Getter('userAddress') userAddress: IUserAddress[];

  @Prop({ required: true }) value: IAddress;
  rules = {
    cep: [required, minLength(8), maxLength(8)],
    state: [required, maxLength(50)],
    city: [required, maxLength(50)],
    neighborhood: [required, maxLength(50)],
    street: [required, maxLength(50)],
    number: [required],
    name: [required, maxLength(50)]
  };
  loading = false;
  usedUserAddress = false;
  newAddress: IAddress;

  get disabled(): boolean {
    return this.loading || this.usedUserAddress;
  }

  setAddress(address: IUserAddress | null): void {
    if (!this.usedUserAddress) this.newAddress = { ...this.value };

    if (!address) {
      this.usedUserAddress = false;
      this.$emit('input', { ...this.newAddress, id: null });
      return;
    }

    const { id, cep, city, complement, neighborhood, number, state, street } =
      address;

    this.$emit('input', {
      id,
      cep,
      city,
      complement,
      neighborhood,
      number,
      state,
      street
    });
    this.usedUserAddress = true;
  }

  async findCEP(): Promise<void> {
    try {
      const { cep } = this.value;

      if (cep.length === 8) {
        this.loading = true;
        const address = await addressService.findCEP(cep);
        this.$emit('input', {
          ...this.value,
          ...address
        });
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
    }
  }

  mounted(): void {
    this.getUserAddress();
  }
}
</script>

<style lang="scss">
.v-slide-group__content {
  max-width: 100% !important;
  white-space: normal !important;
}
</style>
