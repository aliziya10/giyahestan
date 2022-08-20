import React from 'react';

const Image = props => {
    return <img className={props.className} src={props.src} alt={props.alt}
                key={props.key} width={props.width} height={props.height} onClick={props.onClick}/>
}
export default Image;