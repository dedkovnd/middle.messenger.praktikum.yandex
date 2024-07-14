import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError } from "./type";
import { BASEURL } from "./const";


const userApi = new HTTPTransport(`${BASEURL}/user`);

export default class UserApi {
    async getUsers(data: any): Promise<any | APIError> {
        return userApi.post('/search', {data});
    }

    async putUser(data: any): Promise<any | APIError> {
        return userApi.put('/profile', {data});
    }

    async putPhoto(data: any): Promise<any | APIError> {
        return userApi.put('/profile/avatar', {data});
    }
}
