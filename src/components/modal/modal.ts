import Block from "../../tools/Block";
import { InputField } from "../input-field";
import { Button } from "../button";

export default class Modal extends Block {
    constructor({...props}){
        super({...props,
            hidden: props.hidden,
            isInput: props.isInput,
            InputFocus:  new InputField({
                value: props.value,
                name: props.name,
                events: {
                    change: props.onChange
                }
            }),
            ButtonOk: new Button({
                text: props.textOk,
                onClick: props.onClickOk
            }),
            ButtonNo: new Button({
                text: props.textNo,
                className: props.className,
                onClick: props.onClickNo
            })
        })
    }
    render(){return`
        <div class="background-modal{{#if hidden}}__hidden{{/if}}">
        <div class="modal{{#if hidden}}__hidden{{/if}}">
          <h3>{{title}}</h3>
          <div>
          {{#if isInput}}
          {{{InputFocus}}}
          {{/if}}
          </div>
          <div class="button-modal-wrap">
          {{{ButtonOk}}}
          {{{ButtonNo}}}
          </div>
        </div>
        </div>
        `}
}
