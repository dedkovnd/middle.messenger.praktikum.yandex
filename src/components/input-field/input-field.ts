import Block from "../../tools/Block";

class InputField extends Block {
    constructor({...props}) {
        super(props)
    }

    render(): string {
        return `
        <input
        type="{{type}}"
        class="input-field{{#if message}}-message{{/if}}{{#if image}}-image{{/if}}{{#if imagelow}}-image-low{{/if}}" 
        value="{{value}}" 
        name="{{name}}"
        placeholder="{{placeholder}}"
        id="{{id}}"
        >
        `
    }
}

export default InputField;
