/**
 * Utility functions for managing personal themes
 */

// Define theme color mappings
export const themeColors: Record<string, { primary: string, secondary: string, accent: string }> = {
  default: {
    primary: '160 84% 39%', // emerald-500
    secondary: '210 40% 96.1%', // gray-100
    accent: '160 70% 95%' // emerald-50
  },
  dark: {
    primary: '160 72% 45%', // emerald-600
    secondary: '217.2 32.6% 17.5%', // gray-800
    accent: '160 60% 15%' // emerald-900
  },
  ocean: {
    primary: '201 96% 32%', // sky-600
    secondary: '201 97% 94%', // sky-50
    accent: '201 91% 90%' // sky-100
  },
  sunset: {
    primary: '24 92% 51%', // orange-500
    secondary: '24 94% 96%', // orange-50
    accent: '24 90% 86%' // orange-100
  },
  forest: {
    primary: '141 72% 42%', // green-600
    secondary: '141 78% 96%', // green-50
    accent: '141 70% 88%' // green-100
  },
  lavender: {
    primary: '252 72% 60%', // violet-500
    secondary: '252 82% 97%', // violet-50
    accent: '252 75% 92%' // violet-100
  }
};

// Apply theme to document root
export const applyTheme = (themeId: string) => {
  const root = document.documentElement;
  const selectedTheme = themeColors[themeId] || themeColors.default;

  // Apply CSS variables
  root.style.setProperty('--theme-primary', selectedTheme.primary);
  root.style.setProperty('--theme-secondary', selectedTheme.secondary);
  root.style.setProperty('--theme-accent', selectedTheme.accent);
  
  // Also update the main primary color to match the theme
  root.style.setProperty('--primary', selectedTheme.primary);
  root.style.setProperty('--secondary', selectedTheme.secondary);
  root.style.setProperty('--accent', selectedTheme.accent);
  root.style.setProperty('--ring', selectedTheme.primary);
};

// Get current theme from localStorage
export const getCurrentTheme = (): string => {
  return localStorage.getItem('kerja_user_theme') || 'default';
};

// Set theme and save to localStorage
export const setTheme = (themeId: string) => {
  localStorage.setItem('kerja_user_theme', themeId);
  applyTheme(themeId);
};