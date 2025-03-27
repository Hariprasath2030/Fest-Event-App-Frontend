import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';
import img from "../../../../public/signin.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src={img}
          alt="Fest Book"
          className="absolute inset-0 w-full h-full object-cover"
          quality={100}
          layout="fill"
        />
      </div>

      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Experience the Ultimate
            <strong className="block font-extrabold text-rose-500"> Festival Guide. </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Discover, book, and enjoy the best festivals around you. Stay updated with event schedules, artists, and exclusive offers with Fest Book!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/"
              className="block w-full rounded-sm bg-rose-600 px-40 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
            >
              Explore Fest Book
            </Link>
          </div>
        </div>

        <div className="mt-12 ltr:ml-auto rtl:mr-auto">
          {/* Update the afterSignInUrl to be absolute */}
          <SignIn routing="hash" />
        </div>
      </div>
    </section>
  );
}
