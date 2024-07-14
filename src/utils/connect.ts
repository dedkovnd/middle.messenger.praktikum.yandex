import { StoreEvents } from "../tools/Store";
import isEqual from "./isEqual";
import Block from "../tools/Block";

export function connect(mapStateToProps: any, dispatch?: ()=> any) {
    return function(Component: typeof Block) {
      return class extends Component{
        private onChangeStoreCallback: () => void;
        constructor(props: any) {
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
