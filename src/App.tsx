import { useState } from 'react';
import { DeckInput } from './components/DeckInput';
import { ResultsTable } from './components/ResultsTable';
import { parseDeckList } from './utils/deckParser';
import { compareDecklists } from './utils/deckComparison';
import type { ComparisonResult } from './utils/deckComparison';

function App() {
  const [oldDeckText, setOldDeckText] = useState('');
  const [newDeckText, setNewDeckText] = useState('');
  const [results, setResults] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCompare = () => {
    // Clear previous error
    setError('');
    
    // Validate inputs
    if (!oldDeckText.trim() || !newDeckText.trim()) {
      setError('Please enter both old and new decklists before comparing.');
      return;
    }
    
    try {
      // Parse both decklists
      const oldDeck = parseDeckList(oldDeckText);
      const newDeck = parseDeckList(newDeckText);
      
      // Compare decklists
      const comparisonResult = compareDecklists(oldDeck, newDeck);
      setResults(comparisonResult);
    } catch (err) {
      setError('An error occurred while parsing the decklists. Please check the format and try again.');
      console.error('Deck comparison error:', err);
    }
  };

  const handleReset = () => {
    setOldDeckText('');
    setNewDeckText('');
    setResults(null);
    setError('');
  };

  const exampleFormat = `Example formats:
4 Island
1x Sol Ring
Lightning Bolt x3
Counterspell`;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MTG Deck Diff Tool
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare two Magic: The Gathering decklists to see exactly which cards you need to add or remove when updating your physical deck.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DeckInput
              label="Old Decklist"
              value={oldDeckText}
              onChange={setOldDeckText}
              placeholder={exampleFormat}
            />
            <DeckInput
              label="New Decklist"
              value={newDeckText}
              onChange={setNewDeckText}
              placeholder={exampleFormat}
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
              <div className="mt-2 text-xs text-red-600">
                <strong>Supported formats:</strong>
                <br />• 4 Island
                <br />• 1x Sol Ring  
                <br />• Lightning Bolt x3
                <br />• Counterspell (assumes quantity 1)
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCompare}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Compare Decks
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultsTable
              title="Cards to Add"
              deck={results.toAdd}
              emptyMessage="No cards need to be added."
            />
            <ResultsTable
              title="Cards to Remove"
              deck={results.toRemove}
              emptyMessage="No cards need to be removed."
            />
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Paste your decklists from Moxfield, Archidekt, or any plain text format.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
