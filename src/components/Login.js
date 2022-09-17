import React from 'react';
import './styles/Login.css';

function Login() {
    return (
        <div className="login">
            <h2 className="login__heading">Вход</h2>
            <form className="login__form" noValidate>
                <fieldset className="login__input-container">
                    <input name="email" id="email-input" type="email" placeholder="Email" required />
                    <input name="password" id="password-input" type="password" placeholder="Пароль" required />
                </fieldset>
                <div class="login__button-container">
                    <button className="login__link" type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
}

export default Login;