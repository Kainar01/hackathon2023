import { useAppSelector } from '~/store/store';

export const useAuth = () => {
  const { isLoggedIn, token } = useAppSelector((state) => state.authSlice);

  return { isLoggedIn, token };
};
