import Block from "../../tools/Block";

class Button extends Block {
    constructor({...props}) {
        super({
            ...props,
            events: {
                click: props.onClick,
                submit: props.onSubmit
            }
        })
    }

    render(): string {
        return `
        <button class="button{{#if className}} {{className}}{{/if}}" type="{{type}}">
        {{ text }}
        </button>
      `
    }
}

export default Button;
