import './loading.scss';
import React, {useEffect} from 'react';
import ScrollBar from '../../core/services/Scrollable';

const Loading = type => {

    useEffect(() => {
        ScrollBar(true)

        return function cleanup() {
            ScrollBar(false)
        }
    }, [])


    const initLoading = () => {
        return <>
            <div className="wrapper">
                <div className="circle"/>
                <div className="circle"/>
                <div className="circle"/>
                <div className="shadow"/>
                <div className="shadow"/>
                <div className="shadow"/>
            </div>
        </>
    }

    return (
        <div className={'loading'} style={{top: window.scrollY}}>
            <div className={'loading__container'}>
                {initLoading()}
            </div>
        </div>
    )
};
export default Loading;