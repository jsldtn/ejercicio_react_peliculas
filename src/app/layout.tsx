import { GuestSessionProvider } from "../providers/GuestSessionContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang = "en">
      <body className = "antialiased">
        <GuestSessionProvider>
          <main className = "p-6 mt-16">{children}</main>
        </GuestSessionProvider>
      </body>
    </html>
  );
}