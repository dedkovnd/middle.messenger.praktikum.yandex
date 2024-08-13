import AuthApi from "../api/auth";
import { LoginRequestData, CreateUser } from "../api/type";

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
    window.store.set({isLoading: true})
    try {
        await authApi.login(model).then((res) => {
            //@ts-ignore
            if (res === null || res.reason === "User already in system") {
                window.router.go('/messenger')
            }
        });
        
    } catch (error) {
        window.store.set({loginError: error})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const create = async (model: CreateUser) => {
    window.store.set({isLoading: true})
    try{
        await authApi.create(model)
        window.router.go('/messenger')
    } catch (error) {
        window.store.set({loginError: error})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const me = async () => {
    window.store.set({isLoading: true})
    try{
        const me = await authApi.me()
        window.store.set({me})
    } catch (error) {
        window.store.set({loginError: error})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const logout = async ()=> {
    window.store.set({isLoading: true})
    try{
        await authApi.logout()
        window.router.go('/')
    } catch (error) {
        window.store.set({loginError: error})
    } finally {
        window.store.set({isLoading: false})
    }
}
