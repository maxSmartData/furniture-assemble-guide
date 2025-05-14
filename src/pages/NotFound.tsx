
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="text-ikea-blue">
          <h1 className="text-9xl font-bold">404</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Seite nicht gefunden</h2>
          <p className="text-muted-foreground max-w-md">
            Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
            Bitte kehren Sie zur Startseite zurück.
          </p>
        </div>
        
        <Button asChild className="bg-ikea-blue hover:bg-ikea-blue/90">
          <Link to="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
