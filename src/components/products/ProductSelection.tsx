
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock-Produktdaten
const MOCK_PRODUCTS = [
  { id: 1, name: "BILLY Bücherregal", difficulty: "Einfach", time: "30 min", image: "https://placehold.co/300x200/f2e8dc/a67c52?text=BILLY" },
  { id: 2, name: "MALM Kommode", difficulty: "Mittel", time: "45 min", image: "https://placehold.co/300x200/f2e8dc/a67c52?text=MALM" },
  { id: 3, name: "PAX Kleiderschrank", difficulty: "Schwer", time: "90 min", image: "https://placehold.co/300x200/f2e8dc/a67c52?text=PAX" },
  { id: 4, name: "KALLAX Regal", difficulty: "Einfach", time: "25 min", image: "https://placehold.co/300x200/f2e8dc/a67c52?text=KALLAX" }
];

const ProductSelection = ({ onProductSelect }: { onProductSelect: () => void }) => {
  const [loading, setLoading] = useState<number | null>(null);

  const handleProductSelect = (id: number) => {
    setLoading(id);
    
    // Simuliere das Laden des Produkts
    setTimeout(() => {
      setLoading(null);
      toast.success(`${MOCK_PRODUCTS.find(p => p.id === id)?.name} ausgewählt!`);
      onProductSelect();
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beliebte Produkte</CardTitle>
        <CardDescription>
          Wählen Sie ein Produkt aus unserer Bibliothek aus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{product.difficulty}</span>
                  <span>{product.time}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => handleProductSelect(product.id)}
                  disabled={loading === product.id}
                >
                  {loading === product.id ? (
                    <>
                      <span className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Laden...
                    </>
                  ) : (
                    "Auswählen"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSelection;
