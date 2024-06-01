import Block from "../../tools/Block";

class Navigate extends Block {
    constructor({...props}) {
        super({
            ...props
        })
    }

    render(): string {
        return `
        <nav class="navigation">
            <ul class="navigation__list">
                <li class="list-item"><a class="nav-link" href="#" page="registration">Регистрация</a></li>
                <li class="list-item"><a class="nav-link" href="#" page="chat">Чат</a></li>
                <li class="list-item"><a class="nav-link" href="#" page="profile">Профиль</a></li>
                <li class="list-item"><a class="nav-link" href="#" page="error">404</a></li>
                <li class="list-item"><a class="nav-link" href="#" page="error500">500</a></li>
            </ul>
        </nav>
        `
    }
}

export default Navigate;
