import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError } from "./type";
import { BASEURL } from "./const";


const chatApi = new HTTPTransport(`${BASEURL}/chats`);

export default class ChatApi {
    async getChats(): Promise<any | APIError> {
        return chatApi.get('');
    }

    async createChat(data: any): Promise<any | APIError> {
        return chatApi.post('', {data});
    }

    async addUser(data: any): Promise<any | APIError>{
        return chatApi.put('/users', {data})
    }

    async getChatUser(id: any): Promise<any | APIError> {
        return chatApi.get(`/${id}/users`);
    }

    async getChatToken(id: any): Promise<any | APIError> {
        return chatApi.post(`/token/${id}`)
    }

    async deleteChat(data: any): Promise<any | APIError>{
        return chatApi.delete('', {data})
    }
}
