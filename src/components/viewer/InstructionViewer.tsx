
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

// Beispiel-Anleitung für die Wandregal-Montage
const INSTRUCTION_STEPS = [
  { 
    id: 1, 
    title: "Wandlänge ausmessen Test", 
    description: "Messe mit einem Maßband die gewünschte Position des Regals ab. Achte darauf, dass das Regal waagerecht hängt und die richtige Höhe hat.",
    image: "https://gemini.google.com/app/d973cbc321150512?hl=de",
    duration: "2-3 Minuten",
    tools: ["Maßband", "Bleistift"]
  },
  { 
    id: 2, 
    title: "Bohrlöcher markieren", 
    description: "Mit Bleistift die Punkte für die Bohrungen anzeichnen. Verwende eine Wasserwaage, um sicherzustellen, dass die Markierungen gerade sind.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop",
    duration: "1-2 Minuten", 
    tools: ["Bleistift", "Wasserwaage", "Bohrschablone"]
  },
  { 
    id: 3, 
    title: "Bohren", 
    description: "Löcher mit der Bohrmaschine bohren. Wähle den richtigen Bohrer für deine Wandart (Beton, Gipskarton, etc.). Bohre langsam und gleichmäßig.",
    image: "https://images.unsplash.com/photo-1609592806085-6c92d7f8b4c4?w=600&h=400&fit=crop",
    duration: "3-5 Minuten",
    tools: ["Bohrmaschine", "Bohrer", "Schutzbrille"]
  },
  { 
    id: 4, 
    title: "Dübel einsetzen", 
    description: "Dübel in die gebohrten Löcher stecken. Die Dübel sollten bündig mit der Wand abschließen. Bei Bedarf vorsichtig mit einem Hammer einklopfen.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
    duration: "1-2 Minuten",
    tools: ["Dübel", "Hammer"]
  },
  { 
    id: 5, 
    title: "Regalhalter montieren", 
    description: "Halterungen mit den mitgelieferten Schrauben anschrauben. Ziehe die Schrauben fest an, aber nicht zu fest, um die Dübel nicht zu beschädigen.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop",
    duration: "3-4 Minuten",
    tools: ["Schraubendreher", "Schrauben", "Halterungen"]
  },
  { 
    id: 6, 
    title: "Regalbrett auflegen", 
    description: "Brett auf die Halterung setzen und fixieren. Überprüfe, ob das Regal stabil ist und gleichmäßig aufliegt. Fertig!",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    duration: "1-2 Minuten",
    tools: ["Regalbrett"]
  }
];

// Benötigte Werkzeuge und Materialien
const REQUIRED_MATERIALS = [
  { name: "Wandregal (Regalbretter)", quantity: "1x" },
  { name: "Regalhalterungen", quantity: "2x" },
  { name: "Schrauben", quantity: "4x" },
  { name: "Dübel", quantity: "4x" },
  { name: "Bohrmaschine", quantity: "1x" },
  { name: "Bohrer", quantity: "1x" },
  { name: "Maßband", quantity: "1x" },
  { name: "Wasserwaage", quantity: "1x" },
  { name: "Bleistift", quantity: "1x" },
  { name: "Schraubendreher", quantity: "1x" }
];

const InstructionViewer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showMaterials, setShowMaterials] = useState(false);

  useEffect(() => {
    toast(`Schritt ${currentStep + 1}: ${INSTRUCTION_STEPS[currentStep].title}`);
  }, [currentStep]);

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < INSTRUCTION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Glückwunsch! Wandregal erfolgreich montiert! 🎉");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < INSTRUCTION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const currentStepData = INSTRUCTION_STEPS[currentStep];
  const isStepCompleted = completedSteps.includes(currentStep);
  const progress = ((completedSteps.length) / INSTRUCTION_STEPS.length) * 100;

  return (
    <div className="space-y-6">
      {/* Übersichtstext */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Wandregal montieren
            <Badge variant="secondary">{INSTRUCTION_STEPS.length} Schritte</Badge>
          </CardTitle>
          <CardDescription>
            Diese Anleitung führt Sie Schritt für Schritt durch die Montage eines Wandregals. 
            Ein Wandregal ist eine platzsparende Lösung zur Aufbewahrung und Dekoration. 
            Mit den richtigen Werkzeugen und dieser Anleitung haben Sie Ihr Regal in etwa 15-20 Minuten sicher an der Wand befestigt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Fortschritt</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% abgeschlossen</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Materialien und Werkzeuge */}
      <Card>
        <CardHeader>
          <Button 
            variant="outline" 
            onClick={() => setShowMaterials(!showMaterials)}
            className="w-full justify-between"
          >
            🔧 Benötigte Materialien und Werkzeuge
            <span>{showMaterials ? "▲" : "▼"}</span>
          </Button>
        </CardHeader>
        {showMaterials && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REQUIRED_MATERIALS.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span>{item.name}</span>
                  <Badge variant="outline">{item.quantity}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Aktueller Schritt */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Schritt {currentStep + 1}: {currentStepData.title}
              {isStepCompleted && <Badge className="bg-green-500">✓ Erledigt</Badge>}
            </CardTitle>
            <Badge variant="outline">⏱️ {currentStepData.duration}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Schritt-Bild */}
          <div className="rounded-lg overflow-hidden border">
            <AspectRatio ratio={16/10}>
              <img 
                src={currentStepData.image} 
                alt={`Schritt ${currentStep + 1}: ${currentStepData.title}`}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Beschreibung */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">{currentStepData.description}</p>
            
            {/* Benötigte Werkzeuge für diesen Schritt */}
            <div>
              <h4 className="font-semibold mb-2">Für diesen Schritt benötigt:</h4>
              <div className="flex flex-wrap gap-2">
                {currentStepData.tools.map((tool, index) => (
                  <Badge key={index} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handlePrevStep} 
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1"
            >
              ← Zurück
            </Button>
            <Button 
              onClick={handleStepComplete}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isStepCompleted ? "✓ Erledigt" : "Als erledigt markieren"}
            </Button>
            <Button 
              onClick={handleNextStep} 
              disabled={currentStep === INSTRUCTION_STEPS.length - 1}
              variant="outline"
              className="flex-1"
            >
              Weiter →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Übersicht aller Schritte */}
      <Card>
        <CardHeader>
          <CardTitle>📖 Alle Schritte im Überblick</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent>
              {INSTRUCTION_STEPS.map((step, index) => (
                <CarouselItem key={step.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div 
                    className={`p-2 h-full cursor-pointer ${
                      index === currentStep ? 'ring-2 ring-blue-500 rounded-lg' : ''
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="rounded-lg overflow-hidden border hover:border-blue-300 transition-colors">
                      <AspectRatio ratio={4/3}>
                        <img 
                          src={step.image} 
                          alt={`Schritt ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-sm font-medium">{index + 1}. {step.title}</span>
                          {completedSteps.includes(index) && (
                            <Badge className="bg-green-500 text-white text-xs">✓</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{step.duration}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionViewer;
