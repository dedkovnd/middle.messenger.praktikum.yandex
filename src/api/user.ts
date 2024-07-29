import { HTTPTransport } from "../tools/HTTPTransport";
import { APIError, TUserUpdate, TSearchUser } from "./type";
import { BASEURL } from "./const";


const userApi = new HTTPTransport(`${BASEURL}/user`);

export default class UserApi {
    async getUsers(data: TSearchUser): Promise<any | APIError> {
        return userApi.post('/search', {data});
    }

    async putUser(data: TUserUpdate): Promise<any | APIError> {
        return userApi.put('/profile', {data});
    }

    async putPhoto(data: FormData): Promise<any | APIError> {
        return userApi.put('/profile/avatar', {data});
    }
}
