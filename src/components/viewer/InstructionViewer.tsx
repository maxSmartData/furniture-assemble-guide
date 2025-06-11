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
import StepComments from "@/components/comments/StepComments";
import PartsChecker from "@/components/parts/PartsChecker";

interface InstructionViewerProps {
  language: string;
}

// Beispiel-Anleitung für die Wandregal-Montage
const INSTRUCTION_STEPS = {
  de: [
    { 
      id: 1, 
      title: "Wandlänge ausmessen", 
      description: "Messe mit einem Maßband die gewünschte Position des Regals ab. Achte darauf, dass das Regal waagerecht hängt und die richtige Höhe hat.",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749630782/Ausmessen_kjlpoh.png",
      duration: "2-3 Minuten",
      tools: ["Maßband", "Bleistift"]
    },
    { 
      id: 2, 
      title: "Bohrlöcher markieren", 
      description: "Mit Bleistift die Punkte für die Bohrungen anzeichnen. Verwende eine Wasserwaage, um sicherzustellen, dass die Markierungen gerade sind.",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749630781/Markieren_bljc9a.png",
      duration: "1-2 Minuten", 
      tools: ["Bleistift", "Wasserwaage", "Bohrschablone"]
    },
    { 
      id: 3, 
      title: "Bohren", 
      description: "Löcher mit der Bohrmaschine bohren. Wähle den richtigen Bohrer für deine Wandart (Beton, Gipskarton, etc.). Bohre langsam und gleichmäßig.",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749630780/Bohren_zj4xxc.png",
      duration: "3-5 Minuten",
      tools: ["Bohrmaschine", "Bohrer", "Schutzbrille"]
    },
    { 
      id: 4, 
      title: "Dübel einsetzen", 
      description: "Dübel in die gebohrten Löcher stecken. Die Dübel sollten bündig mit der Wand abschließen. Bei Bedarf vorsichtig mit einem Hammer einklopfen.",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749630781/D%C3%BCbel_gquaje.png",
      duration: "1-2 Minuten",
      tools: ["Dübel", "Hammer"]
    },
    { 
      id: 5, 
      title: "Regalhalter montieren", 
      description: "Halterungen mit den mitgelieferten Schrauben anschrauben. Ziehe die Schrauben fest an, aber nicht zu fest, um die Dübel nicht zu beschädigen.",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749631883/Halterung_sdqmly.png",
      duration: "3-4 Minuten",
      tools: ["Schraubendreher", "Schrauben", "Halterungen"]
    },
    { 
      id: 6, 
      title: "Regalbrett auflegen", 
      description: "Brett auf die Halterung setzen und fixieren. Überprüfe, ob das Regal stabil ist und gleichmäßig aufliegt. Fertig!",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749630780/Regal_sio7uj.png",
      duration: "1-2 Minuten",
      tools: ["Regalbrett"]
    }
  ],
  en: [
    { 
      id: 1, 
      title: "Measure wall length", 
      description: "Use a measuring tape to determine the desired position of the shelf. Make sure the shelf hangs level and at the correct height.",
      image: "https://res.cloudinary.com/dqc6tpdqo/image/upload/b_rgb:FFFFFF/c_pad,w_600,h_400/v1749630780/Regal_sio7uj.png",
      duration: "2-3 minutes",
      tools: ["Measuring tape", "Pencil"]
    },
    { 
      id: 2, 
      title: "Mark drill holes", 
      description: "Mark the drilling points with a pencil. Use a spirit level to ensure the markings are straight.",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop",
      duration: "1-2 minutes", 
      tools: ["Pencil", "Spirit level", "Drill template"]
    },
    { 
      id: 3, 
      title: "Drilling", 
      description: "Drill holes with the drill. Choose the right drill bit for your wall type (concrete, drywall, etc.). Drill slowly and steadily.",
      image: "https://images.unsplash.com/photo-1609592806085-6c92d7f8b4c4?w=600&h=400&fit=crop",
      duration: "3-5 minutes",
      tools: ["Drill", "Drill bit", "Safety glasses"]
    },
    { 
      id: 4, 
      title: "Insert dowels", 
      description: "Insert dowels into the drilled holes. The dowels should be flush with the wall. Tap gently with a hammer if needed.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
      duration: "1-2 minutes",
      tools: ["Dowels", "Hammer"]
    },
    { 
      id: 5, 
      title: "Mount shelf brackets", 
      description: "Screw on the brackets with the supplied screws. Tighten the screws firmly, but not too tight to avoid damaging the dowels.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop",
      duration: "3-4 minutes",
      tools: ["Screwdriver", "Screws", "Brackets"]
    },
    { 
      id: 6, 
      title: "Place shelf board", 
      description: "Place the board on the bracket and secure it. Check that the shelf is stable and sits evenly. Done!",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      duration: "1-2 minutes",
      tools: ["Shelf board"]
    }
  ]
};

const REQUIRED_MATERIALS = {
  de: [
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
  ],
  en: [
    { name: "Wall shelf (shelf boards)", quantity: "1x" },
    { name: "Shelf brackets", quantity: "2x" },
    { name: "Screws", quantity: "4x" },
    { name: "Dowels", quantity: "4x" },
    { name: "Drill", quantity: "1x" },
    { name: "Drill bit", quantity: "1x" },
    { name: "Measuring tape", quantity: "1x" },
    { name: "Spirit level", quantity: "1x" },
    { name: "Pencil", quantity: "1x" },
    { name: "Screwdriver", quantity: "1x" }
  ]
};

const InstructionViewer = ({ language }: InstructionViewerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showMaterials, setShowMaterials] = useState(false);

  const texts = {
    de: {
      title: "📋 Wandregal montieren",
      subtitle: "Diese Anleitung führt Sie Schritt für Schritt durch die Montage eines Wandregals.",
      progress: "Fortschritt",
      completed: "abgeschlossen",
      materials: "🔧 Benötigte Materialien und Werkzeuge",
      step: "Schritt",
      of: "von",
      needed: "Für diesen Schritt benötigt:",
      back: "← Zurück",
      next: "Weiter →",
      markComplete: "Als erledigt markieren",
      completed_mark: "✓ Erledigt",
      overview: "📖 Alle Schritte im Überblick",
      congratulations: "Glückwunsch! Wandregal erfolgreich montiert! 🎉"
    },
    en: {
      title: "📋 Mount wall shelf",
      subtitle: "This guide takes you step by step through mounting a wall shelf.",
      progress: "Progress",
      completed: "completed",
      materials: "🔧 Required materials and tools",
      step: "Step",
      of: "of",
      needed: "Needed for this step:",
      back: "← Back",
      next: "Next →",
      markComplete: "Mark as completed",
      completed_mark: "✓ Completed",
      overview: "📖 All steps overview",
      congratulations: "Congratulations! Wall shelf successfully mounted! 🎉"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.de;
  const steps = INSTRUCTION_STEPS[language as keyof typeof INSTRUCTION_STEPS] || INSTRUCTION_STEPS.de;
  const materials = REQUIRED_MATERIALS[language as keyof typeof REQUIRED_MATERIALS] || REQUIRED_MATERIALS.de;

  useEffect(() => {
    toast(`${t.step} ${currentStep + 1}: ${steps[currentStep].title}`);
  }, [currentStep, t.step, steps]);

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success(t.congratulations);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const currentStepData = steps[currentStep];
  const isStepCompleted = completedSteps.includes(currentStep);
  const progress = ((completedSteps.length) / steps.length) * 100;

  return (
    <div className="space-y-6" role="region" aria-label="Schritt-für-Schritt Anleitung">
      {/* Übersichtstext */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t.title}
            <Badge variant="secondary">{steps.length} {t.step}e</Badge>
          </CardTitle>
          <CardDescription>
            {t.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">{t.progress}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% {t.completed}</span>
          </div>
          <div 
            className="w-full bg-gray-200 rounded-full h-2"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${t.progress}: ${Math.round(progress)}%`}
          >
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
            aria-expanded={showMaterials}
            aria-label={t.materials}
          >
            {t.materials}
            <span aria-hidden="true">{showMaterials ? "▲" : "▼"}</span>
          </Button>
        </CardHeader>
        {showMaterials && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
              {materials.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded" role="listitem">
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
              {t.step} {currentStep + 1}: {currentStepData.title}
              {isStepCompleted && <Badge className="bg-green-500">{t.completed_mark}</Badge>}
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
                alt={`${t.step} ${currentStep + 1}: ${currentStepData.title}`}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Beschreibung */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">{currentStepData.description}</p>
            
            {/* Benötigte Werkzeuge für diesen Schritt */}
            <div>
              <h4 className="font-semibold mb-2">{t.needed}</h4>
              <div className="flex flex-wrap gap-2" role="list">
                {currentStepData.tools.map((tool, index) => (
                  <Badge key={index} variant="secondary" role="listitem">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Teile Check */}
          <PartsChecker stepId={currentStep + 1} language={language} />

          {/* Kommentare */}
          <StepComments stepId={currentStep + 1} language={language} />

          {/* Navigation */}
          <div className="flex gap-2 pt-4" role="group" aria-label="Schritt-Navigation">
            <Button 
              onClick={handlePrevStep} 
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1"
              aria-label={`${t.back} zu Schritt ${currentStep}`}
            >
              {t.back}
            </Button>
            <Button 
              onClick={handleStepComplete}
              className="flex-1 bg-green-600 hover:bg-green-700"
              aria-label={isStepCompleted ? t.completed_mark : t.markComplete}
            >
              {isStepCompleted ? t.completed_mark : t.markComplete}
            </Button>
            <Button 
              onClick={handleNextStep} 
              disabled={currentStep === steps.length - 1}
              variant="outline"
              className="flex-1"
              aria-label={`${t.next} zu Schritt ${currentStep + 2}`}
            >
              {t.next}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Übersicht aller Schritte */}
      <Card>
        <CardHeader>
          <CardTitle>{t.overview}</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={step.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div 
                    className={`p-2 h-full cursor-pointer ${
                      index === currentStep ? 'ring-2 ring-blue-500 rounded-lg' : ''
                    }`}
                    onClick={() => setCurrentStep(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Gehe zu ${t.step} ${index + 1}: ${step.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setCurrentStep(index);
                      }
                    }}
                  >
                    <div className="rounded-lg overflow-hidden border hover:border-blue-300 transition-colors">
                      <AspectRatio ratio={4/3}>
                        <img 
                          src={step.image} 
                          alt={`${t.step} ${index + 1}`}
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
              <CarouselPrevious aria-label="Vorherige Schritte" />
              <CarouselNext aria-label="Nächste Schritte" />
            </div>
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionViewer;
