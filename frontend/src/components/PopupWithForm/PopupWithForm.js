function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? "popup popup_opened" : "popup"} id={props.name}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}>
        </button>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          <fieldset className="popup__inputs">
            {props.children}
            <button type="submit" className="popup__submit-send">{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm

