

# Oporto Travel Guide - Plan de Implementación

## Visión
App móvil (PWA) para gestionar un viaje a Oporto del 18-22 de marzo. Guía visual e interactiva con planificador diario, mapa y seguimiento de lugares visitados. Todo local, offline-first.

## Diseño
- **Mobile-first** con bottom navigation bar (Inicio, Itinerario, Mapa)
- **Paleta**: Azul Azulejo (#0B4C86) como primario, blanco/gris claro de fondo, Terracota (#CC5500) como acento
- Tarjetas visuales con imágenes, bordes redondeados, diseño limpio y moderno
- Tipografía sans-serif (Inter)

## Estructura de Páginas

### 1. Inicio (Dashboard)
- Título "Tu viaje a Oporto" con fechas 18-22 marzo
- Barra de progreso: X/Y lugares visitados
- Tarjeta "Siguiente plan" con acceso rápido al día actual
- Resumen visual del viaje

### 2. Itinerario
- Pestañas por día (18, 19, 20, 21, 22 de marzo)
- Cada día muestra tarjetas de lugares asignados con imagen, nombre, descripción, categoría (badge de color)
- Checkbox para marcar como "Visitado" en cada tarjeta
- Estado persistido en localStorage

### 3. Mapa
- Mapa interactivo con react-leaflet + OpenStreetMap (sin API keys)
- Pines de colores por categoría: Azul (Ver), Naranja (Hacer), Terracota (Comer)
- Popup al tocar un pin con nombre y descripción
- Centrado en Oporto

## Datos Pre-cargados
- **Ver**: Ribeira, Puente Luis I, Estación São Bento, Librería Lello, Torre dos Clérigos
- **Hacer**: Crucero 6 puentes, Cata en Bodegas de Gaia, Atardecer en Jardim do Morro
- **Comer**: Francesinha (Café Santiago), Pastéis de Nata (Manteigaria), Bacalhau à Brás

Los lugares se distribuirán entre los 5 días del itinerario con un plan lógico de recorrido.

## Gestión de Estado
- localStorage para persistir lugares visitados
- React Context para estado global de la app
- Sin backend, todo local y offline

## Dependencias Nuevas
- `react-leaflet` + `leaflet` para el mapa interactivo
- `zustand` o React Context para estado (usaremos Context para mantenerlo ligero)

## PWA
- Configuración con vite-plugin-pwa para instalación desde el navegador y funcionamiento offline

