import EventBus from "./EventBus";
import Handlebars from "handlebars";

type TEvents = Values<typeof Block.EVENTS>

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
  
  _element: HTMLElement | null = null;
  _meta: any
  _id = Math.floor(100000 + Math.random() * 900000);
  props: Props
  children: Children
  eventBus: ()=> EventBus<string>
  
  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

  // private _eventbus;

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus<TEvents>();
    // this._meta = {
    //   tagName,
    //   props
    // };
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
  
    this.eventBus = () => eventBus;
  
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
  })
 }

  _removeEvents() {
    const {events = {}} = this.props ;

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
  })
 }
  
  _registerEvents(eventBus: EventBus<TEvents>) {
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
  
  componentDidMount() {}
  
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  
  _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    console.log('CDU')
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }
  
  componentDidUpdate(oldProps?: Props, newProps?: Props) {
    oldProps = { ...oldProps, ...newProps }
    return true;
  }

  _getChildrenAndProps(propsAndChildren: PropsAndChildren) {
    const children: Children = {}
    const props: Props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
    if (value instanceof Block) {
            children[key] = value;
    } else {
            props[key] = value;
        }
    });

    return { children, props };
  }
 
  setProps = (nextProps: Partial<Props>) => {
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

    const childrenProps: Props[] = [];
    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if(Array.isArray(value)) {
        propsAndStubs[key] = value.map((item) => {
          if(item instanceof Block) {
            //@ts-ignore
            childrenProps.push(item)
            return `<div data-id="${item._id}"></div>`
          }

          return item;
        }).join('')
      }
  });
    const fragment: HTMLElement | any = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild;

    [...Object.values(this.children), ...childrenProps].forEach(child => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        //@ts-ignore
        stub?.replaceWith(child.getContent());
    });


    if (this._element) {
      newElement.style.display = this._element.style.display
      this._element.replaceWith(newElement);
    }
  
      this._element = newElement;

    this._addEvents();
  }
  
  render() {}
  
  getContent() {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this.element;
  }

  _makePropsProxy(props: Props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
  
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = {...target}
        target[prop] = value;
  
        // Запускаем обновление компоненты
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
