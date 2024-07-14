import Block from "../../tools/Block";

export default class UserOption extends Block{
    constructor({...props}) {
        super({
            ...props
        })
    }

    render() {
        return(`
        <div class="user-option{{#if className}} {{className}}{{/if}}" page={{page}}>
          <a class='user-link' href={{{url}}}>{{ text }}</a>
        </div>
        `)
    }
}
