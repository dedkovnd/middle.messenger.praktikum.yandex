import Block from "../../tools/Block";

class InputTooltip extends Block {
    constructor({...props}) {
        super({
          ...props,
        })
      }
    render(): string {
        return (`
            <div class="text-error{{#if error}}-active{{/if}}{{#if errorUser}}-active__user{{/if}}">{{errorText}}</div>
        `)
    }
}

export default InputTooltip;
