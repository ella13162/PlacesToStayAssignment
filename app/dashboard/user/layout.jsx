import Link from "next/link";
import LogoutButton from "@/app/components/AuthComponents/LogoutButton";

export default function UserDashboardLayout({children}){
  return (
    <div className="p-2 bg-amber-100 min-h-screen relative">
      <div className="flex flex-col justify-center mt-8 gap-4">
        <p
          className="text-2xl text-center text-blue-700 bg-cyan-300 p-2 rounded-md"
        >
          Welcome to Places to Stay Website
        </p>
        <div className="flex gap-8 justify-center">
          <Link
            className="text-lg text-white bg-cyan-300 p-2 rounded-md hover:text-black"
            href={`/dashboard/user/`}
          >
            Search
          </Link>
          <Link
            className="text-lg text-white bg-cyan-300 p-2 rounded-md hover:text-black"
            href={`/dashboard/user/bookings`}
          >
            Previous Bookings
          </Link>
          <LogoutButton/>
        </div>
      </div>
      {children}
    </div>
  );
}
