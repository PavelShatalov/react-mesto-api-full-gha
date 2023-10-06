import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js"
import React, { useRef, useState } from "react";


function AddPlacePopup({ isOpen, onClose, onAddCard }) {

  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const inputNameRef = useRef()
  const inputUrlRef = useRef()
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setUrl('');
    setName('');

  }, [currentUser]);


  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: inputNameRef.current.value,
      url: inputUrlRef.current.value
    });
    onClose();
    setName('');
    setUrl('');

  }
  return (
    <PopupWithForm name="addPopup" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Создать">
      <label className="popup__label">
        <input ref={inputNameRef} type="text" id="card-name-input" name="card-name" className="popup__input" placeholder="Название" minLength="2" maxLength="30" required
          onChange={handleNameChange} value = {''||name} />
        <span className="popup__input-error card-name-input-error"></span>
      </label>
      <label className="popup__label">
        <input ref={inputUrlRef} type="url" id="url-input" name="url" className="popup__input" placeholder="Ссылка на картинку" required onChange={handleUrlChange} value={''||url} />
        <span className="popup__input-error url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;


