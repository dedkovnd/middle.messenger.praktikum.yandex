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
        <div class="list-item"><a class="nav-link" href="/sign-up.html" page="registration">Регистрация</a></div>
        <div class="list-item"><a class="nav-link" href="/messenger.html" page="chat">Чат</a></div>
        <div class="list-item"><a class="nav-link" href="/settings" page="profile">Профиль</a></div>
        <div class="list-item"><a class="nav-link" href="/settings-edit" page="profileedit">Редактировать профиль</a></div>
        <div class="list-item"><a class="nav-link" href="/error" page="error">Страница ошибки</a></div>
        </div>
        `;
  }
}
