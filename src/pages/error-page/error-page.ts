import Block from "../../tools/Block";
import { PageTitle, ErrorDescription, Link } from "../../components";

export default class ErrorPage extends Block {
    init () {
        const ErrorTitle = new PageTitle({title: '404', className: 'page-title__error'})
        const Description = new ErrorDescription({text: 'Не туда попали'})
        const Link404 = new Link({text: 'Назад к чатам'})
        
        this.children = {
            ...this.children,
            ErrorTitle,
            Description,
            Link404
        }
    }

    render() {
        return (`
        <main>
          <div>
            {{{ ErrorTitle }}}
            {{{ Description }}}
            {{{ Link404 }}}
          </div>
        </main>
        `)
    }
}
