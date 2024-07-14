import UserApi from "../api/user";

const userApi = new UserApi();

export const loadUsers = async (model: any) => {
    window.store.set({isLoading: true});
    try {
        if(model.login.length === 0) {
            window.store.set({users: []});
        } else {
            const users = await userApi.getUsers(model);
            window.store.set({users});
        }
        
    } catch (error) {
        window.store.set({loginError: 'some error'});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const updateUser = async (model: any) => {
    window.store.set({isLoading: true});
    try {
        await userApi.putUser(model);
        
    } catch (error) {
        window.store.set({loginError: 'some error'});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const putPhoto = async (model: any) => {
    window.store.set({isLoading: true});
    try {
        await userApi.putPhoto(model)
    } catch (error) {
        window.store.set({loginError: 'some error'});
    } finally {
        window.store.set({isLoading: false});
    }

}
