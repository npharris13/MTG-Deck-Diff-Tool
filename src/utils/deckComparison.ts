import type { Deck } from './deckParser';

export interface ComparisonResult {
  toAdd: Deck;
  toRemove: Deck;
}

/**
 * Compares two decklists and returns what cards need to be added or removed
 */
export function compareDecklists(oldDeck: Deck, newDeck: Deck): ComparisonResult {
  const toAdd: Deck = {};
  const toRemove: Deck = {};
  
  // Get all unique card names from both decks
  const allCardNames = new Set([
    ...Object.keys(oldDeck),
    ...Object.keys(newDeck)
  ]);
  
  for (const cardName of allCardNames) {
    const oldQuantity = oldDeck[cardName] || 0;
    const newQuantity = newDeck[cardName] || 0;
    const difference = newQuantity - oldQuantity;
    
    if (difference > 0) {
      // Need to add cards
      toAdd[cardName] = difference;
    } else if (difference < 0) {
      // Need to remove cards
      toRemove[cardName] = Math.abs(difference);
    }
    // If difference === 0, no change needed
  }
  
  return { toAdd, toRemove };
}

/**
 * Formats a deck object into a sorted array of card entries
 */
export function formatDeckForDisplay(deck: Deck): Array<{ name: string; quantity: number }> {
  return Object.entries(deck)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Converts a card name to title case
 */
function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Formats a deck object into plain text format for copying
 */
export function formatDeckForCopy(deck: Deck): string {
  const sortedEntries = formatDeckForDisplay(deck);
  return sortedEntries
    .map(({ name, quantity }) => `${quantity} ${toTitleCase(name)}`)
    .join('\n');
} 