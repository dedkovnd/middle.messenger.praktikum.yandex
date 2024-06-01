import Block from "../../tools/Block";

class InputField extends Block {
    constructor({...props}) {
        super(props)
    }

    render(): string {
        return `
        <input
        class="input-field{{#if className}} {{className}}{{/if}}" value="{{value}}" name="{{name}}">
        `
    }
}

export default InputField;
