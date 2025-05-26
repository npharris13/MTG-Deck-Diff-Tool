

import { countCardsInDeckText } from '../utils/deckParser';

interface DeckInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DeckInput({ label, value, onChange, placeholder }: DeckInputProps) {
  const cardCount = countCardsInDeckText(value);
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        rows={12}
      />
      <div className="text-xs text-gray-500">
        {cardCount === 0 ? 'No cards' : `${cardCount} card${cardCount === 1 ? '' : 's'}`}
      </div>
    </div>
  );
} 