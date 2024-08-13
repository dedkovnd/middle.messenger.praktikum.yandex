import Block from "../../tools/Block";

export default class UserData extends Block {
    constructor({...props}) {
        super({
            ...props
        })
    }
    
    render(){
        return(`
        <div class="user-data">
          <div>{{name}}</div>
          <div class="user-data__info">{{value}}</div>
        </div>
        `)
    }
}
