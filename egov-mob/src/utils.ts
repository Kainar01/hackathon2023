import { Alert } from 'react-native';

export const errorHandler = (err: any) => {
  console.log(JSON.stringify(err));
  let message =
    err.error || err.message || err.data?.message || err.data?.error;

  if (message instanceof Array) {
    message = JSON.stringify(message[0]);
  }
  alert(message || 'Произошла ошибка попробуйте позже');
};
