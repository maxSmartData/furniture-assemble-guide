
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock-Objekt für die Modellschritte
const MOCK_MODEL_STEPS = [
  { 
    id: 1, 
    title: "Teile auspacken und sortieren", 
    description: "Alle Teile aus der Verpackung nehmen und nach Typ und Größe sortieren.",
    image: "https://placehold.co/600x400/f2e8dc/a67c52?text=Schritt+1"
  },
  { 
    id: 2, 
    title: "Beine am Rahmenteil befestigen", 
    description: "Die vier Holzbeine mit den mitgelieferten Schrauben am Rahmen anbringen.",
    image: "https://placehold.co/600x400/f2e8dc/a67c52?text=Schritt+2" 
  },
  { 
    id: 3, 
    title: "Seitenteile anbringen", 
    description: "Die beiden Seitenteile am Rahmen befestigen und mit Schrauben fixieren.",
    image: "https://placehold.co/600x400/f2e8dc/a67c52?text=Schritt+3" 
  },
  { 
    id: 4, 
    title: "Mittlere Strebe einfügen", 
    description: "Die Stabilisierungsstrebe in der Mitte zwischen den Seitenteilen einsetzen.",
    image: "https://placehold.co/600x400/f2e8dc/a67c52?text=Schritt+4" 
  },
  { 
    id: 5, 
    title: "Oberseite aufsetzen", 
    description: "Die Oberplatte auf den Rahmen setzen und befestigen.",
    image: "https://placehold.co/600x400/f2e8dc/a67c52?text=Schritt+5" 
  },
  { 
    id: 6, 
    title: "Schrauben festziehen", 
    description: "Alle Schrauben überprüfen und bei Bedarf nachziehen.",
    image: "https://placehold.co/600x400/f2e8dc/a67c52?text=Schritt+6" 
  }
];

// Mock-Teile Liste
const MOCK_PARTS = [
  { id: 'A', name: 'Holzleisten (4x)', count: 4 },
  { id: 'B', name: 'Seitenteile (2x)', count: 2 },
  { id: 'C', name: 'Verbindungsstreben', count: 2 },
  { id: 'D', name: 'Oberplatte', count: 1 },
  { id: 'E', name: 'Bodenplatte', count: 1 },
  { id: 'S', name: 'Schrauben M4x20', count: 16 },
  { id: 'T', name: 'Dübel', count: 8 },
];

// Ansichten des Modells
const VIEWS = [
  { id: 'front', label: 'Vorderansicht' },
  { id: 'side', label: 'Seitenansicht' },
  { id: 'top', label: 'Draufsicht' },
  { id: 'exploded', label: 'Explosionsansicht' },
];

const ModelViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(50);
  const [currentView, setCurrentView] = useState('front');
  const [showPartsList, setShowPartsList] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    
    toast(`Schritt ${currentStep + 1}: ${MOCK_MODEL_STEPS[currentStep].title}`);
  }, [currentStep, loaded]);

  // Simuliere das Laden eines 3D-Modells
  const handleLoadModel = () => {
    setIsLoading(true);
    
    // Simulieren des Ladevorgangs
    setTimeout(() => {
      setIsLoading(false);
      setLoaded(true);
      toast.success("3D-Modell erfolgreich geladen!");
    }, 1500);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < MOCK_MODEL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Glückwunsch! Aufbau abgeschlossen! 🎉");
    }
  };

  const togglePartsList = () => {
    setShowPartsList(!showPartsList);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">3D-Möbelansicht</h2>
        
        <div className="space-y-6">
          {!loaded ? (
            <div 
              className="relative w-full aspect-video bg-muted rounded-md overflow-hidden mb-4 flex items-center justify-center"
              style={{ minHeight: "400px" }}
            >
              {isLoading ? (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                  <p>Modell wird geladen...</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4">Laden Sie eine Anleitung hoch oder wählen Sie ein Produkt aus, um zu starten.</p>
                  <Button onClick={handleLoadModel}>Demo-Modell laden</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Haupt-3D-Ansicht */}
              <div className="lg:col-span-2">
                <div className="bg-muted rounded-lg overflow-hidden">
                  <AspectRatio ratio={16/10}>
                    <div className="relative w-full h-full bg-[#f8f5f0]">
                      <canvas 
                        ref={canvasRef} 
                        className="w-full h-full"
                      />
                      
                      {/* Overlay mit Hinweisen zu aktuellen Schritten */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/85 backdrop-blur-sm p-3 rounded-md border shadow-sm">
                        <p className="text-sm text-muted-foreground">
                          {MOCK_MODEL_STEPS[currentStep].description}
                        </p>
                      </div>
                    </div>
                  </AspectRatio>
                </div>
                
                {/* Ansichtssteuerung */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {VIEWS.map(view => (
                    <Button 
                      key={view.id}
                      size="sm"
                      variant={currentView === view.id ? "default" : "outline"}
                      onClick={() => setCurrentView(view.id)}
                    >
                      {view.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Seitenleiste mit Schritten und Teilen */}
              <div className="flex flex-col space-y-4">
                {/* Aktueller Schritt */}
                <div className="rounded-lg border overflow-hidden">
                  <img 
                    src={MOCK_MODEL_STEPS[currentStep].image} 
                    alt={`Schritt ${currentStep + 1}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold">
                      Schritt {currentStep + 1}: {MOCK_MODEL_STEPS[currentStep].title}
                    </h3>
                  </div>
                </div>
                
                {/* Teile für diesen Schritt */}
                <div>
                  <Button 
                    variant="outline" 
                    onClick={togglePartsList}
                    className="w-full justify-between mb-2"
                  >
                    Benötigte Teile 
                    <span className="ml-2">
                      {showPartsList ? "▲" : "▼"}
                    </span>
                  </Button>
                  
                  {showPartsList && (
                    <div className="border rounded-md p-3 space-y-2 bg-muted/50">
                      {MOCK_PARTS.slice(0, currentStep + 2).map(part => (
                        <div key={part.id} className="flex justify-between items-center">
                          <span className="font-medium">Teil {part.id}: {part.name}</span>
                          <span className="text-muted-foreground">{part.count}x</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {loaded && (
            <>
              {/* Übersicht aller Schritte als Karussell */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Alle Montageschritte</h3>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {MOCK_MODEL_STEPS.map((step, index) => (
                      <CarouselItem key={step.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div 
                          className={`p-2 h-full ${index === currentStep ? 'ring-2 ring-primary rounded-lg' : ''}`}
                          onClick={() => setCurrentStep(index)}
                        >
                          <div className="rounded-lg overflow-hidden border cursor-pointer hover:border-primary transition-colors">
                            <AspectRatio ratio={4/3}>
                              <img 
                                src={step.image} 
                                alt={`Vorschau Schritt ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </AspectRatio>
                            <div className="p-2 text-center">
                              <p className="text-sm font-medium">{index + 1}. {step.title}</p>
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
              </div>
              
              {/* Steuerung für Navigation und Zoom */}
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Schritt {currentStep + 1} von {MOCK_MODEL_STEPS.length}
                  </h3>
                  <p className="text-muted-foreground">{MOCK_MODEL_STEPS[currentStep].title}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handlePrevStep} 
                      disabled={currentStep === 0}
                      variant="outline"
                      className="flex-1"
                    >
                      Zurück
                    </Button>
                    <Button 
                      onClick={handleNextStep} 
                      variant="default" 
                      className="flex-1 bg-ikea-blue hover:bg-ikea-blue/90"
                    >
                      {currentStep === MOCK_MODEL_STEPS.length - 1 ? "Fertigstellen" : "Weiter"}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Zoom</span>
                      <span className="text-sm font-medium">{zoom}%</span>
                    </div>
                    <Slider
                      value={[zoom]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={(value) => setZoom(value[0])}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
