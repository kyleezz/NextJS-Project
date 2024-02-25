"use client"

import {Inter as FontSans} from "next/font/google"
import localFont from "next/font/local"
import {Provider} from 'jotai'

import "@/styles/globals.css"
import {cn} from "@/lib/utils"
import {Toaster} from "@/components/ui/toaster"
import {TailwindIndicator} from "@/components/tailwind-indicator"
import {ThemeProvider} from "@/components/theme-provider"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TooltipProvider} from "@radix-ui/react-tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()
export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
          <meta name="referrer" content="no-referrer" />
      </head>
      <body
          className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontHeading.variable
          )}
      >
      <Provider>
          <QueryClientProvider client={queryClient}>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                  <TooltipProvider
                      disableHoverableContent
                      delayDuration={500}
                      skipDelayDuration={0}
                  >
                      {children}
                      <Toaster />
                      <TailwindIndicator />
                  </TooltipProvider>
              </ThemeProvider>
          </QueryClientProvider>
      </Provider>
      </body>
      </html>
  )
}
