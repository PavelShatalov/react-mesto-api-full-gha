import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

 
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="popupChange" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      <label className="popup__label">
        <input type="text" id="name-input" name="name" className="popup__input" minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange} />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" id="profession-input" name="profession" className="popup__input" minLength="2" maxLength="200" required value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__input-error profession-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;