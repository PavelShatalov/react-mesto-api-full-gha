import goodIcon from "../../images/good-icon.svg";
import badIcon from "../../images/bad-icon.svg";

function InfoTooltip({ isOpen, onClose, result }) {
  const title = result ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  const icon = result ? goodIcon : badIcon;
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"} >
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}>
        </button>
        <form className="popup__form">
          <fieldset className="popup__inputs">
          <img alt={title} src={icon} className="popup__confirm"/>
          <h2 className="popup__title popup__title_low">{title}</h2>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
export default InfoTooltip