import { useSelector, useDispatch } from 'react-redux';
import { logout, setLoading, setError } from '../redux/authSlice';
import type { RootState } from '../../../app/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      // Add your login API call here
      // const response = await authAPI.login(email, password);
      // dispatch(setUser(response.data));
      console.log('Login:', email, password);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (userData: any) => {
    dispatch(setLoading(true));
    try {
      // Add your signup API call here
      console.log('Signup:', userData);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout: handleLogout,
  };
};
