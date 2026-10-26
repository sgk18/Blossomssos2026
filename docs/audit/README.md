# Blossoms SOS — Codebase Audit & Reverse Engineering Report

## Executive Summary

This directory contains the complete architectural, performance, accessibility, content, asset, data, and migration audit of the **Blossoms SOS 2025** website codebase (`ChandraShekarA03/Blossoms-SOS-2025-coming-soon`). 

The audit was conducted strictly as an evidence-based discovery and reverse-engineering investigation without altering application code or dependencies.

### Key Discoveries at a Glance
- **Current Architecture**: Plain static HTML5, CSS3, and Vanilla JavaScript. There is **no build system, no package manager (`package.json`), and no framework** in active use.
- **Repository Size & Bloat**: The repository contains over **150 MB** of assets, including a **25 MB Sony RAW file (`CS.ARW`)**, two Apple HEIC files (`core.HEIC`, `core 2.HEIC`), several uncompressed 12–18 MB camera JPEG photos, and a **25.6 MB video** set to autoplay on loop.
- **Live Dynamic Data & Security Risk**: The winners page dynamically fetches data from a public Google Sheets GViz endpoint every 30 seconds via client-side polling. This sheet exposes **unredacted student personal phone numbers, register numbers, and class details** directly to the public web.
- **Content Fragmentation**: Event listings in the category flashcard pages (`event1.html` – `event5.html`) diverge from the event schedule (`schedule.html`) and the winners sheet; several events appear in the schedule and results but have no event page description.
- **Upcoming vs. Historical Distinction**: The existing site represents earlier editions (2024–2025) and School of Sciences' "Team Onyx". The upcoming edition has **no confirmed theme** yet (exploring AI, sustainability, science, arts), necessitating an architecture that cleanly isolates historical editions from current and future iterations.

---

## Audit Documentation Index

The audit has been organized into specialized, deeply researched reports:

| Document | Purpose & Scope |
| :--- | :--- |
| [**repository-inventory.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/repository-inventory.md) | Full audit of files, file tree, Git commit history, branches, build tooling, deployment configuration, and inspection coverage. |
| [**site-map-and-routes.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/site-map-and-routes.md) | Complete route inventory, sitemap diagram, navigation flows, external destinations, and page-by-page breakdown. |
| [**content-and-events-inventory.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/content-and-events-inventory.md) | Exhaustive inventory of all event categories, sub-events, rules, historical schedules, winners, and facts classified by status. |
| [**data-and-integrations.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/data-and-integrations.md) | Deep analysis of Google Sheets GViz integration, Google Forms, Canva links, CDNs, Vercel Web Analytics, and security risks. |
| [**asset-inventory.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/asset-inventory.md) | Catalog of all 54 image, video, document, and font assets with exact pixel dimensions, file sizes, usage, and disposition plans. |
| [**technical-audit.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/technical-audit.md) | Evidence-backed assessment of architecture, frontend performance, WCAG accessibility, responsive design, reliability, and security. |
| [**migration-blueprint.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/migration-blueprint.md) | Architectural roadmap for migrating to Next.js App Router (TypeScript, Tailwind, structured content model, pixel-art aesthetic). |
| [**open-questions.md**](file:///c:/projects/Blossoms-SOS-2025-coming-soon/docs/audit/open-questions.md) | Prioritized stakeholder questions regarding official themes, privacy consent, forms, domain routing, and feature priorities. |

---

## Methodology & Audit Standards

1. **Strict Non-Destructive Inspection**: No code was refactored, no packages were installed, no assets were modified or deleted.
2. **Deterministic Evidence**: Every finding references concrete repository paths, function names, line numbers, or live HTTP responses.
3. **Data Fact Classification**: All discovered information has been categorized into `historical`, `confirmed`, `draft`, `archived`, or `unknown` to prevent accidental conflation of past event data with future editions.
