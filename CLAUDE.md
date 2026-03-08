# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ulises Molina (Frontend Developer). Single-page application built with Next.js 15, written in Spanish (`lang="es"`).

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

No test framework is configured.

## Architecture

- **Framework:** Next.js 15 App Router with React 18, TypeScript
- **Styling:** Tailwind CSS with CSS variables for theming (HSL color system defined in `app/globals.css`)
- **UI Components:** shadcn/ui (Radix primitives + `components/ui/`). Add new components via `npx shadcn@latest add <component>`
- **Animations:** GSAP (ScrollTrigger for scroll-based animations) + Framer Motion (transitions, AnimatePresence)
- **Font:** Poppins (Google Fonts, loaded in layout via `next/font`)
- **Analytics:** Vercel Analytics + Google Tag Manager

### Key Files

- `app/page.tsx` — The entire portfolio content lives here as a single client component (`"use client"`). Contains hero, about, projects, and contact sections with section-based navigation
- `app/layout.tsx` — Root layout with font config, GTM scripts, Vercel Analytics
- `components/floating-lines.tsx` — Canvas-based animated wave background using GSAP
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Use `@/components`, `@/lib`, `@/hooks`.

### Build Config

ESLint and TypeScript errors are ignored during builds (`next.config.mjs`). Images are unoptimized (static export compatible).
