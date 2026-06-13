import {useDispatch} from 'react-redux';
import {register , login, getMe} from '../service/auth.api';
import { setUser, setLoading, setError } from '../auth.slice';

export function useAuth() {
    const dispatch = useDispatch();
    async function handleRegister({email, username, password}){
        try{
            dispatch(setLoading(true));
            const data = await register({email, username, password});

        }
        catch(error){
            dispatch(setError(error.response?.data?.message || 'Registration failed'));
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email, password}){
        try{
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({email, password});
            dispatch(setUser(data.user));
        }
        catch(error){
            const errorMsg = error.message || error.response?.data?.message || 'Login failed';
            dispatch(setError(errorMsg));
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || 'Failed to fetch user data'));
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
    }
}