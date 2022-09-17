import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Register.css';

function Register() {
    return (
        <div className="login">
            <h2 className="login__heading">Регистрация</h2>
            <form className="login__form" noValidate>
                <fieldset className="login__input-container">
                    <input name="email" id="email-input" type="email" placeholder="Email" required />
                    <input name="password" id="password-input" type="password" placeholder="Пароль" required />
                </fieldset>
                <div class="login__button-container">
                    <button className="login__link" type="submit">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__login-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;