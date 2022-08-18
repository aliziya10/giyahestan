import './field.scss';
import React, {useState, useRef} from 'react';
import {statusField} from '../../core/constants/StatusFields';
import {default as _} from "../../core/services/Translate";

const Field = ({
                   key,
                   type,
                   label,
                   icon,
                   description,
                   status,
                   value,
                   change,
                   style,
               }) => {

    const [visible, setVisible] = useState('false')

    const keyDown = e => {
        if (!e.target.value)
            change(e)
        else
            switch (type) {
                case 'phone':
                    if (Number(e.target.value))
                        change(e)
                    break;
                case 'password':
                    if (e.target.value.split('').find(char => 1575 <= char.charCodeAt(0) && char.charCodeAt(0) <= 1740))
                        alert(_.init('lbl_field__password__farsi'))
                    else
                        change(e)
                    break;

                default:
                    change(e)
            }
    }

    const codeToIcon = code => {
        switch (code) {
            case statusField.empty:
                return icon;
            case statusField.loading:
                return 'icon-spinner2';
            case statusField.success:
                return 'fa-solid fa-check';
            case statusField.error:
                return 'fa-solid fa-xmark';
            default:
                return null;
        }
    }


    const initHelps = () => {
        switch (type) {
            case 'phone':
                return <span>+98</span>;

            case 'password':
                return <i className={`fa-regular fa-eye${visible ? '' : '-slash'}`}
                          onClick={() => setVisible(!visible)}/>;
        }
        return <span>{' '}</span>;
    }

    const initFieldBox = () => {
        switch (type) {
            case 'phone':
                return <input key={key} dir={'ltr'} onChange={keyDown} className={'field__self'}
                              value={value} tabIndex={0} autoComplete={true}/>;

            case 'password':
                return <input type={visible ? 'password' : 'text'} className={'field__self'}
                              key={key} onChange={keyDown} value={value} tabIndex={0}/>;

            case 'text':
                return <input type={'text'} key={key} dir={'auto'} onChange={keyDown} className={'field__self'}
                              value={value} tabIndex={0} autoComplete={true}/>;
        }
        return null;
    }

    const initField = () => {
        switch (type) {
            case 'phone':
            case 'password':
            case 'text':
                return (
                    <div className={'field_type_input'}>
                        {initHelps()}

                        <div className={'filed__box'}>
                            <span className={'field__label'}>{label}</span>

                            {initFieldBox()}

                            <hr className={'field__underline'}/>

                            <p className={`field__description field__description_status_${status.code}`}>
                                {status.code === statusField.empty && description}
                                {status.code === statusField.error && status.data?.error?.description}
                            </p>
                        </div>

                        <i className={codeToIcon(status.code)}/>
                    </div>
                )
        }
        return null;
    }

    return <div className={'field'} style={style}>{initField()}</div>;
}

export default Field;