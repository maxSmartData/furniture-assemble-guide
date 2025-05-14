
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8 space-y-8">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Über MöbelGuide</h1>
          <p className="text-xl text-muted-foreground">
            Wir machen den Möbelaufbau einfacher und angenehmer durch moderne Technologie.
          </p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Unsere Mission</CardTitle>
              <CardDescription>Was uns antreibt</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                MöbelGuide entstand aus persönlicher Frustration mit komplexen Aufbauanleitungen. 
                Unser Ziel ist es, den Aufbauprozess für jeden zugänglich und stressfrei zu gestalten, 
                unabhängig von technischen Vorkenntnissen oder handwerklichen Fähigkeiten.
              </p>
              <p className="mt-4">
                Wir glauben daran, dass Technologie das Leben einfacher machen sollte. 
                Mit interaktiven 3D-Visualisierungen revolutionieren wir den Möbelaufbau 
                und sparen unseren Nutzern Zeit, Nerven und unnötigen Stress.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Unsere Technologie</CardTitle>
              <CardDescription>Wie wir es möglich machen</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Hinter MöbelGuide steht eine innovative KI, die Anleitungen analysiert 
                und in detaillierte, interaktive 3D-Modelle umwandelt. Unser System
                erkennt automatisch Bauteile, Verbindungen und Aufbauschritte und 
                präsentiert sie in einer intuitiven, visuellen Form.
              </p>
              <p className="mt-4">
                Die 3D-Visualisierungen können aus jedem Winkel betrachtet, vergrößert 
                und in jedem Tempo durchlaufen werden. So bekommen Nutzer genau die 
                Unterstützung, die sie für einen erfolgreichen Aufbau benötigen.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Das Team</CardTitle>
            <CardDescription>Die Menschen hinter MöbelGuide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-wood-light mb-4 flex items-center justify-center text-wood-dark">
                  <span className="text-4xl">JM</span>
                </div>
                <h3 className="font-semibold text-lg">Julia Müller</h3>
                <p className="text-muted-foreground">Gründerin & CEO</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-wood-light mb-4 flex items-center justify-center text-wood-dark">
                  <span className="text-4xl">TS</span>
                </div>
                <h3 className="font-semibold text-lg">Thomas Schmidt</h3>
                <p className="text-muted-foreground">CTO & 3D-Spezialist</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-wood-light mb-4 flex items-center justify-center text-wood-dark">
                  <span className="text-4xl">AK</span>
                </div>
                <h3 className="font-semibold text-lg">Anna Krause</h3>
                <p className="text-muted-foreground">UX-Designerin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
