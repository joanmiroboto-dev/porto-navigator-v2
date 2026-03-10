import { useState } from 'react';
import { useTrip } from '@/context/TripContext';
import { PLACES, DAY_PLANS } from '@/data/places';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Copy, Download, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export function ShareItinerary() {
  const { visitedPlaces } = useTrip();
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const visitedList = Array.from(visitedPlaces)
      .map((id) => {
        const place = PLACES.find((p) => p.id === id);
        return place ? `✓ ${place.name}` : '';
      })
      .filter(Boolean)
      .join('\n');

    const uniquePlaceIds = new Set(DAY_PLANS.flatMap((d) => d.places));
    const totalPlaces = uniquePlaceIds.size;
    const visitedCount = Array.from(visitedPlaces).filter((id) =>
      uniquePlaceIds.has(id)
    ).length;

    return `🗺️ Mi viaje a Oporto - Porto Navigator

📊 Progreso: ${visitedCount}/${totalPlaces} lugares visitados

🎯 Lugares visitados:
${visitedList || 'Aún no has visitado lugares'}

🔗 Descubre más en Porto Navigator
`;
  };

  const generateCSV = () => {
    const headers = ['Lugar', 'Categoría', 'Visitado', 'Descripción'];
    const rows = PLACES.map((place) => [
      place.name,
      place.category,
      visitedPlaces.has(place.id) ? 'Sí' : 'No',
      place.description,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    return csv;
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      toast.success('Copiado al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Error al copiar');
    }
  };

  const handleDownloadCSV = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'porto-navigator-itinerario.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Itinerario descargado');
  };

  const handleShareViaEmail = () => {
    const subject = encodeURIComponent('Mi viaje a Oporto - Porto Navigator');
    const body = encodeURIComponent(generateShareText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          <span className="hidden min-[380px]:inline">Compartir</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir Itinerario</DialogTitle>
          <DialogDescription>
            Comparte tu viaje a Oporto con amigos y familia
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Texto</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-3">
            <div className="bg-muted p-3 rounded-lg max-h-[200px] overflow-y-auto">
              <p className="text-xs whitespace-pre-wrap text-foreground font-mono">
                {generateShareText()}
              </p>
            </div>
            <Button
              onClick={handleCopyToClipboard}
              className="w-full gap-2"
              variant={copied ? 'default' : 'outline'}
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copiado' : 'Copiar al portapapeles'}
            </Button>
          </TabsContent>

          <TabsContent value="csv" className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Descarga tu itinerario en formato CSV para usar en Excel o Google Sheets
            </p>
            <Button onClick={handleDownloadCSV} className="w-full gap-2">
              <Download className="h-4 w-4" />
              Descargar CSV
            </Button>
          </TabsContent>

          <TabsContent value="email" className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Envía tu itinerario por correo electrónico
            </p>
            <Button onClick={handleShareViaEmail} className="w-full gap-2">
              <Mail className="h-4 w-4" />
              Enviar por Email
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
