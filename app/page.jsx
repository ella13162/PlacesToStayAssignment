import Link from "next/link";
import SignUpForm from "@/app/components/AuthComponents/SignUpForm";

export default function HomePage() {
  return (
    <div className="flex">
      <div className="w-[50%] bg-gray-200 min-h-screen">
        <div
          className="p-2 flex flex-col gap-8 justify-center my-auto mt-24 bg-white mx-24 shadow-md rounded-md"
        >
          <p className="text-center text-2xl font-bold mb-4">SignUP</p>
          <SignUpForm/>
          <p className="text-sm mb-8 text-center">
            Already have an account? Try to <Link href={`/login`} className="text-blue-600">Login</Link>.
          </p>
        </div>
      </div>
      <div className="w-[50%] min-h-screen bg-amber-100 flex flex-col justify-center">
        <p
          className="text-3xl font-bold text-center bg-amber-200 mx-auto p-48"
        >
          Places To Stay
        </p>
      </div>
    </div>
  );
}
