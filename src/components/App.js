import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfooTooltipOpen, setIsInfooTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  function onLogin() {
    setLoggedIn(false);
  }



  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    }).catch((err) => { console.log(err) });
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfooTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.sendUserInfo(userData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false); })
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.sendUserAvatar(userData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false); })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => console.log(err));
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    })
      .catch((err) => { console.log(err) });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.postCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false); })
  }



  function onRegister(password, email) {
    auth.register(password, email)
      .then(data => {
        if (data) {
          setIsSuccess(true);
          setIsInfooTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch(err => console.log(err));
    setIsSuccess(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Switch>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            compomnent={Main}
          />

          <Route path="/sign-up">
            <Register
              onRegister={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Login
              onLogin={onLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfooTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          successText="Вы успешно зарегистрировались!"
          failedText="Что-то пошло не так! Попробуйте ещё раз."
        />

      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;