import React, { useState } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { newApi } from '../utils/api.js';
import { newAuthApi } from '../utils/authenticationApi.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

import '../index.css';

function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState({});
  const [cards, addCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isOperationSuccessful, setOperationSuccessful] = React.useState(false);
  const [loggedIn, changeState] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({});

  React.useEffect(() => {
    newApi.getInitialCards()
      .then((res) => {
        addCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    newApi.getUserInfo()
      .then((res) => {
        const info = { name: res.name, description: res.about, avatar: res.avatar, _id: res._id };
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      newAuthApi.tokenValidityCheck(jwt)
        .then((res) => {
          changeState(true);
          setCurrentEmail(res.data.email);
          navigate('/main', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  function signOut() {
    localStorage.removeItem('jwt');
    changeState(false);
    navigate('/sign-in', { replace: true });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      newApi.setLike(card._id)
        .then((newCard) => {
          addCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      newApi.removeLike(card._id)
        .then((newCard) => {
          addCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleCardDelete(card) {
    newApi.deleteCard(card._id)
      .then(() => {
        addCards((state) => state.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
    selectCard({});
  }

  function handleCardClick(card) {
    selectCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }

  function handleUpdateUser(info) {
    newApi.changeUserInfo(info)
      .then(() => {
        setCurrentUser({ name: info.name, description: info.description, _id: currentUser._id, avatar: currentUser.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegister(info) {
    newAuthApi.registration(info)
      .then(() => {
        setOperationSuccessful(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setOperationSuccessful(false);
        console.log(err);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
  }

  function handleLogin(info) {
    newAuthApi.authorization(info.password, info.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
        changeState(true);
        setCurrentEmail(info.email);
        navigate('/main', { replace: true });
      })
      .catch((err) => {
        setOperationSuccessful(false);
        setInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleUpdateAvatar(info) {
    newApi.changeAvatar(info)
      .then(() => {
        setCurrentUser({ avatar: info.avatar, name: currentUser.name, description: currentUser.description, _id: currentUser._id });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(newCard) {
    newApi.addNewCard(newCard)
      .then((resCard) => {
        addCards([resCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header signOut={signOut} email={currentEmail} loggedIn={loggedIn} />
        <Routes>
          <Route path="/main" element={<ProtectedRoute loggedIn={loggedIn}
            element={Main}
            cards={cards}
            onEditAvatar={() => {
              setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
            }}
            onEditProfile={() => {
              setEditProfilePopupOpen(!isEditProfilePopupOpen);
            }}
            onAddPlace={() => {
              setAddPlacePopupOpen(!isAddPlacePopupOpen);
            }}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />} />
          <Route path="/sign-in" element={<Login handleSubmit={handleLogin} />} />
          <Route path="/sign-up" element={<Register handleSubmit={handleRegister} />} />
          <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isOperationSuccessful={isOperationSuccessful} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
