Overview of new UI additions (TravelRoutes, Reports, UI components)

Files added:

- `app/screens/TravelRoutes.tsx` — Travel route overview with safe vs risky route visualization and start navigation button (placeholder).
- `app/screens/Reports.tsx` — Crowd-sourced report form + lightweight map placeholder. Submits locally (no backend) and intended to be wired to a moderation API.
- `src/lib/weather.ts` — Lightweight placeholder helper for fetching/translating weather data. Replace with real API calls and key in production.
- `components/ui/ThemedButton.tsx` — Reusable button with primary/ghost/danger variants.
- `components/ui/SOSButton.tsx` — Animated SOS floating button used in the Home screen.
- `components/ui/SafetyCard.tsx` — Small card component for nearby safety zones and contacts.
- `components/ui/ProgressBar.tsx` — Minimal progress bar used for lightweight displays.

Navigation:
- `app/_layout.tsx` was updated to register `TravelRoutes` and `Reports` in the stack so they have proper headers.

How to test locally:
1. Start the project with `npm start` or `yarn start` (this is an Expo app).
2. From the running app, the splash screen will navigate to the Permissions screen.
3. Grant permissions (toggle both) to reach the tabbed interface and Home screen.
4. From any stack navigation UI, use the route `/screens/TravelRoutes` or `/screens/Reports` to open the new screens; the Travel Routes screen demonstrates route safety overlay, and Reports shows the report form and map placeholder.

Notes & next steps:
- The new screens contain placeholder data and UI only. Integrate real map routing, weather API (e.g., OpenWeatherMap), and a backend moderation/report ingestion endpoint to make crowd-sourcing functional.
- Consider adding unit tests for key components (SafetyCard, SOSButton) and a small E2E smoke test for navigation flows.
