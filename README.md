# 🌅 Daybreak Diner
> *A Cozy Pixel Art Breakfast Shop & Management Game*

---

## 📌 Project Overview

| Property | Description |
| :--- | :--- |
| **Application Type** | 2D Pixel Art Single-Player Simulation Game (Built with HTML5 / Phaser 3) |
| **Visual Style** | Stardew Valley aesthetic, warm retro pixel palette, indoor isometric cutaway floor plan, clean dark pixel borders |
| **Execution Environment** | Pure frontend single-file (`index.html`), no backend configuration required, runs directly in any modern browser |
| **Team Collaboration** | 📊 Track weekly task status, deadlines, and deliverables via the [Team Scrum Board](https://github.com/sd5913/KFC-V50) |

---

## 🎯 Target Users & Purpose

* **Target Users**:
  * **Casual Gamers**: Players who enjoy slow-paced, cozy, healing simulation management games.
  * **Design & Interactive Reviewers**: Instructors and evaluators looking to experience multimedia pixel aesthetics, UI micro-interactions, and lightweight productivity loops.
* **Main Purpose**:
  * To provide users with a relaxing and stress-relieving virtual Hong Kong breakfast shop management environment.
  * To explore the lightweight interactive application of *"Resource Supply & Demand Balance"* and *"NPC Mood Feedback Mechanisms"* in casual games.

---

## ⚙️ Core Interactive Mechanics

1. **Animal Suppliers**:
   * Features three adorable animal commuter workers: **Chicken** (supplies fresh eggs), **Shrimp** (supplies prawn ingredients), and **Cow** (supplies fresh milk).
2. **Dynamic Mood Feedback System (Mood Value: 0–100)**:
   * Continuous high-intensity work drains animal morale. Mood levels directly impact ingredient freshness and product quality:
     * **Mood $\ge$ 70**: Fresh ingredients, high customer satisfaction, generous tips, and positive reviews.
     * **30 $\le$ Mood < 70**: Standard ingredients, normal profits.
     * **Mood < 30**: Low-quality ingredients, leading to lower customer satisfaction and negative reviews.
   * Players can click on animals and spend coins to buy afternoon tea treats to restore their mood.
3. **Global Breakfast Menu**:
   * Includes: **Rice Rolls (肠粉)** (Eggs), **Shrimp Dumplings (虾饺)** (Shrimp), **Hong Kong Style Milk Tea (港式奶茶)** (Fresh Milk), **Vietnamese Bánh Mì (越南法包)** (Eggs), and **Nasi Lemak (椰浆饭)** (Fresh Milk).
4. **Interactive Cooking Minigames**:
   * Clicking a menu item triggers a quick interactive mini-task (e.g., spreading rice batter, pinching dumpling pleats, pulling milk tea, assembling sandwiches). Perfect cooking grants extra tips and praise.
5. **Morning Rush Hour Challenge**:
   * During the peak hours of 7:00–9:00 AM, human commuter customers spawn much faster, testing the player's multi-tasking and resource management skills under time pressure.

---

## 🎨 Multimedia & Visual Elements

| Media Type | Implementation & Design Highlights |
| :--- | :--- |
| **Visual Art** | 16-bit Stardew Valley warm pixel style; indoor isometric cutaway layout clearly showcasing the kitchen counter, dining area, and right-side animal eco-pen. *(Custom assets ready to be replaced with Jimeng AI outputs)* |
| **Audio Design** | Native Web Audio API procedural generation for soothing background melodies and interactive click feedback without loading delays. |
| **Dynamic UI & FX** | Warm retro wooden pixel UI panels, floating healing heart particles, real-time coin counters, and review pop-up speech bubbles. |

---

## 📅 Iteration Plan & Development Milestones

| Stage | Timeline | Core Deliverables |
| :--- | :--- | :--- |
| **Phase 1 (Prototyping)** | Weeks 1–2 | Complete indoor isometric layout framework, Phaser 3 render loop, and core pointing/clicking interactions. |
| **Phase 2 (Mechanics)** | Weeks 3–4 | Implement animal mood systems, global breakfast menu logic, and morning rush hour time progression. |
| **Phase 3 (Polishing)** | Weeks 5–6 | Integrate interactive cooking minigames, refine pixel UI textures, and conduct early user testing with advisors. |
| **Phase 4 (Delivery)** | Week 7 | Finalize documentation, package single-file source code, and release project. |

---
*© 2026 Daybreak Diner Team. All rights reserved.*
