import Block from "../../tools/Block";

export default class ListCard extends Block {
    constructor(props: any) {
        super({
            ...props,
        })
    }
  
    render(): string {
        return `
        <div>
            <ul>
                {{{cards}}}
            </ul>
        </div>
        `
    }
  }
