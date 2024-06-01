import Block from "../../tools/Block";

export default class Backspace extends Block {
    constructor({...props}) {
        super({
          ...props,
        })
      }
    
    render(){
        return(`
        <div class="backspace">
          <div class="backspace__triangle" page='chat'></div>
        </div>
        `)
    }  
}
