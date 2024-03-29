import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Navbar = () => {
  const navigation: string[] = [];
  const { data: sessionData } = useSession();

  const { data: isProfileExist } = api.profile.isProfileExist.useQuery();

  return (
    <div className="w-full">
      <nav className="main-container relative items-center justify-between lg:justify-between">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex w-full flex-wrap items-center justify-between lg:w-auto">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
                >
                  <span>Lokerdeveloper</span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="dark:focus:bg-trueGray-700 ml-auto rounded-md px-2 py-1 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300 lg:hidden"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="my-5 flex w-full flex-wrap lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href="/"
                        className="dark:focus:bg-trueGray-700 -ml-4 w-full rounded-md px-4 py-2 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300"
                      >
                        {item}
                      </Link>
                    ))}
                    {isProfileExist && (
                      <Link
                        href="/profile"
                        className="dark:focus:bg-trueGray-700 -ml-4 w-full rounded-md px-4 py-2 text-gray-500 hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-300"
                      >
                        Profile
                      </Link>
                    )}
                    <button
                      className="mt-3 w-full rounded-md bg-indigo-600 px-6 py-2 text-center text-white lg:ml-5"
                      onClick={
                        sessionData ? () => void signOut() : () => void signIn()
                      }
                    >
                      {sessionData ? "Sign Out" : "Sign In"}
                    </button>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="flex-1 list-none items-center justify-end pt-6 lg:flex lg:pt-0">
            {navigation.map((menu, index) => (
              <li className="nav__item mr-3" key={index}>
                <Link
                  href="/"
                  className="inline-block rounded-md px-4 py-2 text-lg font-normal text-gray-800 no-underline hover:text-indigo-500 focus:bg-indigo-100 focus:text-indigo-500 focus:outline-none dark:text-gray-200"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__item mr-3 hidden space-x-3 lg:flex lg:items-center lg:justify-center">
          {isProfileExist && (
            <Link href={"/profile"} className="link ">
              Profile
            </Link>
          )}

          <button
            className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
