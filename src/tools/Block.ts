import EventBus from "./EventBus";
import Handlebars from "handlebars";

type Children = Record<string, Block>

type Props = {
  events?: { [eventName: string]: (e: Event) => void }
  [prop: string]: unknown
}

type Lists = Record<string, Block[]>

type PropsAndChildren = {
  children?: Children
  props?: Props
  lists?: Lists
  [prop: string]: unknown
}

export default class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    } as const;
  
  _element = null;
  _meta = null;
  _id = Math.floor(100000 + Math.random() * 900000);
  children: Children
  props: Props
  lists: Lists
  eventBus: ()=> EventBus<string>
  
  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

  private _eventbus;

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();
    // this._meta = {
    //   tagName,
    //   props
    // };
    const {props, children, lists} = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists
  
    this.eventBus = () => eventBus;
  
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
  })
 }
  
  _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
  
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }
  
  _init() {
    // this._createResources();
    this.init();
  
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {

  }
  
  _componentDidMount() {
    this.componentDidMount();
    console.log('CDM')

    Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
    });
  }
  
  componentDidMount(oldProps: Props) {}
  
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  
  _componentDidUpdate(oldProps: Props, newProps: Props) {
    console.log('CDU')
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }
  
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  _getChildrenAndProps(propsAndChildren: PropsAndChildren) {
    const children = {};
    const props = {};
    const lists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
    if (value instanceof Block) {
            children[key] = value;
    } else if (Array.isArray(value)){
      lists[key] = value;
    } else {
            props[key] = value;
        }
    });

    return { children, props, lists };
  }
 
  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
  
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }
  
  _render() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild;

    Object.values(this.children).forEach(child => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        
        stub?.replaceWith(child.getContent());
    });

    if (this._element) {
        this._element.replaceWith(newElement);
      }
  
      this._element = newElement;

    this._addEvents();
  }
  
  render() {}
  
  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
  
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}
        target[prop] = value;
  
        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
  
  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }
  
  }
