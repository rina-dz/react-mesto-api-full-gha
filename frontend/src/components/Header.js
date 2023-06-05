import React from 'react';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

  const location = useLocation();

  const title = `${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const link = `${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип место Россия" />
      {props.loggedIn
        ? (<>
          <h2 className="header__link">{props.email}</h2>
          <Link onClick={props.signOut} className="header__exit-link" to="/sign-in">Выйти</Link>
        </>)
        : (<Link className="header__link" to={link}>{title}</Link>)
      }
    </header>
  )
}


export default Header;