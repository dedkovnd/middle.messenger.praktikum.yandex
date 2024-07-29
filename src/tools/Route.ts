import Block from "./Block";

interface IProps {
    events?: object,
    rootQuery?: any
}

export default class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block: Block | null;
    private _props: IProps;

    constructor(pathname: string, view: typeof Block, props: object) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    _renderDom(query: string, block: typeof Block) {
        const root = document.querySelector(query);
        //@ts-ignore
        root!.append(block.getContent());
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            //@ts-ignore
            this._renderDom(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}
