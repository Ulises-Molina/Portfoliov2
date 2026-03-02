# AGENTS.md - Repository Guide for Agentic Coding

## Overview
This is a Next.js 14 project using TypeScript, Tailwind CSS v4, and shadcn/ui components. The codebase follows modern React patterns with strict TypeScript configuration.

## Build/Test/Lint Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code (ESLint)
npm run lint
```

### Testing
This project currently does not have test files configured. When adding tests:
- Check for test framework in package.json (none currently)
- Use standard patterns if adding Jest/Vitest/Testing Library
- Run individual tests with framework-specific commands once configured

## Code Style Guidelines

### Imports
- Use ES6 import/export syntax
- Import React types separately: `import type React from "react"`
- Import third-party libraries first, then local imports
- Use path aliases defined in tsconfig.json:
  - `@/*` → `./`
  - `@/components/*` → `./components/*`
  - `@/lib/*` → `./lib/*`
  - `@/hooks/*` → `./hooks/*`
  - `@/utils` → `./lib/utils`

```typescript
// Correct import order
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### File Structure
- **app/** - Next.js App Router pages and layouts
- **components/** - Reusable React components
  - **ui/** - shadcn/ui components
- **lib/** - Utility functions and configurations
- **hooks/** - Custom React hooks
- **public/** - Static assets
- **styles/** - Global CSS files

### Component Patterns

#### Functional Components
- Use TypeScript interfaces for props
- Default export for main components
- Use forwardRef when needed
- Prefer function declarations over arrow functions for components

```typescript
interface ButtonProps {
  variant: 'default' | 'destructive'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

function Button({ variant, size, children }: ButtonProps) {
  return <button className={cn(variant, size)}>{children}</button>
}

export default Button
```

#### Custom Hooks
- Prefix with "use" and camelCase
- Return tuple or object based on usage
- Use proper TypeScript typing

```typescript
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  // Hook logic
  return isMobile
}
```

### TypeScript Configuration
- Strict mode enabled
- ES6 target
- Use `type` imports for types only
- Proper interface definitions for component props
- Avoid `any` type - use unknown or proper typing

### CSS & Styling
- Use Tailwind CSS for all styling
- Leverage `cn()` utility from `@/lib/utils` for class merging
- Follow shadcn/ui component patterns
- Use CSS variables for theming
- Responsive design with mobile-first approach

### Error Handling
- Use try-catch blocks for async operations
- Implement proper error boundaries for React components
- Return user-friendly error messages
- Log errors appropriately without exposing sensitive data

### Naming Conventions
- **Files**: kebab-case for most files (e.g., `hero-section.tsx`)
- **Components**: PascalCase (e.g., `HeroSection`)
- **Functions/Variables**: camelCase (e.g., `handleClick`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserData`, `ButtonProps`)

### UI Components (shadcn/ui)
- All UI components are in `components/ui/`
- Follow the established patterns from existing components
- Use class-variance-authority (CVA) for variant styling
- Implement proper accessibility features
- Use Radix UI primitives as base

### State Management
- Use React hooks for local state
- Prefer `useState` for simple state
- Use `useReducer` for complex state logic
- Consider Context API for global state when needed
- No external state management library currently configured

### Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Lazy load components when appropriate
- Optimize images and assets

### Development Workflow
- Run `npm run lint` before commits
- TypeScript errors are ignored in build (see next.config.mjs), but fix them during development
- Use the shadcn/ui CLI for adding new UI components
- Follow the existing component patterns when creating new ones

### Git Configuration
- This repository is not currently a git repository
- Initialize with `git init` when ready for version control
- When ready to commit changes, run:
  ```bash
  git add .
  git commit -m "Initial commit with AGENTS.md documentation"
  ```

### Environment Variables
- Use `.env.local` for local development
- Prefix with NEXT_PUBLIC_ for client-side variables
- Server-side variables don't need prefix

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels when needed
- Ensure keyboard navigation support
- Test with screen readers

### Security
- Never expose secrets in client-side code
- Validate user inputs
- Use HTTPS in production
- Implement proper authentication patterns

### Browser Support
- Modern browsers (ES6+)
- Use appropriate polyfills if needed
- Test across major browsers

### Key Dependencies
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS v4
- shadcn/ui components
- Radix UI primitives
- Lucide React icons
- React Hook Form
- Zod for validation

# POS MVP — Contexto del proyecto (Argentina)

Este repo implementa **POS MVP**, un SaaS **mobile-first** para kioscos/almacenes enfocado en **control de stock + registro simple de ventas (sin POS completo)**. El objetivo es que el usuario pueda: **cargar productos**, **registrar ventas en segundos**, **ver qué reponer**, y **consultar métricas básicas**.

## Objetivo del MVP (prioridad)
1. **Productos** (CRUD + stock mínimo + activo/inactivo)
2. **Ventas rápidas** (2 clicks: buscar → +1/+N → confirmar)
3. **Descuento de stock automático** (consistente y auditable)
4. **Reposición** (lista stock <= mínimo + ingreso mercadería)
5. **Dashboard** (ventas día/mes + top productos + alertas)
6. **Cierre de caja** (resumen del día)
7. **Historial/Auditoría** (movimientos y acciones)

> No construir facturación AFIP, cajas avanzadas ni integraciones externas en MVP.

---

# Stack
- Frontend: **React** + **Tailwind** + **shadcn/ui**
- Backend: **Supabase** (Auth + Postgres + RLS)

---

# Reglas de seguridad (NO romper nada)
## 1) No tocar producción
- No modificar variables, URLs, keys o settings de entornos reales sin instrucción explícita.
- Si hay `.env.example`, copiarlo y documentar cambios. **Nunca** commitear `.env`.

## 2) Migraciones siempre versionadas
- Cambios en DB: solo mediante **migraciones** (SQL) en carpeta de migrations del proyecto.
- Prohibido “editar a mano” tablas en Supabase sin reflejarlo en migración.
- Cada migración debe ser **idempotente** cuando aplique (IF EXISTS / IF NOT EXISTS) y tener rollback si el proyecto lo usa.

## 3) RLS obligatorio desde el día 1
- Todas las tablas que contengan datos de negocio deben tener `store_id`.
- RLS debe estar **activado** y con policies mínimas:
  - Usuario solo ve/edita registros de su `store_id` (owner).
- Si algo requiere bypass, usar **RPC/funciones** controladas (no abrir policies).

## 4) Stock = fuente de verdad y auditoría
- No permitir “magia” en frontend que deje inconsistencias.
- Toda modificación de stock debe generar un registro en `stock_movements` con:
  - `type` (sale/restock/adjustment)
  - `qty_delta`
  - `reason` (si adjustment)
  - `user_id`
- Evitar actualizar stock directamente desde UI sin pasar por:
  - RPC en Supabase o lógica server-side (preferible)
- Debe existir una forma de **deshacer última venta** (revirtiendo movimientos).

## 5) UX: rápido y simple
- Priorizar flujo “Nueva venta” (búsqueda grande + carrito + confirmar).
- Mobile-first: bottom nav en mobile; sidebar en desktop.
- Evitar pantallas complejas. Menos clicks > más features.

---

# Diseño / UI
Estilo moderno, sobrio, minimalista (no chillón). Mucho espacio en blanco, cards limpias, estados con badges.

## Paleta (tokens)
- primary: `#1E40AF`
- success: `#15803D`
- warning: `#D97706`
- danger: `#B91C1C`
- bg: `#F8FAFC`
- surface: `#FFFFFF`
- border: `#E5E7EB`
- text: `#0F172A`
- muted: `#475569`

Regla: **colores de estado solo para estados** (no decorar por decorar).

---

# Modelo de datos (MVP)
- `stores` (negocio)
- `products` (incluye stock_qty, min_stock_qty, is_active)
- `sales` + `sale_items`
- `stock_movements` (auditoría del stock)

> Si se agrega `customers` o `suppliers` en MVP: mantenerlo simple (nombre + email) y siempre asociado a `store_id`.

---

# Rutas/pantallas (MVP)
- /login, /register
- /dashboard
- /products
- /sales, /sales/new
- /restock
- /cash-close
- /customers (simple)
- /suppliers (simple)
- /history (activity log)
- /profile

---

# Criterios de aceptación (antes de merge)
- Compila y corre sin errores.
- No se rompen rutas existentes.
- RLS activo + policies correctas.
- Registrar venta y reposición actualiza stock y deja trazabilidad en `stock_movements`.
- UI consistente con la paleta y shadcn/ui.
- No se exponen keys/secretos en commits.


## Interacción con Supabase

Toda interacción con la base de datos debe realizarse exclusivamente siguiendo las reglas y funciones documentadas en `skills/skills.md`.

Ese archivo es la **fuente de verdad** para:
- tablas accesibles desde el frontend
- RPCs permitidas
- operaciones prohibidas


## Fuente de verdad para la DB

- `AGENTS.md` define reglas del proyecto y del producto.
- `skills/skills.md` define el **contrato Frontend ↔ Supabase**.

Si hay contradicción:
👉 **skills.md tiene prioridad para cualquier operación de base de datos.**

⚠️ IMPORTANTE:
El frontend NO debe:
- modificar stock directamente
- insertar ventas manualmente
- modificar suscripciones

Toda lógica crítica vive en Supabase (RPC + RLS).