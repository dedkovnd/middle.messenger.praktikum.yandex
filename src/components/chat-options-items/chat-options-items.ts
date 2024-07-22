import Block from "../../tools/Block";
import { ChatOptionsActions } from "../chat-options-actions";
import { addAvatar } from "../../services/chats";
import { Modal } from "../modal";

export default class ChatOptionsItems extends Block {
    constructor({...props}) {
        super({
            ...props
        })
    }

    init() {
        const onChangeBind = this.onChange.bind(this)
        const PhotoOption = new ChatOptionsActions({text: 'Добавить фото чата', isInput: true, onChange: onChangeBind})
        const AddChat = new ChatOptionsActions({text: 'Добавить чат'})
        const AddUser = new ChatOptionsActions({text: 'Добавить пользователя'})
        const DeleteUser = new ChatOptionsActions({text: 'Удалить пользователя'})
        const DeleteOption = new ChatOptionsActions({text: 'Удалить чат'})
        const NewModal = new Modal({title: 'title', hidden: true, isInput: true,})
        this.children = {
            ...this.children,
            PhotoOption,
            AddChat,
            AddUser,
            DeleteUser,
            DeleteOption,
            NewModal
        }
    }

    onActive(elem: string){
        this.children[elem].setProps({hidden: false})
    }

    onChange(e: Event){
    const formData = new FormData()
    formData.append('chatId', window.store.state.selectedChat.id)
    formData.append('avatar', (e?.target as HTMLInputElement).files![0])
    addAvatar(formData)
    }

    render() {
        return `
        <div>
        <div class="options-items{{#if hidden}}__hidden{{/if}}">
        {{{AddChat}}}
        {{{NewModal}}}
        {{{PhotoOption}}}
        {{{DeleteOption}}}
        </div>
        </div>
        `
    }
}
