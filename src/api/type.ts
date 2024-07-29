export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type TSearchUser = {
    login: string
}

export type TCreatChat = {
    title?: string | unknown
}

export type TDeleteUser = {
    users: [] | unknown,
    chatId: number
}

export type TUserUpdate = {
    email: string | unknown, 
    login: string | unknown, 
    first_name: string | unknown, 
    second_name: string | unknown, 
    display_name: string | unknown, 
    phone: string | unknown
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name?: string;
    avatar?: string;
    phone: string;
    email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'>  & {
    password: string
} | unknown

export type CreateChat = {
    title?: string
}

export type LoginRequestData = {
    login: string,
    password: string
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
}
