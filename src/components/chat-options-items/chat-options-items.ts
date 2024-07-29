import Block from "../../tools/Block";
import { ChatOptionsActions } from "../chat-options-actions";
import { addAvatar, addUser, createChat, loadChats, deleteChat, deleteUser } from "../../services/chats";
import { Modal } from "../modal";
import { connect } from "../../utils/connect";
import { Props, IChats, ISelectedChat, IChatUser } from "../../types";

interface ICurrentUser {
    login: string;
    id: number; 
}

interface IUserMap {
    [key: string]: number;
}

interface ConnectedProps {
    selectedChat: ISelectedChat; 
    chats: IChats[];
    chatusers: IChatUser[]
}

class ChatOptionsItems extends Block {
    constructor({...props}) {
        super({
            ...props
        })
    }

    init() {
        const onChangeBind = this.onChange.bind(this)
        const onActiveChatBind = this.onActive.bind(this)
        const onActiveUserBind = this.onActive.bind(this)
        const onDeleteUserOpen = this.onActive.bind(this)
        const onDeleteUserBind = this.onDeleteUser.bind(this)
        const onHiddenChatBind = this.onHidden.bind(this)
        const onHiddenUserBind = this.onHidden.bind(this)
        const onHiddenDeleteUser = this.onHidden.bind(this)
        const createChatBind = this.onCreateChat.bind(this)
        const onCreateUserBind = this.onCreatUser.bind(this)
        const onChangeChatModal = this.onChangeText.bind(this)
        const onChangeUserModal = this.onChangeText.bind(this)
        const onChangeDeleteUser = this.onChangeText.bind(this)
        const onDeleteChatBind= this.onDeleteChat.bind(this)
        const PhotoOption = new ChatOptionsActions({text: 'Добавить фото чата', isInput: true, onChange: onChangeBind})
        const AddChat = new ChatOptionsActions({text: 'Добавить чат', onClick: ()=>onActiveChatBind('AddChatModal')})
        const AddUser = new ChatOptionsActions({text: 'Добавить пользователя', onClick: ()=>onActiveUserBind('AddUserModal')})
        const DeleteUser = new ChatOptionsActions({text: 'Удалить пользователя', onClick: ()=>onDeleteUserOpen('DeleteUserModal')})
        const DeleteOption = new ChatOptionsActions({text: 'Удалить чат', onClick: onDeleteChatBind})
        const AddChatModal = new Modal({title: 'Добавить чат', hidden: true, isInput: true, 
        textOk: 'Добавить', textNo: 'Отменить', className: 'button__white', 
        onClickOk: createChatBind, onClickNo: ()=>onHiddenChatBind('AddChatModal'), 
        onChange: (e: Event)=>onChangeChatModal(e,'AddChatModal'), value: ''})
        const AddUserModal = new Modal({title: 'Добавить пользователя', hidden: true, isInput: true,
            textOk: 'Добавить', textNo: 'Отменить', className: 'button__white',
            onClickOk: onCreateUserBind, onClickNo: ()=>onHiddenUserBind('AddUserModal'), 
            onChange: (e: Event)=>onChangeUserModal(e,'AddUserModal'), value: ''
        })
        const DeleteUserModal = new Modal({title: 'Удалить пользователя', hidden: true, isInput: true,
            textOk: 'Удалить', textNo: 'Отменить', className: 'button__white',
            onClickOk: onDeleteUserBind, onClickNo: ()=>onHiddenDeleteUser('DeleteUserModal'), 
            onChange: (e: Event)=>onChangeDeleteUser(e,'DeleteUserModal'), value: '', description: ''
        })
        this.children = {
            ...this.children,
            PhotoOption,
            AddChat,
            AddUser,
            DeleteUser,
            DeleteOption,
            AddChatModal,
            AddUserModal,
            DeleteUserModal
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if(oldProps === newProps) {
            return false;
        }
        if (window.store.state.selectedChat?.id){
            
           const description = window.store.state.chatusers.map((e: ICurrentUser)=>{return {[e.login]: e.id}}).map((obj: IUserMap) => {
                const key = Object.keys(obj)[0];
                return `${key}: ${obj[key]}`;
            }).join(', ')
            this.children.DeleteUserModal.setProps({description: description})
        }
        return true;
    }

    onActive(elem: string){
        this.children[elem].setProps({hidden: false})
    }
    
    onHidden(elem: string){
        this.children[elem].setProps({hidden: true})
        this.children[elem].setProps({value: ''})
    }

    onCreateChat(){
        createChat({title: this.children.AddChatModal.props.value})
        this.children.AddChatModal.setProps({hidden: true})
        this.children.AddChatModal.setProps({value: ''})
        loadChats()
    }

    onCreatUser(){
        if (window.store.state.selectedChat?.id){
            addUser({users: [this.children.AddUserModal.props.value], chatId: window.store.state.selectedChat?.id})
            this.children.AddUserModal.setProps({hidden: true})
            this.children.AddUserModal.setProps({value: ''})
        }
      
    }

    onDeleteChat(){
        if (window.store.state.selectedChat?.id){
            deleteChat({chatId: window.store.state.selectedChat?.id})
            loadChats()
        }
    }
    
    onDeleteUser() {
        if (window.store.state.selectedChat?.id){
            deleteUser({users: [this.children.DeleteUserModal.props.value], chatId: window.store.state.selectedChat?.id})
            this.children.DeleteUserModal.setProps({hidden: true})
            this.children.DeleteUserModal.setProps({value: ''})
        }
    }

    onChangeText(e: Event, elem: string) {
        this.children[elem].setProps({value: (e?.target as HTMLInputElement).value})
    }



    onChange(e: Event){
        if (window.store.state.selectedChat?.id){
            const formData = new FormData()
            formData.append('chatId', window.store.state.selectedChat.id)
            formData.append('avatar', (e?.target as HTMLInputElement).files![0])
            addAvatar(formData)
            loadChats()
        }
    }

    render() {
        return `
        <div>
        <div class="options-items{{#if hidden}}__hidden{{/if}}">
        {{{AddChat}}}
        {{{AddChatModal}}}
        {{{PhotoOption}}}
        {{{AddUser}}}
        {{{AddUserModal}}}
        {{{DeleteUser}}}
        {{{DeleteUserModal}}}
        {{{DeleteOption}}}
        </div>
        </div>
        `
    }
}

export default connect(({selectedChat, chats, chatusers}: ConnectedProps) => ({selectedChat, chats, chatusers}))(ChatOptionsItems);
