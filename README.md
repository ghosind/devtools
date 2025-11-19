# DevTools

A collection of developer utilities built with Next.js.

## Quick start

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Build and run production:

```bash
npm run build
npm run start
```

You can set environment variables in `.env.local` (see below). On macOS zsh you can also use `export` for quick testing.

## Environment variables

- `NEXT_PUBLIC_GA_ID` — optional Google Analytics Measurement ID (e.g. `G-XXXXXXXXXX`). If unset, the GA script will not be injected.

Example `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Restart the dev server after changing environment variables.

## Adding a new tool

1. Add an entry in `src/constants/tools.ts`:

```ts
{
  key: 'mytool',
  title: 'Tools.MyTool.Name',
  description: 'Tools.MyTool.Description',
  href: '/tools/mytool'
}
```

2. Add localized strings in `src/translations/xx.json`.
3. Create the page under `src/app/tools/mytool/page.tsx`.

The sidebar will automatically pick up new tools from the constants list.

## License

The project is published under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for details.
