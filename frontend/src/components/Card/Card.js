import React, {useContext} from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js"
function Card({card, onCardClick, onCardLike, onCardDelete }) {
  
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick(){
    onCardLike(card);
  }
  function handleDeleteClick(){
    onCardDelete(card);

  }
  // console.log(1, card)

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn =  card.owner === currentUser._id;
  // console.log(2, card.likes)
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked =  card.likes.some(i => i === currentUser._id);
  const isLiked = card.likes && card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__button-like ${isLiked && 'card__button-like_active'}` 
  );

  return (
    <div className="card">
      {isOwn && <button  className="card__button-trash" type="button" onClick={handleDeleteClick} />} 
      {/* <button className="card__button-trash" type="button"></button> */}
      <img className="card__img" src={card.link} alt={`Изображение: ${card.name}`} onClick={handleClick} />
      <div className="card__title-row">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__info">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes && card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card