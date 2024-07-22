import Block from "../../tools/Block";
import { ChatOptionsItems } from "../chat-options-items";

type Props = {
    events?: { [eventName: string]: (e: Event) => void }
    [prop: string]: unknown
  }

export default class ChatOptions extends Block {
    constructor({...props}) {
        super({
            ...props,
            OptionsItems: new ChatOptionsItems({
                hidden: props.hidden,
            }),
            events: {
                click: props.onOpen
            }
        })
    }
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if(oldProps === newProps) {
            return false;
        }
        this.children.OptionsItems.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="menu-wrap">
        <div class="menu">
         <hr class="menu-line"></hr>
         <hr class="menu-line"></hr>
         <hr class="menu-line"></hr>
        </div>
        {{{OptionsItems}}}
        <div>
      `
    }
}
