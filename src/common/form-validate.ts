type FormEntries = number | string | File | boolean;
type FormError = boolean | string;
type FuncFormError = (value: string) => FormError;

export const required = (value: FormEntries): FormError =>
  !!value || 'Campo é obrigatório';

export const requiredIntervalDates = (value: string): FormError =>
  (value || '').split(' até ').filter((v: string) => !!v).length === 2 ||
  'Informe um intervalo entre as datas';

export const minLength =
  (length: number): FuncFormError =>
  (value: string): FormError =>
    (value || '').length >= length || `Tamanho mínimo é ${length}`;

export const maxLength =
  (length: number): FuncFormError =>
  (value: string): FormError =>
    (value || '').length <= length || `Tamanho máximo é ${length}`;

export const email = (value: string): FormError =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  ) || 'Email é inválido';

export const maxFileSize = (value: File): FormError =>
  (!!value && value.size <= 1000000) ||
  'Imagem excede o tamanho máximo de 1 MB';

export const fileType = (value: File): FormError =>
  ['image/jpg', 'image/png', 'image/jpeg'].includes(value?.type) ||
  'Arquivo inválido';
