import Block from "../../tools/Block";
import { PageTitle, Backspace, UserData, UserOption } from "../../components";

export default class ProfilePage extends Block {
    init() {
        const ProfileTitle = new PageTitle({title: 'Иван'})
        const BackToChat = new Backspace({})
        const UserMail = new UserData({name: 'Почта', value: 'yandex@pochta.ru'})
        const UserLogin = new UserData({name: 'Логин', value: 'ivanivanov'})
        const UserName = new UserData({name: 'Имя', value: 'Иван'})
        const UserSecondName = new UserData({name: 'Фамилия', value: 'Иванов'})
        const UserChatName = new UserData({name: 'Имя в чате', value: 'Иван'})
        const UserPhone = new UserData({name: 'Телефон', value: '+7 999 212 85 06'})
        const DataOption = new UserOption({text: 'Изменить данные', page: 'profileedit'})
        const PasswordOption = new UserOption({text: 'Изменить пароль'})
        const ExitOption = new UserOption({text: 'Выйти', className: 'user-option__red'})

        this.children = {
            ...this.children,
            ProfileTitle,
            BackToChat,
            UserMail,
            UserLogin,
            DataOption,
            PasswordOption,
            ExitOption,
            UserName,
            UserSecondName,
            UserChatName,
            UserPhone
        }
    
    }

    render() {
        return(`
        <main class="main">
        {{{ BackToChat }}}
          <div class="profile-page">
            <div class="user-image"></div>
              {{{ ProfileTitle }}}
            <div class="info-wrap">
              {{{ UserMail }}}
              {{{ UserLogin }}}
              {{{ UserName }}}
              {{{ UserSecondName }}}
              {{{ UserChatName }}}
              {{{ UserPhone }}}
            </div>
            <div class="options-wrap">
              {{{ DataOption }}}
              {{{ PasswordOption }}}
              {{{ ExitOption }}}
            </div>
           </div>
        </main>
        `)
    }
}
