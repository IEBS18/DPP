import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import logo from '../assets/logo.png';
export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src={logo} // replace with your logo file path
              alt="Logo"
              width={50}
              height={50}
              className="w-auto h-10"
            />
          </Link>
        </div>
        <div className="flex space-x-2">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/visualize">
            <Button variant="ghost">Visualize</Button>
          </Link>
          <Link to="/predict">
            <Button variant="ghost">Predict</Button>
          </Link>
          <Button variant="ghost">Log Out</Button>
        </div>
      </nav>
    </header>
  );
}
