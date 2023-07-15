interface ToastOption {
  position:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-center';
  autoClose?: number;
  delay?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: number | undefined;
  theme: 'light' | 'dark' | 'colored';
  style?: { backgroundColor: string };
}

const toastError: ToastOption = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

const toastInfo: ToastOption = {
  position: 'bottom-right',
  autoClose: 5000,
  delay: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export { toastError, toastInfo };
