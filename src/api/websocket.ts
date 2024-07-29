import ChatApi from "./chats";

interface TokenResponse {
  token?: string;
}
const chatsApi = new ChatApi();


export const createWebSocket = async (chatid: string, id: number, value?: string | unknown) => {
    
    const token = async (chatid: string): Promise<TokenResponse | unknown> => {
        return await chatsApi.getChatToken(chatid)
    }
    const tokenID: TokenResponse | unknown = await token(chatid)
    //@ts-ignore
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${id}/${chatid}/${tokenID.token}`);

    socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        if(window.store.state.messages.length === 0) {
          socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
            }));
        }
      if(value) {
        socket.send(JSON.stringify({
          content: value,
          type: 'message',
        }));
      }
     
        
      });

      
      socket.addEventListener('close', event => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }
      
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      }); 

      socket.addEventListener('message', event => {

        try {
          const data = JSON.parse(event.data)
          if (Array.isArray(data)) {
            window.store.set({messages: data.reverse()})
          }
          if (data.type === 'message') {
            const oldMessages = window.store.state.messages
            window.store.set({messages: oldMessages.concat(data)})
          }
          if (data.type === 'error') {
            window.store.set({messages: []})
          }
        } catch(error) {
          window.store.set({loginError: 'data socket error'})
        }
      });
      
      socket.addEventListener('error', event => {
        console.log('Ошибка', event);
      }); 
}
