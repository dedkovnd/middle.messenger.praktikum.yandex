import Block from "../../tools/Block";
import { InputField } from "../input-field";


class UserImage extends Block {
    constructor({...props}) {
        super({
            ...props,
            InputField: new InputField({
                type: 'file',
                image: true, 
                events: {
                    change: props.onChange
                },
            })
        })
    }

    render(): string {
        return `
        <div class="user-image" src="https://ya-praktikum.tech/api/v2/resources/{{url}}" alt="user photo" {{#if tooltip}}data-title="Кликните мышкой, чтобы загрузить фото"{{/if}}>
          <img class="user-pic" src="https://ya-praktikum.tech/api/v2/resources/{{url}}" alt="user photo">
          {{#if tooltip}}
          {{{InputField}}}
          {{/if}}
        </div>
        `
    }
}

export default UserImage;
