import { useState } from 'react';
import type { Deck } from '../utils/deckParser';
import { formatDeckForDisplay, formatDeckForCopy } from '../utils/deckComparison';
import { copyToClipboard } from '../utils/clipboard';

interface ResultsTableProps {
  title: string;
  deck: Deck;
  emptyMessage: string;
}

export function ResultsTable({ title, deck, emptyMessage }: ResultsTableProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const cards = formatDeckForDisplay(deck);
  
  const handleCopy = async () => {
    const text = formatDeckForCopy(deck);
    const success = await copyToClipboard(text);
    
    setCopyStatus(success ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };
  
  if (cards.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-500 italic">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            copyStatus === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : copyStatus === 'error'
              ? 'bg-red-100 text-red-800 border border-red-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={copyStatus !== 'idle'}
        >
          {copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Failed' : 'Copy All'}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Quantity</th>
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Card Name</th>
            </tr>
          </thead>
          <tbody>
            {cards.map(({ name, quantity }, index) => (
              <tr key={name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-3 text-sm font-mono">{quantity}</td>
                <td className="py-2 px-3 text-sm capitalize">{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Total: {cards.reduce((sum, card) => sum + card.quantity, 0)} cards
      </div>
    </div>
  );
} 