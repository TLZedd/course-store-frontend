import axios from 'axios';
import { history } from '../common/history';
import store from '../store';
import { clearCurrentUser } from '../store/actions/user';

export const authHeader = () => {
    const currentUser = store.getState().user;

    return {
        'Content-Type': 'application/json',
        'authoroization': 'Bearer' + currentUser?.token,
    }
}

export function handleResponseWithLoginCheck() {
    axios.interceptors.response.use(
        response => response,
        error => {
            const currentUser = store.getState().user;
            const isLoggedIn = currentUser?.token;
            const status = error?.response?.status;

            if (isLoggedIn && [401, 403].includes(status)) {
                store.dispatch(clearCurrentUser());

                history.push('/login');
            }

            return Promise.reject(error);
        }
    )
}