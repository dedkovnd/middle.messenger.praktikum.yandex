import EventBus from "./EventBus";

export enum StoreEvents {
    Updated = 'Updated'
  }
  
  export class Store<State extends Record<string, any>> extends EventBus<string> {
    private state: State = {} as State;
    static __instance: any;
  
    constructor(defaultState: State) {
      if (Store.__instance) {
        return Store.__instance;
      }
      super();
  
      this.state = defaultState;
      this.set(defaultState);
  
      Store.__instance = this;
    }
  
    public getState() {
      return this.state;
    }
  
    public set(nextState: Partial<State>) {
      const prevState = { ...this.state };
  
      this.state = { ...this.state, ...nextState };
  
      this.emit(StoreEvents.Updated, prevState, nextState);
    }
  }
