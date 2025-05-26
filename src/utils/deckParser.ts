export type Deck = { [cardName: string]: number };

/**
 * Parses a decklist text and returns a deck object
 * Supports formats: "4 Island", "1x Sol Ring", "Sol Ring x1", "Sol Ring"
 */
export function parseDeckList(deckText: string): Deck {
  const deck: Deck = {};
  
  if (!deckText.trim()) {
    return deck;
  }
  
  const lines = deckText.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) {
      continue;
    }
    
    // Try different regex patterns for different formats
    const patterns = [
      // "4 Island" or "4x Island"
      /^(\d+)x?\s+(.+)$/,
      // "Island x4"
      /^(.+)\s+x(\d+)$/,
      // Just card name (assume quantity 1)
      /^(.+)$/
    ];
    
    let matched = false;
    
    for (const pattern of patterns) {
      const match = trimmedLine.match(pattern);
      
      if (match) {
        let quantity: number;
        let cardName: string;
        
        if (pattern === patterns[0]) {
          // "4 Island" or "4x Island"
          quantity = parseInt(match[1], 10);
          cardName = match[2].trim();
        } else if (pattern === patterns[1]) {
          // "Island x4"
          cardName = match[1].trim();
          quantity = parseInt(match[2], 10);
        } else {
          // Just card name
          cardName = match[1].trim();
          quantity = 1;
        }
        
        // Normalize card name (case-insensitive)
        const normalizedCardName = cardName.toLowerCase();
        
        // Add to deck (accumulate if card already exists)
        if (deck[normalizedCardName]) {
          deck[normalizedCardName] += quantity;
        } else {
          deck[normalizedCardName] = quantity;
        }
        
        matched = true;
        break;
      }
    }
    
    // If no pattern matched, treat as card name with quantity 1
    if (!matched) {
      const normalizedCardName = trimmedLine.toLowerCase();
      if (deck[normalizedCardName]) {
        deck[normalizedCardName] += 1;
      } else {
        deck[normalizedCardName] = 1;
      }
    }
  }
  
  return deck;
}

/**
 * Counts the total number of cards in a decklist text
 */
export function countCardsInDeckText(deckText: string): number {
  const deck = parseDeckList(deckText);
  return Object.values(deck).reduce((total, quantity) => total + quantity, 0);
} 