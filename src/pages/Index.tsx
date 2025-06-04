
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FileUpload from "@/components/upload/FileUpload";
import ProductSelection from "@/components/products/ProductSelection";
import InstructionViewer from "@/components/viewer/InstructionViewer";

const Index = () => {
  const [viewerVisible, setViewerVisible] = useState(false);
  
  const handleUploadComplete = () => {
    setViewerVisible(true);
  };
  
  const handleProductSelect = () => {
    setViewerVisible(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8 space-y-8">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Möbelaufbau leicht gemacht</h1>
          <p className="text-xl text-muted-foreground">
            MöbelGuide wandelt komplizierte Anleitungen in einfache, 
            verständliche Schritt-für-Schritt-Anleitungen um – für einen stressfreien Aufbau.
          </p>
        </section>
        
        <div className="space-y-8">
          <FileUpload onUploadComplete={handleUploadComplete} />
          
          {!viewerVisible && (
            <ProductSelection onProductSelect={handleProductSelect} />
          )}
          
          {viewerVisible && (
            <InstructionViewer />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
