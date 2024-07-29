import Block from "../../tools/Block";
import { Button, Input, Navigate, PageTitle } from "../../components";
import { validateLogin, validatePassword } from "../../tools/Validators";
import { connect } from "../../utils/connect";
import { login } from "../../services/auth";

type ValidationFunction = (value: any) => string;

interface Inputs {
    [key: string]: ValidationFunction;
}

interface ConnectedProps {
  isLoading: boolean; 
  loginError?: string;
}

class LoginPage extends Block {
      init() {
        const onLoginBind = this.onClick.bind(this);
        const onAuthBind = this.onValid.bind(this)
        const onPassBind = this.onValid.bind(this)
        const onAuthInputBind = this.onInput.bind(this)
        const onPassInputBind = this.onInput.bind(this)
        const onRegBind = this.onClear.bind(this)
        const NavigateNav = new Navigate({});
        const ButtonLogin = new Button({text: 'Авторизироваться', onClick: onLoginBind});
        const ButtonReg = new Button({text: 'Нет аккаунта?', className: 'button__white', page: 'registration', onClick: onRegBind});
        const AuthTitle = new PageTitle({title: 'Вход'})
        const InputAuth = new Input({title: "Логин", name: "login", type: 'text', value: '',
        onBlur: (event: Event)=>onAuthBind(event, validateLogin, 'InputAuth'), 
        onChange: (e: Event)=>onAuthInputBind(e, 'InputAuth')})
        const InputPass = new Input({title: "Пароль", name: "password", type: "password", value: '',
        onBlur: (event: Event)=>onPassBind(event, validatePassword, 'InputPass'), 
        onChange: (e: Event)=>onPassInputBind(e, 'InputPass')})
        
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
       window.router.go('/sign-up')
    }

    onValid(e: Event | undefined, validator: Function, input: string) {
        const value = (e?.target as HTMLInputElement).value
        if (validator(value) !== '') {
            this.children[input].setProps({error: true, errorText: validator(value), value: value})
        } else {
            this.children[input].setProps({error: false, errorText: null, value: value})
        }
    }

    onInput(e: Event, input: string) {
      e.preventDefault()
      this.children[input].setProps({value: (e?.target as HTMLInputElement).value})
    }
    
    onClick(e: Event){
        e.preventDefault();
        e.stopImmediatePropagation();
    
        const inputs: Inputs = {
          InputAuth: validateLogin,
          InputPass: validatePassword
        }
    
        for (let key in inputs) {
          if (inputs[key](this.children[key].props.value) !== '') {
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
            //@ts-ignore
            login(object)
        }
    }

    render() {
        return (`
        <main>
        {{{NavigateNav}}}
        <div class="dialog">
        <form class="login-page" id="auth">
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
        </div>
        </main>
        `)
    }
}

const mapStateToPropsShort = ({isLoading, loginError}: ConnectedProps) => ({isLoading, loginError})

export default connect(mapStateToPropsShort)(LoginPage)
