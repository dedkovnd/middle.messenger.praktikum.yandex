import Block from "../../tools/Block";
import { ChatItem, Link, ListCard, Input, Button, Message, ListMessage } from "../../components";
import { loadChats } from "../../services/chats";
import { loadUsers } from "../../services/user";
import { connect } from "../../utils/connect";
import { createWebSocket } from "../../api/websocket";
import { me } from "../../services/auth";
import { IChats, ISelectedChat, IChatUser, IMessage } from "../../types";

interface IDataUser {
  id: number;
  login: string;
  message?: string;
  avatar?: string;
  name?: string;

}

interface IDataSearch {
  id: number;
  last_message: any;
  avatar?: string;
  title?: string;
}

interface ConnectedProps {
  chats: IChats[]; 
  selectedChat: ISelectedChat;
  isLoading: boolean;
  loginError: string;
  messages: IMessage[];
}


class Chatpage extends Block {
    componentDidMount(): void {
        loadChats()
        me()
    }

    init() {
        const onInputBind = this.onInput.bind(this)
        const onSubmitBind = this.onSubmit.bind(this)
        const debounceBind = this.debounce.bind(this)
        const onMessageBind = this.onMessage.bind(this)
        const ButtonMessage = new Button({className: 'button__search', onClick: onSubmitBind, text: 'Отправить'})
        const InputSearh = new Input({placeholder: 'Поиск', className: '-search', 
          onInput: debounceBind(onInputBind, 400), value: ''})
        const InputMessage = new Input({message: true, value: '', onChange: onMessageBind, id: 'messageID', placeholder: 'Введите сообщение...'})
        const LinkProfile = new Link({text: 'Профиль', url: '/settings'})
        const List = new ListCard({cards: []})
        const Messages = new ListMessage({messages: [], header: 'Чат'})
        this.children = {
          ...this.children,
          List,
          LinkProfile,
          InputSearh,
          InputMessage,
          ButtonMessage,
          Messages
        }
    }
   
    componentDidUpdate(): boolean {
      function checkMe(me: string, user: string) {
        if (me === user) {
          return true
        } else {
          return false
        }
      }
      let data = null
      if (window.store.state.users.length === 0) {
        data = window.store.state.chats.map((e: IDataSearch) => ({
          id: e.id, 
          name: e.last_message?.user.login, 
          message: e.last_message?.content,
          avatar: e.avatar,
          title: e.title
        }))
      } else {
         data = window.store.state.users.map((e: IDataUser) => ({id: e.id, name: e.login, message: '', avatar: e.avatar}))
      }
     
      this.children.List.setProps({cards: data?.map(({id, name, message, avatar, title}: any) =>  new ChatItem({id, name, message, avatar, title}))})
      
      let arr = []
      arr.push(...window.store.state.messages.map((e: any) => ({message: e.content, 
          me: ()=>checkMe(window.store.state.me.id, 
          e.user_id)})))
      
      this.children.Messages.setProps({messages: arr?.map(({message, me}) => new Message({message, me})), 
      header: window.store.state.selectedChat?.title})
      return true
    }

    debounce(func: any, delay: number) {
      let timeout: number;
      return function() {
        const args = arguments;
        //@ts-ignore
        const fnCall = () => {func.apply(this, args)}
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay);
      };
    }
    onInput(e: Event) {
      e.preventDefault()
      this.children.InputSearh.setProps({value: (e?.target as HTMLInputElement).value})
      loadUsers({login: (e?.target as HTMLInputElement).value})
    }
    

    onSubmit(e: Event) {
      e.preventDefault()
      if(this.children.InputMessage.props.value !== ''){
        const meID = window.store.state.me.id
        const userID = window.store.state.selectedChat.id
        const message = this.children.InputMessage.props.value
      
        createWebSocket(userID, meID, message)
        this.children.InputMessage.setProps({value: ''})
        const input = document.getElementById('messageID') as HTMLInputElement | null
        input!.value = ''
      }
    }

    onMessage(e: Event) {
      e.preventDefault()
      this.children.InputMessage.setProps({value: (e?.target as HTMLInputElement).value})
    }
    
    render(){
        return (`
        <main class="main-chat">
        <div class="chat-page">
          <div class="chat-page__list">
            <div class="chat-page__profile">
            {{{ LinkProfile }}}
            {{{InputSearh}}}
            </div>
            {{{List}}}
          </div>
          <div class='chat-wrap'>
          <div class='chatlist-wrap'>
            {{{Messages}}}
          </div>
          <form class='message-wrap'>
            {{{InputMessage}}}
            {{{ButtonMessage}}}
          </form>
          </div>
        </div>
        </main>
        `)
    }
}

const mapStateToPropsShort = ({chats, selectedChat, isLoading, loginError, messages}: ConnectedProps) => ({chats, selectedChat, isLoading, loginError, messages})
export default connect(mapStateToPropsShort)(Chatpage)
