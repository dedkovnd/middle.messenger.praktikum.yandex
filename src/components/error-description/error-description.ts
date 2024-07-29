import Block from "../../tools/Block";

export default class ErrorDescritption extends Block {
    constructor({...props}) {
        super({
          ...props,
        })
      }
    render(){
        return(`<div class="error-description">{{ text }}</div>`)
    }
}
