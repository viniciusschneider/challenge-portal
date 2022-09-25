declare type SnackbarStatus = 'success' | 'error';

export interface IStateUi {
  drawer: boolean;
  loading: boolean;
  snackbar: IUiSnackbar;
}

export interface IUiSnackbar {
  show?: boolean;
  status?: SnackbarStatus;
  text: string;
}
