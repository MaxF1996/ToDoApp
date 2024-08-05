import NavButton from "./NavButton";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <nav className="NavButtons">
        <ul className="NavButtonsList">
          <li>
            <NavButton BtnName="Home" />
          </li>
          <li>
            <NavButton BtnName="Decks" />
          </li>
          <li>
            <NavButton BtnName="Login" />
          </li>
        </ul>
      </nav>

      <h1>To Do App</h1>
    </header>
  );
}
