
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Check, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PartsCheckerProps {
  stepId: number;
  language: string;
}

const PartsChecker = ({ stepId, language }: PartsCheckerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);

  const texts = {
    de: {
      title: "Teile Check",
      description: "Laden Sie ein Foto Ihres Teils hoch, um zu überprüfen, ob Sie das richtige Teil verwenden.",
      upload: "Foto hochladen",
      checking: "Überprüfung läuft...",
      correct: "✓ Richtiges Teil erkannt!",
      incorrect: "✗ Falsches Teil - Bitte überprüfen Sie die Anleitung",
      newCheck: "Neues Foto hochladen"
    },
    en: {
      title: "Parts Check",
      description: "Upload a photo of your part to verify you're using the correct piece.",
      upload: "Upload Photo",
      checking: "Checking...",
      correct: "✓ Correct part detected!",
      incorrect: "✗ Wrong part - Please check the instructions",
      newCheck: "Upload new photo"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.de;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(language === 'de' ? 'Bitte wählen Sie eine Bilddatei.' : 'Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setCheckResult(null);
      simulatePartsCheck();
    };
    reader.readAsDataURL(file);
  };

  const simulatePartsCheck = () => {
    setIsChecking(true);
    
    // Simuliere KI-Bildanalyse
    setTimeout(() => {
      setIsChecking(false);
      // Zufälliges Ergebnis für Demo-Zwecke
      const isCorrect = Math.random() > 0.3;
      setCheckResult(isCorrect ? 'correct' : 'incorrect');
      
      if (isCorrect) {
        toast.success(t.correct);
      } else {
        toast.error(t.incorrect);
      }
    }, 2000);
  };

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        onClick={() => setIsVisible(!isVisible)}
        className="w-full justify-start gap-2"
        aria-expanded={isVisible}
        aria-label={t.title}
      >
        <Camera className="h-4 w-4" />
        {t.title}
      </Button>

      {isVisible && (
        <Card className="mt-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="h-5 w-5" />
              {t.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!uploadedImage ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="max-w-md mx-auto"
                  aria-label={t.upload}
                />
                <p className="text-sm text-muted-foreground mt-2">{t.upload}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AspectRatio ratio={16/9} className="rounded-lg overflow-hidden border">
                  <img 
                    src={uploadedImage} 
                    alt="Hochgeladenes Teil"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>

                {isChecking && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">{t.checking}</span>
                  </div>
                )}

                {checkResult && (
                  <div className={`flex items-center gap-2 p-3 rounded-md ${
                    checkResult === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {checkResult === 'correct' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {checkResult === 'correct' ? t.correct : t.incorrect}
                    </span>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setUploadedImage(null);
                    setCheckResult(null);
                  }}
                  className="w-full"
                >
                  {t.newCheck}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PartsChecker;
