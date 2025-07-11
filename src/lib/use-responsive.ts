import { useEffect, useState } from 'react';

// Define breakpoints matching Tailwind CSS defaults
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Hook to detect current screen size
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

// Hook to get current breakpoint
export function useBreakpoint(): Breakpoint | null {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint(null); // xs (no explicit xs breakpoint)
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

// Utility functions
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
};

// Responsive utilities for conditional rendering
export const useIsMobile = () => useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`);
export const useIsTablet = () => useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

// Get responsive value based on breakpoint
export function getResponsiveValue<T>(
  values: Partial<Record<Breakpoint | 'base', T>>,
  currentBreakpoint: Breakpoint | null
): T | undefined {
  if (currentBreakpoint && values[currentBreakpoint] !== undefined) {
    return values[currentBreakpoint];
  }
  
  // Fallback logic
  const orderedBreakpoints: (Breakpoint | 'base')[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'base'];
  
  for (const bp of orderedBreakpoints) {
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  return undefined;
}
