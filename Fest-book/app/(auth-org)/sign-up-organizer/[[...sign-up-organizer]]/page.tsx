import { SignUp } from "@clerk/nextjs";
import Image from 'next/image';
import img from "../../../../public/organiser-signup.jpg";
import Link from "next/link";

export default function OrganiserSignUp() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src={img}
          alt="Organizer Sign Up"
          className="absolute inset-0 w-full h-full object-cover"
          quality={100}
        />
      </div>

      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Join the Future of
            <strong className="block font-extrabold text-blue-500"> Event Management. </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Create, promote, and manage your festivals with ease. Gain access to powerful tools that streamline event planning and audience engagement.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/sign-in-organizer"
              className="block w-full rounded-sm bg-blue-600 px-40 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-3 focus:outline-hidden sm:w-auto"
            >
              Sign In as Organizer
            </Link>
          </div>
        </div>

        <div className="mt-1 ltr:ml-auto rtl:mr-auto">
          <SignUp routing="hash" />
        </div>
      </div>
    </section>
  );
}
