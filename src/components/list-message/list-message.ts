import Block from "../../tools/Block";
import { ChatOptions } from "../chat-options";

export default class ListMessage extends Block {
    constructor(props: any) {
        super({
            ...props,
        })
    }

    init() {
        const onClickBind = this.onClick.bind(this)
        const Options = new ChatOptions({onOpen: onClickBind, hidden: true})
        this.children = {
            ...this.children,
            Options,
        }
    }
    onClick (){
        const status = this.children.Options.props.hidden
        this.children.Options.setProps({hidden: !status})
    }
    render(): string {
        return `
        <div>
          <div class="chat-option">
            <div>
            {{{header}}}
            </div>
            {{{Options}}}
          </div>
          <ul class="list-message">
            {{{messages}}}
          </ul>
        </div>
        `
    }
  }
