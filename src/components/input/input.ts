import Block from "../../tools/Block";
import { InputField } from "../input-field";
import { InputTooltip } from "../input-tooltip";

type Props = {
    events?: { [eventName: string]: (e: Event) => void }
    [prop: string]: unknown
  }

class Input extends Block {
    constructor({...props}) {
        super({...props,
            InputField: new InputField({
                value: props.value,
                name: props.name,
                events: {
                    blur: props.onBlur
                }
            }),
            InputTooltip: new InputTooltip({
                error: props.errorText
            })
        })
    }
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if(oldProps === newProps) {
            return false;
        }
        this.children.InputTooltip.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="input{{#if className}} {{className}}{{/if}}">
          <label class="input__title{{#if user}}__user{{/if}}">{{ title }}</label>
          <div class="input-wrap{{#if error}}-error{{/if}}">
            {{{ InputField }}}
          </div>
          {{{ InputTooltip }}}
        </div>
        `
    }

}

export default Input;
