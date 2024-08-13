import Block from "../../tools/Block";

export default class ChatMenu extends Block {
    constructor({...props}){
        super({...props,
            events: {
                click: props.onClick
            }
        })
    }
    render(){return`
        <div class="menu">
         <hr class="menu-line"></hr>
         <hr class="menu-line"></hr>
         <hr class="menu-line"></hr>
        </div>
        `
    }
}
