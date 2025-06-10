
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-background py-4" role="banner">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="EasyStep Startseite">
          <div className="bg-ikea-blue text-white p-2 rounded-md">
            <Home size={24} aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-foreground">EasyStep</h1>
        </Link>
        <nav className="flex items-center space-x-4" role="navigation" aria-label="Hauptnavigation">
          <Button variant="ghost" asChild>
            <Link to="/">Startseite</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">Über uns</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/contact">Kontakt</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
