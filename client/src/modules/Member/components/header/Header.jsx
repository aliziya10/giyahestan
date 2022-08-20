import './header.scss';
import React from 'react';
import logo from '../../../../assets/image/logo.png';
import Image from "../../../../shared/image/Image";
import {Link} from "react-router-dom";

const Header = () => {
    return <div className={'header'}>
        <i className="fa-solid fa-bars header__menu-button"/>
        <Image src={logo} alt={logo} height="50" width="50" className={'header__logo'}/>
        <input type="search" className={'header__search'} placeholder={'جست و جو'}/>
        <Link to={'/register'}><div className={'header__login'}>{'ثبت نام / ورود'}</div></Link>
    </div>;
}
export default Header;