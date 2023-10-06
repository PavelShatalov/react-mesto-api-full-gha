import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js"
import React, { useRef, useState } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const currentUser = React.useContext(CurrentUserContext);
  const inputRef = useRef()
  const [url, setUrl] = React.useState('');
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setUrl(currentUser.avatar);
  }, [currentUser]);

  

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
    onClose();
    inputRef.current.value = ''
  }

  return (
    <PopupWithForm name="changeAvatarPopup" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <label className="popup__label">
        <input ref={inputRef} type="url" id="url-input2" name="url" className="popup__input" placeholder="Ссылка на картинку" required onChange={handleUrlChange} />
        <span className="popup__input-error url-input2-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


