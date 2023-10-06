import React, { useState, useEffect } from 'react';
import Header from "./Header/Header.js"
import Main from "./Main/Main.js"
import Footer from "./Footer/Footer.js"
import PopupWithForm from "./PopupWithForm/PopupWithForm.js"
import ImagePopup from "./ImagePopup/ImagePopup.js"
import { api } from "../utils/Api.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup"
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js"
import Login from './Login/Login.js'
import Register from './Register/Register.js'
import InfoTooltip from './InfoTooltip/InfoTooltip.js'
import { registrace, authorizace, tokenValidate, jwtDelete } from "../utils/ApiAutorizace.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthorizationPopupOpen, setAuthorizationPopupOpen] = React.useState(false);
  const [isAuthorizationPopupStatus, setAuthorizationPopupStatus] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(console.error);
    }

  }, [loggedIn])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке

    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(console.error);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).catch(console.error).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    }).catch(console.error);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null)
    setAuthorizationPopupOpen(false)
    setAuthorizationPopupStatus(false)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)

  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(data) {
    api.setUserInfo({ name: data.name, profession: data.about }).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    }).catch(console.error);
  }

  function handleUpdateAvatar(link) {
    console.log(link)
    api.changeAvatar(link.avatar).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    }).catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard({ name: data.name, link: data.url }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(console.error);
  }

  function handleSignUp(data) {
   
    registrace(data.password, data.email)
      .then((userData) => {
        setAuthorizationPopupOpen(true);
        setAuthorizationPopupStatus(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setAuthorizationPopupOpen(true);
        setAuthorizationPopupStatus(false);
      });
  }

  function handleSignIn(data) {
    authorizace(data.password, data.email)
      .then((userData) => {
        setLoggedIn(true);
        setEmail(data.email);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setAuthorizationPopupOpen(true);
        setAuthorizationPopupStatus(false);
      });
  }

  function checkJWT() {
    // const jwt = localStorage.getItem('jwt');
    // console.log(jwt);
    tokenValidate().then((res) => {
      if (!res) {
        // перейти в бок catch
        throw new Error('Нет токена');
        return;
      }
      setLoggedIn(true);
      setEmail(res.email);
      navigate("/", { replace: true });
      return;
    })
    .catch((err) => {
      console.log(err);
    })
    navigate("/sign-in", { replace: true });
  }

  useEffect(() => {
    checkJWT();
  }, [])

  function logOut(event) {
    // document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    jwtDelete();
    navigate('/sign-in', { replace: true });
    setEmail('');
    setLoggedIn(false);
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <div className="page">
          <Header email={email} onLogOut={logOut} />
          <Routes>
            <Route path="/" exact element={<ProtectedRoute element={Main} onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
              onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} loggedIn={loggedIn} />} />
            <Route path="/sign-in" element={<Login onSubmit={(data) => handleSignIn(data)} />} />
            <Route path="/sign-up" element={<Register onSubmit={(data) => handleSignUp(data)} />} />
          </Routes>
          <Footer />
          <InfoTooltip isOpen={isAuthorizationPopupOpen} onClose={closeAllPopups} result={isAuthorizationPopupStatus} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm name="confirmationPopup" title="Вы уверены?" isOpen={false} onClose={closeAllPopups} buttonText="Да">
          </PopupWithForm>
        </div>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


