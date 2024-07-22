import Block from "../../tools/Block";
import { InputField } from "../input-field";

export default class ChatOptionsActions extends Block {
    constructor({...props}){
        super({...props,
          isInput: props.isInput,
          events: {
            click: props.onClick
          },
          InputPhoto: new InputField({
            type: 'file',
            imagelow: true,
            events: {
                change: props.onChange,
                click: props.onClick
            }
          }),
        })
    }
    render() {
        return `
        <div class="option-wrap">
           <p class="option-text">{{{text}}}</p>
           <div class="wrap">
           {{#if isInput}}
           {{{InputPhoto}}}
           {{/if}}
           </div>
        </div>
        `
    }
}
