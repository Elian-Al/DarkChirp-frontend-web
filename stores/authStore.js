import { create } from 'zustand';

const initialState = {
    token: null,
    isAuthenticated: false,
    username: null,
    firstname: null,
    email: null,
    profilePicture: null,
};

const useAuthStore = create((set) => ({
    ...initialState,
    login: (token, userData) => {
        console.log('userData :', userData);
        
        localStorage.setItem('token', token);
        set({
            token: token,
            isAuthenticated: true,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            profilePicture: userData.profilePicture,
        });        
    },
    logout: () => {
        localStorage.removeItem('token');
        set(initialState);
    },
    hydrate: () => {
        const token = localStorage.getItem('token');
        if (token) {
            set({
                token: token,
                isAuthenticated: true,
            });
        }
    },
}));

export default useAuthStore;