<template>
  <div class="page-container d-flex justify-center">
    <div class="page-content">
      <div class="text-center">
        <h1>Bem vindo</h1>

        <v-avatar size="100">
          <img src="@/assets/img_avatar.png" alt="Avatar" />
        </v-avatar>
      </div>

      <Form class="ma-10" @send="send">
        <v-col cols="12">
          <v-text-field
            id="email"
            v-model.trim="form.email"
            label="E-mail"
            dense
            :rules="rules.email"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            id="password"
            v-model.trim="form.password"
            label="Senha"
            dense
            :rules="rules.password"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn
            id="btn-submit"
            type="submit"
            block
            color="primary"
            elevation="3"
            x-large
            :loading="loading"
            >Login</v-btn
          >
        </v-col>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { email, minLength, required } from '@/common/form-validate';
import { IAccessToken } from '@/interfaces/access-token.interface';
import { UserModule } from '@/store/namespaces';
import Form from '@/components/Form.vue';
import loginService from '@/services/login.service';
import Vue from 'vue';
import { EnumRouteNames } from '@/router';

@Component({
  components: { Form }
})
export default class Login extends Vue {
  @UserModule.Action('setAccessToken') setAccessToken: (
    payload: IAccessToken
  ) => Promise<void>;

  loading = false;
  form = { email: '', password: '' };
  rules = {
    email: [required, email],
    password: [required, minLength(8)]
  };

  async send(): Promise<void> {
    try {
      this.loading = true;
      const response = await loginService.login(this.form);
      this.setAccessToken(response);
      this.$router.push({ name: EnumRouteNames.TEAMS_LIST });
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  .page-content {
    margin-top: 100px;

    h1 {
      font-size: 25px;
      margin-bottom: 15px;
    }
  }
}
</style>
