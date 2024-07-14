import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const login = async (model: any) => {
    window.store.set({isLoading: true})
    try {
        await authApi.login(model);
        //@ts-ignore
        window.router.go('/messenger')
        
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const create = async (model: any) => {
    window.store.set({isLoading: true})
    try{
        await authApi.create(model)
        //@ts-ignore
        window.router.go('/messenger')
    } catch (error) {
        window.store.set({loginError: 'some error'})
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
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}
