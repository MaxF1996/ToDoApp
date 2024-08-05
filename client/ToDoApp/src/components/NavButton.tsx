import { Link } from "react-router-dom";
import "./NavButton.css";

export default function NavButton({ BtnName }: { BtnName: string }) {
  return (
    <button className="NavButton">
      <Link to="/" className="NavLink">
        {BtnName}
      </Link>
    </button>
  );
}
