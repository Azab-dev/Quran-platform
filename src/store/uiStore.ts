import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: typeof window !== 'undefined' 
    ? (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    : 'light',

  // Toggle sidebar
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Set sidebar open state
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Toggle theme
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      
      // Update HTML class
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    return { theme: newTheme };
  }),

  // Set theme
  setTheme: (theme) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      
      // Update HTML class
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    return { theme };
  }),
}));