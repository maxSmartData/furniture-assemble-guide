
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliere das Senden des Formulars
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Ihre Nachricht wurde erfolgreich gesendet!");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8 space-y-8">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Kontakt</h1>
          <p className="text-xl text-muted-foreground">
            Haben Sie Fragen oder Anregungen? Kontaktieren Sie uns!
          </p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Kontaktformular</CardTitle>
              <CardDescription>Schreiben Sie uns eine Nachricht</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium text-sm">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium text-sm">E-Mail</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium text-sm">Nachricht</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ikea-blue hover:bg-ikea-blue/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white"></span>
                      Wird gesendet...
                    </>
                  ) : (
                    "Nachricht senden"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kontaktinformationen</CardTitle>
                <CardDescription>So erreichen Sie uns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-muted-foreground">
                    MöbelGuide GmbH<br />
                    Musterstraße 123<br />
                    10115 Berlin
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">E-Mail</h3>
                  <p className="text-muted-foreground">
                    info@moebelguide.de
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <p className="text-muted-foreground">
                    +49 (0) 30 123 456 78
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Öffnungszeiten</CardTitle>
                <CardDescription>Wann wir für Sie da sind</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Montag - Freitag</span>
                    <span>9:00 - 18:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag</span>
                    <span>10:00 - 14:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sonntag</span>
                    <span>Geschlossen</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
