import React from 'react';
import './button.scss';

const Button = props => {


    const onAction = e => {
        if (props.link)
            return <redirect to={props.link}/>
        else
            props.action(e)
    }
    const onEnter = e => {
        if (e.code === 'Enter' || e.code === 'Space')
            onAction(e)
    }



    if(props.type === 'disabled') {
        return (
            <div className={'button-disabled disable'} style={{...props.style}}>
                {props.children}
            </div>
        )
    }

    return (
        <div className={`button-${props.type || 'primary'} ` + props.className} style={{...props.style}}
             tabIndex={props.tabIndex || 0} onKeyDown={onEnter} onClick={onAction}>
            {props.children}
        </div>
    )
}
export default Button;