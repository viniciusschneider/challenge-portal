<template>
  <div>
    <div v-if="file && isValid" class="d-flex justify-center">
      <v-skeleton-loader v-if="!value" type="avatar"></v-skeleton-loader>
      <div class="img-container" v-else>
        <img :src="value.url" alt="Imagem" />
        <v-btn
          elevation="4"
          class="button-remove"
          icon
          color="primary"
          @click="removeFile"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <v-file-input
      v-else
      prepend-icon="mdi-camera"
      v-model="file"
      :rules="rules"
      @change="sendFile"
    ></v-file-input>
    <v-text-field :rules="rules" :value="!!value" class="hidden"></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { IInputFile } from '@/interfaces/input-file.interface';
import fileService from '@/services/file.service';
import Vue from 'vue';
import { fileType, maxFileSize } from '@/common/form-validate';

@Component
export default class InputFile extends Vue {
  @Prop() value: IInputFile;
  @Prop() readonly rules: any[];
  fileRules = [maxFileSize, fileType];

  file: File = null;

  mounted(): void {
    this.fileRules.push(...this.rules);
  }

  async sendFile(): Promise<void> {
    try {
      if (!this.isValid) return;
      const file = await fileService.createTeamImage(this.file);
      this.$emit('input', file);
    } catch (e) {
      console.error(e);
    }
  }

  async removeFile(): Promise<void> {
    this.file = null;
    this.$emit('input', null);
  }

  get isValid(): boolean {
    return (
      !!this.file &&
      this.file.size < 1000000 &&
      ['image/jpg', 'image/png', 'image/jpeg'].includes(this.file.type)
    );
  }
}
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}

.img-container {
  border-radius: 50%;
  height: 120px;
  overflow: hidden;
  position: relative;
  width: 120px;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .button-remove {
    left: 50%;
    position: absolute;
    top: 120%;
    transform: translate(-50%, -50%);
    transition: ease-in-out 0.3s all;
    visibility: hidden;
    z-index: 1;
  }

  &::before {
    background: #1976d2;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 100%;
    position: absolute;
    top: 100%;
    transition: ease-in-out 0.3s all;
    width: 100%;
    z-index: 2;
  }

  &:hover {
    .button-remove {
      top: 50%;
      visibility: visible;
    }
    cursor: pointer;
    &::before {
      top: 80%;
    }
  }
}
</style>
