# ⏱️ Cronómetro Pro

Un cronómetro web de alta precisión desarrollado con React, TypeScript y Zustand. Diseñado con un enfoque profesional en UX/UI y preparado para futuras extensiones como modo Pomodoro.

## ✨ Características

### 📊 **Dual Mode Timer**
- ⏱️ **Cronómetro ascendente** - Medición al milisegundo (0 → N)
- 🍅 **Temporizador Pomodoro descendente** - Técnica de productividad (N → 0)
- 🔄 **Cambio de modo dinámico** - Alterna entre cronómetro y Pomodoro

### ⏱️ **Cronómetro Profesional**
- **Cronómetro de alta precisión**: Medición en centésimas de segundo usando `performance.now()`
- **Control intuitivo**: Botones Start/Pause/Reset con feedback visual
- **Registro de vueltas**: Sistema completo de laps con análisis de rendimiento

### 🍅 **Pomodoro Timer MVP**
- ⏰ **Fases automáticas** - Trabajo (25min) → Descanso corto (5min) → Descanso largo (15min)
- 📊 **Progreso visual** - Círculo de progreso con colores por fase
- 🔢 **Contador de sesiones** - Seguimiento automático de sesiones completadas
- 🎯 **Auto-avance** - Transición automática entre fases al llegar a 0
- ⚙️ **Configuración personalizable** - Duración de fases ajustable
- 📈 **Historial de sesiones** - Registro de sesiones completadas

### 🎨 **Experiencia de Usuario**
- **Modo pantalla completa**: Interfaz minimalista que muestra solo el cronómetro
- **Persistencia**: Los laps se guardan automáticamente en localStorage
- **Atajos de teclado**: Control completo sin mouse
- **Diseño responsive**: Optimizado para desktop y móvil
- 🌙 **Temas diferenciados** - Azul para cronómetro, rojo para Pomodoro
- ♿ **Accesibilidad completa** - Compatible con lectores de pantalla

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
