import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError } from "./type";
import { BASEURL } from "./const";


const chatApi = new HTTPTransport(`${BASEURL}/chats`);

export default class ChatApi {
    async getChats(): Promise<unknown | APIError> {
        return chatApi.get('');
    }

    async createChat(data: any): Promise<unknown | APIError> {
        return chatApi.post('', {data});
    }

    async addUser(data: any): Promise<unknown | APIError>{
        return chatApi.put('/users', {data})
    }

    async getChatUser(id: number): Promise<unknown| APIError> {
        return chatApi.get(`/${id}/users`);
    }

    async getChatToken(id: string): Promise<unknown | APIError> {
        return chatApi.post(`/token/${id}`)
    }

    async deleteChat(data: string): Promise<unknown | APIError>{
        return chatApi.delete('', {data})
    }
}
