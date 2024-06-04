import Block from "../../tools/Block";

export default class ChatItem extends Block {
    constructor({...props}) {
        super({
          ...props,
        })
      }
    
      render() {
          return(`
        <div class="chat-item">
          <div class="chat-item__line"></div>
          <div class="chat-item__block{{#if current}} chat-item__block--current{{/if}}">
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
