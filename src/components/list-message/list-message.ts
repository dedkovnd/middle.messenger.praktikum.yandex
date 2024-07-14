import Block from "../../tools/Block";

export default class ListMessage extends Block {
    constructor(props: any) {
        super({
            ...props,
        })
    }
  
    render(): string {
        return `
        <div>
            <ul class="list-message">
                {{{messages}}}
            </ul>
        </div>
        `
    }
  }
