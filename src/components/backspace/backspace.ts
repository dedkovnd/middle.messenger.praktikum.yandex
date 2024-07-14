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
          <a href='/messenger'><div class="backspace__triangle" page='chat'></div></a>
        </div>
        `)
    }  
}
