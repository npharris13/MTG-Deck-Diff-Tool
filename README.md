# MTG Deck Diff Tool

A web-based application that allows Magic: The Gathering players to compare two decklists and quickly identify which cards need to be added or removed when updating their physical decks.

## Features

- **Multiple Format Support**: Handles various decklist formats including:
  - `4 Island`
  - `1x Sol Ring`
  - `Lightning Bolt x3`
  - `Counterspell` (assumes quantity 1)

- **Smart Comparison**: Accurately identifies:
  - Cards to add (new cards or increased quantities)
  - Cards to remove (removed cards or decreased quantities)

- **Copy Functionality**: One-click copying of results in plain text format

- **Responsive Design**: Works seamlessly on desktop and mobile devices

- **Privacy-First**: All processing happens in your browser - no data is sent to any server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mtg-deck-diff-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Usage

1. **Paste your old decklist** in the first text area
2. **Paste your new decklist** in the second text area
3. **Click "Compare Decks"** to see the differences
4. **Use the "Copy All" buttons** to copy the results to your clipboard

### Supported Decklist Sources

The tool works with exports from popular deckbuilding sites:
- Moxfield
- Archidekt
- EDHRec
- Any plain text format

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Hosting**: Static site (can be deployed to Vercel, Netlify, GitHub Pages)

## Project Structure

```
src/
├── components/          # React components
│   ├── DeckInput.tsx   # Deck input textarea component
│   └── ResultsTable.tsx # Results display component
├── utils/              # Utility functions
│   ├── deckParser.ts   # Deck parsing logic
│   ├── deckComparison.ts # Deck comparison logic
│   └── clipboard.ts    # Clipboard functionality
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built for the Magic: The Gathering community
- Inspired by the need for better deck management tools
- Special thanks to all MTG players who provided feedback and testing
