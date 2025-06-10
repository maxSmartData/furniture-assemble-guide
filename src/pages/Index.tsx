
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FileUpload from "@/components/upload/FileUpload";
import ProductSelection from "@/components/products/ProductSelection";
import InstructionViewer from "@/components/viewer/InstructionViewer";
import LanguageSelector from "@/components/language/LanguageSelector";

const Index = () => {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [language, setLanguage] = useState('de');
  
  const handleUploadComplete = () => {
    setViewerVisible(true);
  };
  
  const handleProductSelect = () => {
    setViewerVisible(true);
  };

  const texts = {
    de: {
      title: "Möbelaufbau leicht gemacht",
      subtitle: "EasyStep wandelt komplizierte Anleitungen in einfache, verständliche Schritt-für-Schritt-Anleitungen um – für einen stressfreien Aufbau."
    },
    en: {
      title: "Furniture Assembly Made Easy",
      subtitle: "EasyStep transforms complicated instructions into simple, understandable step-by-step guides – for stress-free assembly."
    }
  };

  const t = texts[language as keyof typeof texts] || texts.de;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8 space-y-8" role="main">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-6">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage}
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-4" id="main-title">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground" aria-describedby="main-title">
            {t.subtitle}
          </p>
        </section>
        
        <div className="space-y-8" role="region" aria-label="Funktionen">
          <FileUpload onUploadComplete={handleUploadComplete} />
          
          {!viewerVisible && (
            <ProductSelection onProductSelect={handleProductSelect} />
          )}
          
          {viewerVisible && (
            <InstructionViewer language={language} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
