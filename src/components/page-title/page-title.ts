import Block from "../../tools/Block";

class PageTitle extends Block {
    constructor({...props}) {
        super({
            ...props
        })
    }

    render(): string {
        return `
        <h1 class="page-title{{#if className}} {{ className }}{{/if}}">
            {{ title }}
        </h1>
        `
    }
}

export default PageTitle;
