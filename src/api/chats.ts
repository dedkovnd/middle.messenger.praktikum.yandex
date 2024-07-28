import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError, TCreatChat, TDeleteUser } from "./type";
import { BASEURL } from "./const";


const chatApi = new HTTPTransport(`${BASEURL}/chats`);

export default class ChatApi {
    async getChats(): Promise<unknown | APIError> {
        return chatApi.get('');
    }

    async createChat(data: TCreatChat): Promise<unknown | APIError> {
        return chatApi.post('', {data});
    }

    async addUser(data: unknown): Promise<unknown | APIError>{
        return chatApi.put('/users', {data})
    }

    async getChatUsers(id: number): Promise<unknown| APIError> {
        return chatApi.get(`/${id}/users`);
    }

    async getChatToken(id: string): Promise<unknown | APIError> {
        return chatApi.post(`/token/${id}`)
    }

    async addAvatar(data: FormData): Promise<unknown | APIError> {
        return chatApi.put(`/avatar`, {data})
    }

    async deleteChat(data: string): Promise<unknown | APIError>{
        return chatApi.delete('', {data})
    }

    async deleteUser(data: TDeleteUser): Promise<unknown | APIError> {
         return chatApi.delete('/users', {data})
    }
}
