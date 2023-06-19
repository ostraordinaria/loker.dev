import Image from "next/image";
import Link from "next/link";
import heroImage from "public/img/hero.png";

const Header = () => {
  return (
    <div className="main-container">
      <div className="flex w-full items-center lg:w-1/2">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
            Smart matching for
            <span className="text-indigo-600"> developers </span>and
            <span className="text-indigo-600"> recruiters</span>
          </h1>
          <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
            Through our innovative approach, we aim to simplify and optimize the
            entire job-seeking process, fostering meaningful connections between
            developers and recruiters while facilitating efficient and effective
            talent acquisition
          </p>

          <div className="flex flex-col items-start space-x-3 space-y-3 sm:flex-row sm:items-center sm:space-y-0">
            <Link
              href="#"
              target="_blank"
              rel="noopener"
              className="rounded-md bg-indigo-600 px-8 py-4 text-center text-lg font-medium text-white "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="hidden lg:block">
          <Image
            src={heroImage}
            width="616"
            height="617"
            alt="Hero Illustration"
            layout="intrinsic"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
