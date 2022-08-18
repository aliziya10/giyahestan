import React from 'react';
import Header from '../../modules/Member/components/header/Header';
import Footer from "../../modules/Member/components/footer/Footer";

const MemberLayout = (props) => {


    return (
        <>
            {props.header && <Header/>}
            <main>
                {props.children}
            </main>
            {props.footer && <Footer/>}
        </>
    )
}
export default MemberLayout;