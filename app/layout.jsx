import "@/app/assets/globals.css";

export const metadata = {
  title: "PlacesToStay",
  description: "Search for comfortable accommodations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
