import UserApi from "../api/user";
import { TUserUpdate, TSearchUser } from "../api/type";

const userApi = new UserApi();

export const loadUsers = async (model: TSearchUser) => {
    window.store.set({isLoading: true});
    try {
        if(model.login.length === 0) {
            window.store.set({users: []});
        } else {
            const users = await userApi.getUsers(model);
            window.store.set({users});
        }
        
    } catch (error) {
        window.store.set({loginError: error});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const updateUser = async (model: TUserUpdate) => {
    window.store.set({isLoading: true});
    try {
        const me = await userApi.putUser(model);
        window.store.set({me})
    } catch (error) {
        window.store.set({loginError: error});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const putPhoto = async (model: FormData) => {
    window.store.set({isLoading: true});
    try {
        const me = await userApi.putPhoto(model)
        window.store.set({me})
    } catch (error) {
        window.store.set({loginError: error});
    } finally {
        window.store.set({isLoading: false});
    }

}
