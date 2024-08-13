import EventBus from "./EventBus";

export enum StoreEvents {
    Updated = 'Updated'
  }

interface IState {
  [key: string]: unknown;
}
  
  export class Store<State extends Record<string, unknown>> extends EventBus<string> {
    private state: State = {} as State;
    static __instance: Store<IState>;
  
    constructor(defaultState: State) {
      if (Store.__instance) {
        return Store.__instance as Store<State>;
      }
      super();
  
      this.state = defaultState;
      this.set(defaultState);
  
      Store.__instance = this;
    }
  
    public getState(): State {
      return this.state;
    }
  
    public set(nextState: Partial<State>) {
      const prevState = { ...this.state };
  
      this.state = { ...this.state, ...nextState };
  
      this.emit(StoreEvents.Updated, prevState, nextState);
    }
  }
