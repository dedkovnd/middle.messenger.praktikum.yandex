import Block from "../../tools/Block";

export default class Link extends Block {
    constructor({...props}) {
        super({
          ...props,
        })
      }
    
      render(){
        return(`
        <a href="{{ url }}" class="link{{#if className}} {{className}}{{/if}}" page='{{ page }}'>{{ text }}</a>
        `)
      }
}
