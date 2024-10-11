import "@/app/assets/globals.css";

export const metadata = {
  title: "PlacesToStay",
  description: "Search for comfortable accommodations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">PlacesToStay</div>
            <ul className="flex space-x-4">
              <li><a href="/" className="text-white hover:underline">Home</a></li>
              <li><a href="/search" className="text-white hover:underline">Search</a></li>
              <li><a href="/login" className="text-white hover:underline">Login</a></li>
              <li><a href="/dashboard" className="text-white hover:underline">Dashboard</a></li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}

