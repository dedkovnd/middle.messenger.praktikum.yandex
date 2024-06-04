import Block from "../../tools/Block";

export default class Navigate extends Block {
  constructor({ ...props }) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class="navigation">
        <div class="list-item"><a class="nav-link" href="#" page="registration">Регистрация</a></div>
        <div class="list-item"><a class="nav-link" href="#" page="chat">Чат</a></div>
        <div class="list-item"><a class="nav-link" href="#" page="profile">Профиль</a></div>
        <div class="list-item"><a class="nav-link" href="#" page="profileedit">Редактировать профиль</a></div>
        <div class="list-item"><a class="nav-link" href="#" page="error">Страница ошибки</a></div>
        </div>
        `;
  }
}
