//import SignForm from "./SignForm.js";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Register(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.handleSubmit(formValue)
  }


  return (
    <div className="sign">
      <div className="sign__container">
        <h2 className="sign__title">Регистрация</h2>
        <form className="form sign__form" onSubmit={handleFormSubmit}>
          <input className="sign__input" type="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange}></input>
          <input className="sign__input" type="password" name="password" placeholder="Пароль" value={formValue.password} onChange={handleChange}></input>
          <button className="sign__submit" type="submit">Зарегистрироваться</button>
        </form>
        <Link className="sign__link" to='/sign-in'>Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  )
}


export default Register;