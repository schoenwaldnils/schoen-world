import Script from 'next/script'

// On page load or when changing themes, best to add inline in head to avoid FOUC
export const ThemeInitializer = () => (
  <Script id="theme-initializer" strategy="beforeInteractive">
    {`
      const theme = localStorage.theme
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme)
      }
    `}
  </Script>
)
