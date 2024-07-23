import Block from "../../tools/Block";
import { ChatOptions } from "../chat-options";

export default class ListMessage extends Block {
    constructor(props: any) {
        super({
            ...props,
        })
    }

    init() {
        const Options = new ChatOptions({hidden: true})
        this.children = {
            ...this.children,
            Options,
        }
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
