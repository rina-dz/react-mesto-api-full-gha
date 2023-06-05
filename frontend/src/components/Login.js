//import SignForm from "./SignForm.js";
import React, { useState } from 'react';

function Login(props) {

  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
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
        <h2 className="sign__title">Вход</h2>
        <form className="form sign__form" onSubmit={handleFormSubmit}>
          <input className="sign__input" type="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange}></input>
          <input className="sign__input" type="password" name="password" placeholder="Пароль" value={formValue.password} onChange={handleChange}></input>
          <button className="sign__submit" type="submit">Войти</button>
        </form>
      </div>
    </div>
  )
}


export default Login;