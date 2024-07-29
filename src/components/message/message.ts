import Block from "../../tools/Block";
import { connect } from "../../utils/connect";
import { IMessage } from "../../types";

interface ConnectedProps {
  messages: IMessage[]
}

class Message extends Block {
    constructor({...props}) {
        super({
          ...props
        })
      }
    
      render() {
        return(`
        <div class="message{{#if me}}__me{{/if}}">
          <p>{{{message}}}</p>
        </div>
          `)
      }
}

export default connect(({messages}: ConnectedProps) => ({messages}))(Message);
