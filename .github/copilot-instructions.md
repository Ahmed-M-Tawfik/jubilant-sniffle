# Copilot Instructions for jubilant-sniffle

## Project Overview

- This is a browser-based TypeScript Pong game using a canonical Entity-Component-System (ECS) pattern and Matter.js for physics.
- The codebase is organized under `src/ts/` with clear separation between entities, components, systems, UI, and utility code.
- The main entry point is likely `src/ts/Main.ts`.

## Key Architectural Patterns

- **ECS Structure:**
  - `entities/`: Core game objects (e.g., `Ball.ts`, `Paddle.ts`, `Board.ts`).
  - `entities/components/`: Attach behaviors/data to entities (e.g., `PhysicsComponent.ts`, `SpriteComponent.ts`).
  - `systems/`: Operate on entities with specific components (e.g., `PhysicsSystem.ts`, `PlayerInteractionSystem.ts`).
  - `session/`, `states/`: Manage game state and session flow.
- **UI Layer:**
  - `ui/screens/`: Different game screens (main menu, game, end game, etc.).
  - `ui/buttons/`: UI button logic.
  - `ui/KeyBindings.ts`, `ui/InputHandler.ts`: Input abstraction and key mapping.
- **Config/Data:**
  - `data/`: Game configuration and key bindings.

## Developer Workflows

- **Install dependencies:** `npm install`
- **Run in development:** `npm run dev` (serves via Vite, open in browser)
- **Build for production:** `npm run build`
- No explicit test or lint scripts are present; add as needed.

## Project-Specific Conventions

- **TypeScript-first:** All logic is in `.ts` files; no JavaScript in `src/ts/`.
- **Component Naming:**
  - Components end with `Component.ts`.
  - Systems end with `System.ts`.
  - Screens end with `Screen.ts`.
- **Data/config separation:** Game config and key bindings are in `data/`.
- **UI logic is decoupled from game logic** via ECS and screen classes.

## Integration Points

- **Vite** is used for development/build (see `package.json`).
- No backend or network integration; all logic is client-side.
- No external game engine; ECS is implemented in-project.

## Examples

- To add a new power-up: create a new component in `entities/components/`, update relevant systems, and add UI if needed.
- To change key bindings: edit `data/KeyBindingsData.ts` and update `ui/KeyBindings.ts` if logic changes.

## References

- Main entry: `src/ts/Main.ts`
- ECS core: `entities/`, `entities/components/`, `systems/`
- UI: `ui/screens/`, `ui/buttons/`, `ui/KeyBindings.ts`
- Config: `data/`

---

For more details, see `README.md`.
