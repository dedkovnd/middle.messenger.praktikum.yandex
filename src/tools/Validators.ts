export const validateLogin = (value: string) => {
    if (value.length === 0) return `Введите логин`;
    if (value.length < 3) {
        return 'Логин должен содержать минимум три символа'
    }
    if (value.length > 20) {
        return 'Логин не можеть быть длинее 20 символов'
    }
    if (!value.match(/(?=.*[a-z]+|[а-я])/)) {
        return 'Логин содержать буквы'
    }
    if (!value.match(/^[a-z0-9_-]{3,}$/)) {
        return 'Логин должен состоять из одного слова'
    }
    return '';
}

export const validatePassword = (value: string) => {
    if (value.length === 0) return `Пароль не может быть пустым`;
    if (value.length < 8) {
        return 'Минимальная длинна пароля составляет 8 символов'
    }
    if (value.length > 40) {
        return 'Максимальная длинна пароля составляет 40 символов'
    }
    if (!value.match(/(?=.*[A-Z])/)) {
        return 'Пароль должен содержать минимум одну заглавную букву'
    }
    if (!value.match(/(?=.*[0-9])/)) {
        return 'Пароль должен содержать минимум одну цифру'
    }
    return '';
}


export const validateName = (value: string) => {
    if (value.length === 0) return `Поле не может быть пустым`;
    
    if (!value.match(/^[А-ЯA-Z]+/)) {
        return 'Имя или фамилия должны начинаться с заглавной буквый'
    }

    if (!value.match(/[a-zA-Zа-яА-Я-]$/)) {
        return 'Поле может содержать только буквы или дефис'
    }
    return '';
}

export const validateMail = (value: string) => {
    if (value.length === 0) return `Адрес почты не может быть пустым`;

    if (!value.match(/^\S+@\S+\.\S+$/)) {
        return 'Некорректный адрес'
    }
    return '';
}


export const validatePhone = (value: string) => {
    if (value.length === 0) return `Номер телефона не может быть пустым`;
    //10-15 символов
    if (!value.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)) {
        return 'Некорректный формат номера'
    }
    return '';
}
