import React, { useState, useEffect, useContext } from 'react';
import Card from "../Card/Card.js"
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className="profile__description">
          <div className="profile__avatar">
            <img id="avatar" className="profile__img-avatar" src={currentUser.avatar} alt="фото пользователя" />
            <button className="profile__avatar-button" type="button" onClick={onEditAvatar} id="changeAvatarButton"></button>
          </div>
          <div>
            <div className="profile__title-row">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__button-change" onClick={onEditProfile} type="button"></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {
          cards.map(card => {
            return (
              <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
            )
          })
        }
      </section>
    </main>
  )
}
export default Main





