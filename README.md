# PromptLens

A small Angular 17 + TypeScript tool that scores an AI prompt out of 100 using five plain rules and shows a tip for each missing one.

## Run it
```
npm install      # do this first, otherwise VS Code shows red errors
npm start        # opens http://localhost:4200
npm test         # Karma + Jasmine unit tests (needs Chrome)
```

## Where things are
- `src/app/scorePrompt.ts`        the rules and the scoring (plain TypeScript, no Angular)
- `src/app/scorePrompt.spec.ts`   Jasmine unit tests
- `src/app/app.component.ts`      one signal for the text, one computed result
- `src/app/app.component.html`    the screen, using @for and @if
