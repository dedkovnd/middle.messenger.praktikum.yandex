import Block from "../../tools/Block";
import { ChatItem, Link } from "../../components";

export default class Chatpage extends Block {
  constructor(props: any) {
    super({
      ...props,//{buttonText: 'Button'}
      lists: [
            new ChatItem({name: 'Samanta Smith', message: 'Алло, на!',}),
            new ChatItem({name: 'John Dow', message: 'What?',})
      ],
    })
  }
    init() {
        const data = [
            { name: 'user1', message: 'message1'},
            { name: 'user2', message:'message2' },
            { name: 'user3', message:'message3'},
          ]
        const LinkProfile = new Link({text: 'Профиль', page: 'login'})
        const List = data.map(({name, message}) => new ChatItem({name, message}))
        this.children = {
          ...this.children,
          //@ts-ignore
          List,
          LinkProfile
        }
    }
    
    

    render(){
        return (`
        <main class="main-chat">
        <div class="chat-page">
          <div class="chat-page__list">
            <div class="chat-page__profile">
            {{{lists}}}
            {{{ LinkProfile }}}
            </div>
          </div>
        </div>
        </main>
        `)
    }
}
