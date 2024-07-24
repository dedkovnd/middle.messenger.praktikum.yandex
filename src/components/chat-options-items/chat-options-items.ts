import Block from "../../tools/Block";
import { ChatOptionsActions } from "../chat-options-actions";
import { addAvatar, createChat, loadChats, deleteChat } from "../../services/chats";
import { Modal } from "../modal";
import { connect } from "../../utils/connect";

class ChatOptionsItems extends Block {
    constructor({...props}) {
        super({
            ...props
        })
    }

    init() {
        const onChangeBind = this.onChange.bind(this)
        const onActiveChatBind = this.onActive.bind(this)
        const onHiddenChatBind = this.onHidden.bind(this)
        const createChatBind = this.onCreateChat.bind(this)
        const onChangeChatModal = this.onChangeText.bind(this)
        const onDeleteChatBind= this.onDeleteChat.bind(this)
        const PhotoOption = new ChatOptionsActions({text: 'Добавить фото чата', isInput: true, onChange: onChangeBind})
        const AddChat = new ChatOptionsActions({text: 'Добавить чат', onClick: ()=>onActiveChatBind('AddChatModal')})
        const AddUser = new ChatOptionsActions({text: 'Добавить пользователя'})
        const DeleteUser = new ChatOptionsActions({text: 'Удалить пользователя'})
        const DeleteOption = new ChatOptionsActions({text: 'Удалить чат', onClick: onDeleteChatBind})
        const AddChatModal = new Modal({title: 'Добавить чат', hidden: true, isInput: true, 
        textOk: 'Добавить', textNo: 'Отменить', className: 'button__white', 
        onClickOk: createChatBind, onClickNo: ()=>onHiddenChatBind('AddChatModal'), 
        onChange: onChangeChatModal})
        this.children = {
            ...this.children,
            PhotoOption,
            AddChat,
            AddUser,
            DeleteUser,
            DeleteOption,
            AddChatModal
        }
    }

    onActive(elem: string){
        this.children[elem].setProps({hidden: false})
    }
    
    onHidden(elem: string){
        this.children[elem].setProps({hidden: true})
    }

    onCreateChat(){
        //@ts-ignore
        createChat({title: this.children.AddChatModal.props.value})
        this.children.AddChatModal.setProps({hidden: true})
        loadChats()
    }

    onDeleteChat(){
        if (window.store.state.selectedChat?.id){
            //@ts-ignore
            deleteChat({chatId: window.store.state.selectedChat?.id})
            loadChats()
        }
    }

    onChangeText(e: Event) {
        this.children.AddChatModal.setProps({value: (e?.target as HTMLInputElement).value})
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
        {{{DeleteOption}}}
        </div>
        </div>
        `
    }
}
//@ts-ignore
export default connect(({selectedChat, chats}) => ({selectedChat, chats}))(ChatOptionsItems);
