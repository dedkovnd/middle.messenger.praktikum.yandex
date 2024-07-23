import Block from "../../tools/Block";
import { ChatOptionsItems } from "../chat-options-items";
import { ChatMenu } from "../chat-menu";
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
            ChatMenu: new ChatMenu({onClick: ()=>{
                const status = this.children.OptionsItems.props.hidden
                this.children.OptionsItems.setProps({hidden: !status})
            }})
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
        {{{ChatMenu}}}
        {{{OptionsItems}}}
        <div>
      `
    }
}
