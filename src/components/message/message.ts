import Block from "../../tools/Block";
import { connect } from "../../utils/connect";

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
//@ts-ignore
export default connect(({messages}) => ({messages}))(Message);
