import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Router from './tools/Router';
import { Store } from './tools/Store';


declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>]
}


const pages = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'registration': [Pages.RegistrationPage],
  'profile': [Pages.ProfilePage],
  'error': [Pages.ErrorPage],
  'profileedit': [Pages.ProfileEdit]
};

Object.entries(Components).forEach(([ name, component ]) => {
  //@ts-ignore
  Handlebars.registerPartial(name, component);
});

const router = new Router('#app');
//@ts-ignore
window.router = router;
// //@ts-ignore
window.store = new Store({
  isLoading: false,
  loginError: null,
  chats: [],
  me: null,
  user: null,
  users: [],
  selectedChat: null,
  messages: []
});


router.use('/', Pages.LoginPage)
.use('/messenger', Pages.ChatPage)
.use('/settings', Pages.ProfilePage)
.use('/settings-edit', Pages.ProfileEdit)
.use('/sign-up', Pages.RegistrationPage)
.use('*', Pages.ErrorPage)
.use('/error', Pages.ErrorPage)
.start();
