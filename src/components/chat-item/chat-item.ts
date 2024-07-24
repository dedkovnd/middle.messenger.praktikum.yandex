import Block from "../../tools/Block";
import { connect } from "../../utils/connect";

class ChatItem extends Block {
    constructor({...props}) {
        super({
          ...props,
          active: props.activeId === props.id,
            events: {
                click: () => {
                    const card = {
                        name: props.name,
                        id: props.id,
                        message: props.message,
                        avatar: props.avatar,
                        title: props.title
                    }
                    console.log(card)
                    window.store.set({selectedChat: card})
                }
            }
          
        })
      }
    
      render() {
        //@ts-ignore
        const isActive = this.props.selectedChat?.id === this.props.id
          return(`
        <div class="chat-item{{#if ${isActive}}}__active{{/if}}">
          <div class="chat-item__line"></div>
          <div class="chat-item__block">
            {{#if title}}
            <div>{{title}}</div>
            {{else}}
            {{name}}
            {{/if}}
            {{#if avatar}}
              <img class="chat-item__avatar" src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="Фото чата"><img>
            {{else}}
            <div class="chat-item__avatar"></div>
            {{/if}}
            {{#if message}}
            <div class="chat-item__message"><span class="chat-item__message-text">{{ message }}</span></div>
            {{/if}}
          </div>
        </div>
          `)
      }
}
//@ts-ignore
export default connect(({selectedChat, chats}) => ({selectedChat, chats}))(ChatItem);
