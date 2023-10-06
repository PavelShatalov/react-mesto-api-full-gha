// import auth from "../utils/Auth.js"
import React, { useState } from "react";

function Login({onSubmit}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleLoginSubmit(e) {
    e.preventDefault();
    onSubmit(
      {
       password:password,
       email:email
      }
    );
  }

  return (
    <main>
      <section className="sign">
        <form className="popup__form" onSubmit ={handleLoginSubmit}>
          <h2 className="sign__title">Вход</h2>
          <fieldset className="popup__inputs">
            <label className="popup__label">
              <input type="email" id="sign-in-email-input" name="card-name" className="sign__input" placeholder="Email" 
                minLength="2" maxLength="30" required onChange={handleEmailChange} value={'' || email} />
              <span className="popup__input-error sign-in-email-input-error"></span>
            </label>
            <label className="popup__label">
              <input type="password" id="sign-in-password-input" name="url" className="sign__input" placeholder="Пароль" 
              minLength="2" maxLength="30" required onChange={handlePasswordChange} value={'' || password} />
              <span className="popup__input-error sign-in-password-input-error"></span>
            </label>
            <button type="submit" className="sign__submit-send">Войти</button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
export default Login