import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripProvider } from "@/context/TripContext";
import { BottomNav } from "@/components/BottomNav";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import Index from "./pages/Index";
import Itinerary from "./pages/Itinerary";
import MapView from "./pages/MapView";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TripProvider>
        <OfflineIndicator />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/itinerario" element={<Itinerary />} />
            <Route path="/mapa" element={<MapView />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </TripProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
