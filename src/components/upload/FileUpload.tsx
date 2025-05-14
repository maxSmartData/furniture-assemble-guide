
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const FileUpload = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file && !productName) {
      toast.error("Bitte laden Sie eine Anleitung hoch oder geben Sie einen Produktnamen ein.");
      return;
    }
    
    // Simuliere das Hochladen und Verarbeiten
    setUploading(true);
    
    setTimeout(() => {
      setUploading(false);
      toast.success(file 
        ? `Anleitung ${file.name} erfolgreich verarbeitet!`
        : `Produktdaten für "${productName}" geladen!`
      );
      onUploadComplete();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anleitung hochladen</CardTitle>
        <CardDescription>
          Laden Sie eine PDF-Anleitung hoch oder geben Sie den Produktnamen ein, um zu beginnen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="file-upload" className="block font-medium text-sm">
              PDF-Anleitung hochladen
            </label>
            <div className="flex items-center gap-4">
              <Input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="max-w-md"
              />
              {file && (
                <span className="text-sm text-muted-foreground">
                  {file.name}
                </span>
              )}
            </div>
          </div>
          
          <div className="text-center my-2">
            <span className="text-muted-foreground">oder</span>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="product-name" className="block font-medium text-sm">
              Produktname eingeben
            </label>
            <Input
              id="product-name"
              type="text"
              placeholder="z.B. BILLY Bücherregal"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-ikea-blue hover:bg-ikea-blue/90" 
            disabled={uploading || (!file && !productName)}
          >
            {uploading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white"></span>
                Wird verarbeitet...
              </>
            ) : (
              "Anleitung analysieren"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
