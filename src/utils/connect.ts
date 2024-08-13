import { StoreEvents } from "../tools/Store";
import isEqual from "./isEqual";
import Block from "../tools/Block";

type Props = {
  events?: { [eventName: string]: (e: Event) => void }
  [prop: string]: unknown
}

interface State {
  [key: string]: unknown;
}

type MapStateToProps = (string: any) => Partial<State>;

type DispatchHandler = (...args: unknown[]) => void;

export function connect(mapStateToProps: MapStateToProps, dispatch?: ()=> DispatchHandler) {
    return function(Component: typeof Block) {
      return class extends Component{
        private onChangeStoreCallback: () => void;
        constructor(props: Props) {
          const store = window.store;
          let state = mapStateToProps(store.getState());
  
          super({...props, ...state});

          const dispatchHundler = {};
          Object.entries(dispatch || {}).forEach(([key, hundler]) => {
            //@ts-ignore
            dispatchHundler[key] = (...args) => hundler(window.store.set.bind(window.store), ...args)
          })

          this.setProps({...dispatchHundler});

          this.onChangeStoreCallback = () => {

            const newState = mapStateToProps(store.getState());

            if (!isEqual(state, newState)) {
              this.setProps({...newState});
            }

            state = newState;
          }
  
          store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        }


      componentWillUnmount() {
        //@ts-ignore
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    }
  }
}
