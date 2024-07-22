import { PageTitle, Button, Input } from "../../components";
import { validateMail, validateLogin, validatePhone, validateName, validatePassword } from "../../tools/Validators";
import Block from "../../tools/Block";
import { create } from "../../services/auth";
import { connect } from "../../utils/connect";

class RegistrationPage extends Block {
    init() {
        const onMailBind = this.onValid.bind(this)
        const onPhoneBind = this.onValid.bind(this)
        const onLoginBind = this.onValid.bind(this)
        const onFirstNameBind = this.onValid.bind(this)
        const onSecondNameBind = this.onValid.bind(this)
        const onPassBind = this.onValid.bind(this)
        const onPassConfBind = this.onValid.bind(this)
        const onButtonReg = this.onClick.bind(this)
        const RegTitle = new PageTitle({title: 'Регистрация'})
        const ButtonReg = new Button({text: 'Зарегистрироваться', type: 'submit', onClick: onButtonReg});
        const ButtonEnter = new Button({text: 'Войти', className: 'button__white', page: 'login'});
        const InputMail = new Input({title: 'Почта', name: 'email', type: 'mail', error: false, value: '',
          onBlur: ()=>onMailBind(event, validateMail, 'InputMail')})
        const InputLogin = new Input({title: 'Логин', name: 'login', error: false, value: '',
          onBlur: ()=>onLoginBind(event, validateLogin, 'InputLogin')
        })
        const InputFirstName = new Input({title: 'Имя', name: 'first_name', error: false, value: '',
          onBlur: ()=>onFirstNameBind(event, validateName, 'InputFirstName')
        })
        const InputSecondName = new Input({title: 'Фамилия', name: 'second_name', error: false, value: '',
          onBlur: ()=>onSecondNameBind(event, validateName, 'InputSecondName')
        })
        const InputPhone = new Input({title: 'Телефон', name: 'phone', type: 'phone', value: '',
          onBlur: ()=>onPhoneBind(event, validatePhone, 'InputPhone')})
        const InputPass = new Input({title: 'Пароль', name: 'password', type: 'password', error: false, value: '',
          onBlur: ()=>onPassBind(event, validatePassword, 'InputPass')
        })
        const InputPassConfirm = new Input({title: 'Пароль(ещё раз)', name: "password_confrim", type: "password", error: false, value: '',
          onBlur: ()=>onPassConfBind(event, validatePassword, 'InputPassConfirm')
        })

        this.children = {
            ...this.children,
            RegTitle,
            ButtonReg,
            ButtonEnter,
            InputMail,
            InputLogin,
            InputFirstName,
            InputSecondName,
            InputPhone,
            InputPass,
            InputPassConfirm
        }
  
  }

  onValid(e: Event | undefined, validator: Function, input: string) {
    const value = (e?.target as HTMLInputElement).value
    if (validator(value) !== '') {
        this.children[input].setProps({error: true, errorText: validator(value), value: value})
    } else {
        this.children[input].setProps({error: false, errorText: null, value: value})
    }
  }

  onClick(e: MouseEvent){
    e.preventDefault();
    e.stopImmediatePropagation();

    const inputs = {
      InputMail: validateMail,
      InputLogin: validateLogin,
      InputFirstName: validateName,
      InputSecondName: validateName,
      InputPhone: validatePhone,
      InputPass: validatePassword,
      InputPassConfirm: validatePassword
    }
    

    function swapProperties(obj: Record<string, unknown>) {
      const { email, login, first_name, second_name, phone, password, ...rest } = obj;
      
      return {
          first_name,
          second_name,
          login,
          email,
          password,
          phone,
          ...rest
      }
    }

    for (let key in inputs) {
      //@ts-ignore
      if (inputs[key](this.children[key].props.value) !== '') {
        //@ts-ignore
        this.children[key].setProps({error: true, errorText: inputs[key](this.children[key].props.value)})
      }
    }

    const keys = Object.keys(this.children)
    const data = []
    for (let i = 0; i < keys.length; i++) {
        if ('error' in this.children[keys[i]].props){
            data.push(this.children[keys[i]].props)
        }
    }

    if (data.filter(e=> e.error === true).length === 0) {
      const object = data
      .filter(e => e.name !== 'password_confrim')
      .reduce((obj, item: any) => Object.assign(obj, { [item.name]: item.value }), {})
      console.log(swapProperties(object))
      window.store.set({RegistrationField: swapProperties(object)})
      //@ts-ignore
      create(this.props.RegistrationField)
    }
}

    render(): string {
        return (`
        <main>
          {{#> Dialog}}
          <form class="registration-page">
            <div class="registration-page__content">
              {{{RegTitle}}}
              {{{ InputMail }}}
              {{{ InputLogin }}}
              {{{ InputFirstName }}}
              {{{ InputSecondName }}}
              {{{ InputPhone }}}
              {{{ InputPass }}}
              {{{ InputPassConfirm }}}
            </div>
            <div class="registration-page__footer">
              {{{ ButtonReg }}}
              {{{ ButtonEnter }}}
            </div>
          </form>
          {{/ Dialog}}
        </main>
        `)
    }
}
//@ts-ignore
const mapStateToPropsShort = ({RegistrationField, isLoading, loginError}) => ({RegistrationField, isLoading, loginError})

export default connect(mapStateToPropsShort)(RegistrationPage)
