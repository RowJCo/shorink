import { create } from 'zustand';

const userStore = create((set) => ({
    signedIn: false,
    signInForm: {
        email: "",
        password: "",
    },
    signUpForm: {
        email: "",
        password: "",
    },
    updateSignInForm: (e) => {
        try {
            set((state) => ({ signInForm: { ...state.signInForm, [e.target.name]: e.target.value } }));
        } catch (error) {
            console.log(error);
        }
    },
    updateSignUpForm: (e) => {
        try {
            set((state) => ({ signUpForm: { ...state.signUpForm, [e.target.name]: e.target.value } }));
        } catch (error) {
            console.log(error);
        }
    },
    signIn: async () => {
        try {
            const { signInForm } = userStore.getState();
            await fetch("https://shorink.onrender.com/api/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInForm),
            });
            set({ signedIn: true, signInForm: { email: "", password: "" } });
        } catch (error) {
            console.log(error);
        }
    },
    signUp: async () => {
        try {
            const { signUpForm } = userStore.getState();
            await fetch("https://shorink.onrender.com/api/sign-up", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpForm),
            });
            set({ signUpForm: { email: "", password: "" } });
        } catch (error) {
            console.log(error);
        }
    },
    signOut: async () => {
        try {
            await fetch("https://shorink.onrender.com/api/sign-out", {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            set({ signedIn: false });
        } catch(error) {
            console.log(error);
        }
    },
    checkAuth: async () => {
        try {
            await fetch("https://shorink.onrender.com/api/check-auth", {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            set({ signedIn: true });
        } catch(error) {
            console.log(error);
            set({ signedIn: false });
        }
    },
}));

export default userStore;