function ImagePopup({ card, onClose }) {
  return (
    <div className={card ? "popup popup_opened popup_type_img" : "popup popup_type_img"} id="imgPopup">
      <div className="popup__container popup__container_type_img">
        <button className="popup__close" type="button" id="closeImgPopupButton" onClick={onClose}></button>
        <img className="popup__img" src={card ? card.link : ""} alt={card ? `Изображение: ${card.name}` : ""} />
        <p className="popup__description">{card ? card.name : ""}</p>
      </div>
    </div>
  )
};

export default ImagePopup


