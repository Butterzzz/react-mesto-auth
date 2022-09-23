import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Register.css';

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onRegister(password, email);
        setEmail('');
        setPassword('');
    }

    return (
        <div className="login">
            <h2 className="login__heading">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit} noValidate>
                <fieldset className="login__input-container">
                    <input name="email" id="email-input" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required />
                    <input name="password" id="password-input" type="password" placeholder="Пароль" value={password} onChange={handlePasswordInput} required />
                </fieldset>
                <div className="login__button-container">
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