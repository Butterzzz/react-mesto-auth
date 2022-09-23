import React from 'react';
import { useState } from 'react';
import './styles/Login.css';

function Login({ onLogin }) {
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

        onLogin(password, email);
        setEmail('');
        setPassword('');
    }

    return (
        <div className="login">
            <h2 className="login__heading">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit} noValidate>
                <fieldset className="login__input-container">
                    <input name="email" id="email-input" type="email" placeholder="Email" value={email} onChange={handleEmailInput} required />
                    <input name="password" id="password-input" type="password" placeholder="Пароль" value={password} onChange={handlePasswordInput} required />
                </fieldset>
                <div className="login__button-container">
                    <button className="login__link" type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
}

export default Login;