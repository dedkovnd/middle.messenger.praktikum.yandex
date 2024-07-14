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
                        message: props.message
                    }
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
            <div>{{name}}</div>
            {{#if avatar}}
            <div>
              <img class="chat-item__avatar" src={{ avatar }} alt="Фото пользователя"><img>
            </div>
            {{else}}
            <div class="chat-item__avatar"></div>
            {{/if}}
            <div class="chat-item__avatar"></div>
            <div class="chat-item__message"><span class="chat-item__message-text">{{ message }}</span></div>
          </div>
        </div>
          `)
      }
}
//@ts-ignore
export default connect(({selectedChat}) => ({selectedChat}))(ChatItem);
