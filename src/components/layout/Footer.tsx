
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted py-6 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">MöbelGuide</h3>
            <p className="text-muted-foreground">
              Interaktive 3D-Anleitungen für einen einfachen Möbelaufbau.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Startseite</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Über uns</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Datenschutz</Link></li>
              <li><Link to="/imprint" className="text-muted-foreground hover:text-foreground transition-colors">Impressum</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} MöbelGuide. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
