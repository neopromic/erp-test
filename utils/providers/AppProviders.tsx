import { ThemeProvider } from "@/components/ThemeProvider"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      disableTransitionOnChange
      storageKey="infinity-saas-theme"
      attribute="class"
      enableSystem
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  ) 
} 