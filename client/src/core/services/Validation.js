import Translate from './Translate';

export default class Validation {

    static validate(fields) {
        let error = null;
        const errors = [];

        for (let field of fields) {
            error = null
            for (let validation of field.validations) {
                if (!error) {
                    switch (validation) {
                        case 'required':
                            if (!field.value) {
                                error = {
                                    title: 'required',
                                    description: Translate.init('lbl_validator__required', [field.label]),
                                }
                            }
                            break;
                        case 'length':
                            if (field.value.length < 6) {
                                error = {
                                    title: 'length',
                                    description: Translate.init('lbl_validator__length', [field.label]),
                                }
                            }
                            break;
                        case 'email':
                            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!re.test(field.value)) {
                                error = {
                                    title: 'email',
                                    description: Translate.init('lbl_validator__email', [field.label]),
                                }
                            }
                            break;
                        case 'number':
                            if (!Number(field.value)) {
                                error = {
                                    title: 'number',
                                    description: Translate.init('lbl_validator__number', [field.label]),
                                }
                            }
                            break;
                        case 'phone':
                            const phone = /^\d{10}$/;
                            if (!phone.test(field.value)) {
                                error = {
                                    title: 'phone',
                                    description:  Translate.init('lbl_validator__phone', [field.label]),
                                }
                            }
                            break;
                        default:
                            console.log(validation + ' was not validations')
                            break;
                    }
                }
            }
            errors.push(error ? {code: 3, data: {error: error}} : {code: 2})
        }
        return errors;
    }
}

/*
example input: [
{label: 'username', value: 'sara', validations = ['required']},
{label: 'password', value: '1234', validations = ['required', 'length']},
]


example output: [
{code: 2},
{code: 3, data: {error: {title: 'length', description: 'password کوتاه است'}}},
]
*/