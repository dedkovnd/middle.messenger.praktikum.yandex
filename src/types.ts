export interface ISelectedChat {
    name?: string;
    id: number;
    message?: string;
    avatar?: string | null;
    title: string;
  }
  
  export interface IChats {
    id: number;
    title: string;
    avatar?: string | null;
    created_by: number;
    unread_count: number;
    last_message: any;
  }

  export type Props = {
    events?: { [eventName: string]: (e: Event) => void }
    [prop: string]: unknown
  }

  export interface IChatUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name?: string | null;
    login: string;
    avatar?: string;
    role?: string;
  }

  export interface IMe {
    id: number;
    first_name: string;
    second_name: string;
    display_name?: string | null;
    login: string;
    avatar?: string | null;
    email: string;
    phone: string;
}

export interface IMessage {
    id: number;
    user_id: number;
    chat_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file?: null | File;
}
