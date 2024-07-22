import ChatApi from "../api/chats";
import { TCreatChat } from "../api/type";

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

const createChat = async (model: TCreatChat) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.createChat(model);
        
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const addUser = async (model: number) => {
    window.store.set({isLoading: true})
    try {
        return chatsApi.addUser(model);
        
    } catch (error) {
        window.store.set({loginError: 'some error'})
    } finally {
        window.store.set({isLoading: false})
    }
}

export const loadChatUser = async ( id: number ) => {
    window.store.set({isLoading: true});
    try {
        const user = await chatsApi.getChatUser(id);
        //@ts-ignore
        if (user.reason === "No chat") {
            const title = String(Math.floor(100000 + Math.random() * 900000))
            return createChat({title: title})
        } else {
            return user
        }
        
    } catch (error) {
        window.store.set({loginError: 'Error'});
    } finally {
        window.store.set({isLoading: false});
    }

}

export const deleteChat = async (id: string) => {
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
