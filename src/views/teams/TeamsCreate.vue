<template>
  <div class="mt-10 d-flex align-center flex-column">
    <h1>Crie seu novo time!</h1>

    <Form class="mt-15" @send="send">
      <v-col cols="12">
        <InputFile
          :rules="rules.imageId"
          v-model="image"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          :rules="rules.name"
          dense
          label="Nome"
          v-model.trim="form.name"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-select
          :items="typesSport"
          :rules="rules.typeSportId"
          item-text="name"
          item-value="id"
          label="Esporte"
          v-model="form.typeSportId"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          elevation="3"
          type="submit"
          x-large
        >Salvar</v-btn>
      </v-col>
    </Form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import teamsService from '@/services/teams.service';
import Form from '@/components/Form.vue';
import InputFile from '@/components/inputs/InputFile.vue';
import { fileType, maxFileSize, minLength, required } from '@/common/form-validate';
import { ConfigsModule, UiModule } from '@/store/namespaces';
import { ITypeSport } from '@/interfaces/type-sport.interface';
import { ICreateTeam } from '@/interfaces/create-team.interface';
import { IUiSnackbar } from '@/interfaces/state-ui.interface';
import { IInputFile } from '@/interfaces/input-file.interface';

@Component({
  components: { Form, InputFile }
})
export default class TeamsCreate extends Vue {
  @ConfigsModule.Action("getTypesSport") getTypesSport: () => void;
  @ConfigsModule.Getter("typesSport") typesSport: ITypeSport[];
  @UiModule.Mutation("setSnackbar") setSnackbar: (state: IUiSnackbar) => void;

  image: IInputFile = null;
  form: ICreateTeam = { name: '', typeSportId: null, imageId: null };
  rules = {
    name: [required, minLength(5)],
    typeSportId: [required],
    imageId: [required, maxFileSize, fileType],
  }

  mounted() {
    this.getTypesSport();
  }

  async send() {
    try {
      this.form.imageId = this.image.id;
      await teamsService.create(this.form);
      this.$router.push({ name: 'Teams' });
      this.setSnackbar({ text: 'Time cadastrado com sucesso!' });
    } catch (e) {
      console.error(e);
    } finally {

    }
  }
}
</script>