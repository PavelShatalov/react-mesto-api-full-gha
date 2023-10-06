import logo from '../../images/header-Logo.svg';
import { Route, Routes, Link } from "react-router-dom";
function Header({email, onLogOut}) {

  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <Routes>
        <Route path="sign-in" element={ <Link to="/sign-up" className="header__nav"> Регистрация </Link> }/>
        <Route path="sign-up" element={ <Link to="/sign-in" className="header__nav">Войти</Link>}/>
        <Route exact path="/" element={
          <div className='header__info'>
            {email && <p className='header__email'>{email}</p>}
            <Link className='header__nav header__nav_logged' onClick={onLogOut}> Выйти </Link>
          </div>}/>
      </Routes>
    </header>
  )
}
export default Header