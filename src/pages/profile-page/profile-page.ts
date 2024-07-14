import Block from "../../tools/Block";
import { PageTitle, Backspace, UserData, UserOption, UserImage } from "../../components";
import { connect } from "../../utils/connect";
import { me } from "../../services/auth";

class ProfilePage extends Block {
    componentDidMount() {
        me()
    }
    init() {
        const MyImage = new UserImage({tooltip: false, url: ''})
        const ProfileTitle = new PageTitle({title: 'Ivan'})
        const BackToChat = new Backspace({})
        const UserMail = new UserData({name: 'Почта', value: 'yandex@pochta.ru'})
        const UserLogin = new UserData({name: 'Логин', value: 'ivanivanov'})
        const UserName = new UserData({name: 'Имя', value: 'Иван'})
        const UserSecondName = new UserData({name: 'Фамилия', value: 'Иванов'})
        const UserChatName = new UserData({name: 'Имя в чате', value: 'Иван'})
        const UserPhone = new UserData({name: 'Телефон', value: '+7 999 212 85 06'})
        const DataOption = new UserOption({text: 'Изменить данные', url: '/settings-edit'})
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
            UserPhone,
            MyImage
        }
    
    }
    //@ts-ignore
    componentDidUpdate() {
      this.children.MyImage.setProps({url: window.store.state.me.avatar})
      this.children.ProfileTitle.setProps({title: window.store.state.me.first_name})
      this.children.UserMail.setProps({value: window.store.state.me.email})
      this.children.UserLogin.setProps({value: window.store.state.me.login})
      this.children.UserName.setProps({value: window.store.state.me.first_name})
      this.children.UserSecondName.setProps({value: window.store.state.me.second_name})
      this.children.UserChatName.setProps({value: window.store.state.me.display_name})
      this.children.UserPhone.setProps({value: window.store.state.me.phone})
    }

    render() {
        return(`
        <main class="main">
        {{{ BackToChat }}}
          <div class="profile-page">
            {{{MyImage}}}
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
//@ts-ignore
export default connect(({me}) => ({me}))(ProfilePage);
