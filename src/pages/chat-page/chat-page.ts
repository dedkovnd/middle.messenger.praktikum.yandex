import Block from "../../tools/Block";
import { ChatItem, Link, ListCard } from "../../components";

export default class Chatpage extends Block {
    init() {
        const data = [
            { name: 'user1', message: 'message1'},
            { name: 'user2', message:'message2' },
            { name: 'user3', message:'message3'},
          ]
        const LinkProfile = new Link({text: 'Профиль', page: 'login'})
        const List = new ListCard({cards: data?.map(({name, message}) =>  new ChatItem({name, message}))})
        this.children = {
          ...this.children,
          //@ts-ignore
          List,
          //@ts-ignore
          LinkProfile
        }
    }
  
  render(){
        return (`
        <main class="main-chat">
        <div class="chat-page">
          <div class="chat-page__list">
            <div class="chat-page__profile">
            {{{ LinkProfile }}}
            </div>
            {{{List}}}
          </div>
        </div>
        </main>
        `)
    }
}
