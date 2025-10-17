# ⏱️ Cronómetro Pro

Un cronómetro web de alta precisión desarrollado con React, TypeScript y Zustand. Diseñado con un enfoque profesional en UX/UI y preparado para futuras extensiones como modo Pomodoro.

## ✨ Características

### Funcionalidades Principales
- **Cronómetro de alta precisión**: Medición en centésimas de segundo usando `performance.now()`
- **Control intuitivo**: Botones Start/Pause/Reset con feedback visual
- **Registro de vueltas**: Sistema completo de laps con análisis de rendimiento
- **Modo pantalla completa**: Interfaz minimalista que muestra solo el cronómetro
- **Persistencia**: Los laps se guardan automáticamente en localStorage
- **Atajos de teclado**: Control completo sin mouse
- **Diseño responsive**: Optimizado para desktop y móvil

### Características Técnicas
- **Gestión de estado**: Zustand para un estado predecible y eficiente
- **Tipado fuerte**: TypeScript para mayor robustez
- **Testing**: Suite completa de tests con Vitest
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Rendimiento**: Optimizado para 60fps sin bloqueos

## 🚀 Tecnologías

- **Frontend**: React 19 + TypeScript
- **Estado**: Zustand con persistencia
- **Validación**: Zod para type-safe data
- **Bundler**: Vite para desarrollo rápido
- **Testing**: Vitest + React Testing Library
- **Estilos**: CSS moderno con variables y grid/flexbox

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd timer

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests
npm run test

# Build para producción
npm run build
```

## 🎮 Uso

### Controles del Cronómetro
- **Iniciar/Pausar**: Click en el botón principal o presiona `Espacio`
- **Reiniciar**: Click en "Reiniciar" o presiona `Ctrl+R`
- **Registrar vuelta**: Click en "Vuelta" o presiona `L` (solo cuando está corriendo)
- **Pantalla completa**: Click en el botón superior derecho o presiona ``F`

### Análisis de Vueltas
- **Vuelta más rápida**: Destacada en verde
- **Vuelta más lenta**: Destacada en rojo
- **Tiempo de vuelta**: Tiempo transcurrido desde la vuelta anterior
- **Tiempo total**: Tiempo acumulado hasta esa vuelta

## 🏗️ Arquitectura

### Estructura del Proyecto
