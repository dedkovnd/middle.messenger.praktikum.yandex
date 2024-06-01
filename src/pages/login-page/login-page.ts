import Block from "../../tools/Block";
import { Button, Input, Navigate, PageTitle } from "../../components";
import { validateLogin, validatePassword } from "../../tools/Validators";

export default class LoginPage extends Block {
    init() {
        const onLoginBind = this.onClick.bind(this);
        const onAuthBind = this.onValid.bind(this)
        const onPassBind = this.onValid.bind(this)
        const onRegBind = this.onClear.bind(this)
        const NavigateNav = new Navigate({});
        const ButtonLogin = new Button({text: 'Авторизироваться', onClick: onLoginBind});
        const ButtonReg = new Button({text: 'Нет аккаунта?', className: 'button__white', page: 'registration', onClick: onRegBind});
        const AuthTitle = new PageTitle({title: 'Вход'})
        const InputAuth = new Input({title: "Логин", name: "login", type: 'text', value: '',
        onBlur: ()=>onAuthBind(event, validateLogin, 'InputAuth')  })
        const InputPass = new Input({title: "Пароль", name: "password", type: "password", value: '',
        onBlur: ()=>onPassBind(event, validatePassword, 'InputPass')})
        
        this.children = {
            ...this.children,
            NavigateNav,
            AuthTitle,
            InputAuth,
            InputPass,
            ButtonLogin,
            ButtonReg
        }
    }

    onClear(e: Event) {
       e.preventDefault()
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
          InputAuth: validateLogin,
          InputPass: validatePassword
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
          const object = data.reduce(
            (obj, item: any) => Object.assign(obj, { [item.name]: item.value }), {})
            console.log(object)
        }
    }

    render() {
        return (`
        <main>
        {{#> Dialog }}
        <form class="login-page">
            <div class="login-page__content">
              {{{ AuthTitle }}}
              {{{ InputAuth }}}
              {{{ InputPass }}}
            </div>
            <div class="login-page__footer">
              {{{ ButtonLogin }}}
              {{{ ButtonReg }}}
            </div>
        </form>    
        {{/ Dialog }}    
        </main>
        `)
    }
}
