import ChatApi from "./chats";

const chatsApi = new ChatApi();


export const createWebSocket = async (chatid: number, id: number, value: string | unknown) => {
    
    const token = async (chatid: any) => {
        return await chatsApi.getChatToken(chatid)
    }
    const tokenID = await token(chatid)
    //@ts-ignore
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${id}/${chatid}/${tokenID.token}`);

    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

    socket.send(JSON.stringify({
                content: value,
                type: 'message',
              }));
        
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
        console.log('Получены данные', event.data);

        const data = JSON.parse(event.data)
        const oldMessages = window.store.state.messages
        window.store.set({messages: oldMessages.concat(data)})
      });
      
      socket.addEventListener('error', event => {
        console.log('Ошибка', event);
      }); 
}
