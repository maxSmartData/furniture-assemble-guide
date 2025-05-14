
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

// Mock-Objekt für die Modellschritte (in einer echten App würde dies dynamisch generiert)
const MOCK_MODEL_STEPS = [
  { id: 1, title: "Teile auspacken und sortieren" },
  { id: 2, title: "Beine am Rahmenteil befestigen" },
  { id: 3, title: "Seitenteile anbringen" },
  { id: 4, title: "Mittlere Strebe einfügen" },
  { id: 5, title: "Oberseite aufsetzen" },
  { id: 6, title: "Schrauben festziehen" }
];

const ModelViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(50);

  useEffect(() => {
    if (!loaded) return;
    
    toast(`Schritt ${currentStep + 1}: ${MOCK_MODEL_STEPS[currentStep].title}`);
  }, [currentStep, loaded]);

  // Simuliere das Laden eines 3D-Modells (in einer echten App würde hier ein echtes 3D-Modell geladen)
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

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">3D-Möbelansicht</h2>
        
        <div 
          className="relative w-full aspect-video bg-muted rounded-md overflow-hidden mb-4 flex items-center justify-center"
          style={{ minHeight: "400px" }}
        >
          {!loaded ? (
            <div className="text-center">
              {isLoading ? (
                <div>
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                  <p>Modell wird geladen...</p>
                </div>
              ) : (
                <div>
                  <p className="mb-4">Laden Sie eine Anleitung hoch oder wählen Sie ein Produkt aus, um zu starten.</p>
                  <Button onClick={handleLoadModel}>Demo-Modell laden</Button>
                </div>
              )}
            </div>
          ) : (
            <canvas 
              ref={canvasRef} 
              className="w-full h-full bg-wood-light"
            />
          )}
        </div>
        
        {loaded && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ModelViewer;
