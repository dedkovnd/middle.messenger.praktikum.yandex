import ChatApi from "../api/chats";
import { TCreatChat, TDeleteUser } from "../api/type";

const chatsApi = new ChatApi();

export const loadChats = async ( ) => {
    window.store.set({isLoading: true});
    try {
        const chats = await chatsApi.getChats();
        window.store.set({chats});
    } catch (error) {
        window.store.set({loginError: 'Error'});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const createChat = async (model: TCreatChat) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.createChat(model);
        
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const addUser = async (model: TDeleteUser) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.addUser(model);
        
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const loadChatUsers = async ( id: number ) => {
    window.store.set({isLoading: true});
    try {
        const chatusers = await chatsApi.getChatUsers(id);
        window.store.set({chatusers})
        
    } catch (error) {
        window.store.set({loginError: 'Error'});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const deleteChat = async (id: number | unknown) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.deleteChat(id);
        
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const addAvatar = async (data: FormData) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.addAvatar(data)
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const deleteUser = async (data: TDeleteUser) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.deleteUser(data)
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const getToken = async (data: string) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.getChatToken(data)
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}
