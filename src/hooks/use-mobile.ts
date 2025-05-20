
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Update the state with the current value
    setMatches(mediaQuery.matches);
    
    // Create an event listener
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    // Add the callback as a listener
    mediaQuery.addEventListener('change', handler);
    
    // Remove the listener when component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
