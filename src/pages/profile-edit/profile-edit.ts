import Block from "../../tools/Block";
import { Button, Backspace, Input, UserImage } from "../../components";
import { validateMail, validateLogin, validateName, validatePhone } from "../../tools/Validators";
import { me } from "../../services/auth";
import { updateUser, putPhoto } from "../../services/user";
import { connect } from "../../utils/connect";

class ProfileEdit extends Block {
    componentDidMount() {
      me()
    }
    init(){
        const onLoadBind = this.onLoad.bind(this)
        const onButtonBind = this.onClick.bind(this)
        const onMailBind = this.onValid.bind(this)
        const onLoginBind = this.onValid.bind(this)
        const onNameBind = this.onValid.bind(this)
        const onSecondNameBind = this.onValid.bind(this)
        const onChatNameBind = this.onValid.bind(this)
        const onPhoneBind = this.onValid.bind(this)
        const MyImage = new UserImage({tooltip: true, onChange: onLoadBind, url: ''})
        const InputMail = new Input({title: 'Почта', className: '-user', user: true, errorUser: false,
            onBlur: ()=>onMailBind(event, validateMail, 'InputMail'), value: 'ya19881988@yandex.ru', name: 'email'
        })
        const InputLogin = new Input({title: 'Логин', className: '-user', user: true, errorUser: false,
            onBlur: ()=>onLoginBind(event, validateLogin, 'InputLogin'), value: 'ivanivanov', name: 'login'
        })
        const InputName = new Input({title: 'Имя', className: '-user', user: true, errorUser: false,
            onBlur: ()=>onNameBind(event, validateName, 'InputName'), value: 'Иван', name: 'first_name'
        })
        const InputSecondName = new Input({title: 'Фамилия', className: '-user', user: true, errorUser: false,
            onBlur: ()=>onSecondNameBind(event, validateName, 'InputSecondName'), value: 'Иванов', name: 'second_name'
        })
        const InputChatName = new Input({title: 'Имя в чате', className: '-user', user: true, errorUser: false,
            onBlur: ()=>onChatNameBind(event, validateName, 'InputChatName'), value: 'Name', name: 'display_name'
        })
        const InputPhone = new Input({title: 'Телефон', className: '-user', user: true, errorUser: false,
            onBlur: ()=> onPhoneBind(event, validatePhone, 'InputPhone'), value: '+7-999-212-85-06', name: 'phone'
        })
        const ButtonSave = new Button({text: 'Сохранить', className: 'user-button', onClick: onButtonBind})
        const BackToProfile = new Backspace({})

      this.children = {
        ...this.children,
        MyImage,
        InputMail,
        InputLogin,
        InputName,
        InputSecondName,
        InputChatName,
        InputPhone,
        ButtonSave,
        BackToProfile
      }  

    }
    //@ts-ignore
    componentDidUpdate() {
      this.children.MyImage.setProps({url: window.store.state.me.avatar})
      this.children.InputMail.setProps({value: window.store.state.me.email})
      this.children.InputLogin.setProps({value: window.store.state.me.login})
      this.children.InputName.setProps({value: window.store.state.me.first_name})
      this.children.InputSecondName.setProps({value: window.store.state.me.second_name})
      this.children.InputChatName.setProps({value: window.store.state.me.display_name})
      this.children.InputPhone.setProps({value: window.store.state.me.phone})
    }

    onLoad(e: Event) {
      const formData = new FormData()
      formData.append('avatar', (e?.target as HTMLInputElement).files![0])
      putPhoto(formData)
    }

    onValid(e: Event | undefined, validator: Function, input: string) {
        const value = (e?.target as HTMLInputElement).value
        if (validator(value) !== '') {
            this.children[input].setProps({errorUser: true, errorText: validator(value), value: value})
        } else {
            this.children[input].setProps({errorUser: false, errorText: null, value: value})
        }
      }

    onClick(e: MouseEvent){
        e.preventDefault();
        e.stopImmediatePropagation();

        const inputs = {
            InputMail: validateMail,
            InputLogin: validateLogin,
            InputName: validateName,
            InputSecondName: validateName,
            InputChatName: validateName,
            InputPhone: validatePhone
          }

          function swapProperties(obj: Record<string, unknown>) {
            const { email, login, first_name, second_name, display_name, phone, ...rest } = obj;
            
            return {
                first_name,
                second_name,
                display_name,
                login,
                email,
                phone,
                ...rest
            }
          }
        
        for (let key in inputs) {
            //@ts-ignore
            if (inputs[key](this.children[key].props.value) !== '') {
              //@ts-ignore
              this.children[key].setProps({errorUser: true, errorText: inputs[key](this.children[key].props.value)})
            }
          }
      
          const keys = Object.keys(this.children)
          const data = []
          for (let i = 0; i < keys.length; i++) {
              if ('errorUser' in this.children[keys[i]].props){
                  data.push(this.children[keys[i]].props)
              }
          }
      
          if (data.filter(e=> e.errorUser === true).length === 0) {
            const object = data.reduce(
              (obj, item: any) => Object.assign(obj, { [item.name]: item.value }), {})
              updateUser(swapProperties(object))
          }
    }
    
    render() {
        return(`
        <main class="main">
          {{{ BackToProfile }}}
          <div class="profile-page">
          {{{MyImage}}}
            <form class="info-form">
            {{{ InputMail }}}
            {{{ InputLogin }}}
            {{{ InputName }}}
            {{{ InputSecondName }}}
            {{{ InputChatName }}}
            {{{ InputPhone }}}
            <div class="button-wrapper">
            {{{ ButtonSave }}}
            </div>
            </form>
        </div>
        </main>
        `)
    }
}

//@ts-ignore
export default connect(({me}) => ({me}))(ProfileEdit);
