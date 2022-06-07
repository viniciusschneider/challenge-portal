export const required = (value: any) => !!value || "Campo é obrigatório";
export const minLength = (length: number) => (value: any) =>
  (value || "").length >= length || `Tamanho mínimo é ${length}`;
export const email = (value: any) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  ) || "Email é inválido";
export const maxFileSize = (value: File) => !!value && value.size <= 1000000 || 'Imagem excede o tamanho máximo de 1 MB';
export const fileType = (value: File) => ['image/jpg', 'image/png', 'image/jpeg'].includes(value?.type) || 'Arquivo inválido'
