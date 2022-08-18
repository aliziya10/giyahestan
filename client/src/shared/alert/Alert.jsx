import './alert.scss';
import React, {useEffect, useRef, useState} from 'react';

let alarmAlert = null;

const Alert = ({type, message, removeAlert}) => {


    const [hidingAlert, setHidingAlert] = useState(true);
    const boxRef = useRef(false)


    useEffect(() =>{
        alarmAlert = setTimeout(removeAlert, 5000)
    }, [])

    const extensionShow = props => {
        setHidingAlert(false)
        clearTimeout(alarmAlert)
    }

    const hidAlert = props => {
        setHidingAlert(true)
        alarmAlert = setTimeout(removeAlert, 5000)
    }


    // ['success', 'error', 'warning', 'info'])
    return <div className={`alert alert_${type} ${hidingAlert ? 'alert_hid' : ''}`} ref={boxRef}
                onMouseOver={extensionShow} onMouseOut={hidAlert}>
        <span>{message}</span>
        <hr/>
    </div>;
}
export default Alert;