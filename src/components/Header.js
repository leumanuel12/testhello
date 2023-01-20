import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext, UserContext } from "../App";

const navigation = [
  { name: "Persons", href: "/persons" },
  { name: "Placeholder1", href: "/Placeholder1" },
  { name: "Placeholder2", href: "/Placeholder2" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [userLogged, setUserLogged] = useContext(UserContext);

  useEffect(() => {
    if (!loggedIn) setLoggedIn(false);
  });

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-gray-800 bg-gradient-to-r from-green-600"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    {loggedIn ? (
                      <div className="flex space-x-4 text-white">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) => {
                              return (
                                "px-3 py-2 text-md no-underline " +
                                (!isActive
                                  ? //? "no-underline text-white hover:text-white hover:bg-green-500"
                                    " text-white hover:border-2 hover:rounded-md"
                                  : " bg-green-100 text-black rounded-md font-medium")
                              );
                            }}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  
                  {userLogged ? (
                    <div className="px-3 py-2 text-white">
                      Hello, {userLogged.charAt(0).toUpperCase() + userLogged.slice(1)}
                    </div>
                  ) : null}

                  {loggedIn ? (
                    <button
                      className="px-3 py-2 text-white hover:border-2 hover:rounded-md"
                      onClick={() => {
                        setLoggedIn(false);
                        setUserLogged(false);
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        className="px-3 py-2 text-white hover:border-2 hover:rounded-md"
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        Register
                      </button>
                      <button
                        className="px-3 py-2 text-white hover:border-2 hover:rounded-md"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              {loggedIn && localStorage ? (
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => {
                        return (
                          "block px-3 py-2 rounded-md text-base font-medium " +
                          (!isActive
                            ? "no-underline text-white hover:text-white hover:bg-green-500"
                            : "no-underline bg-green-100 text-black")
                        );
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-gray-200 min-h-screen">
        <div className="mx-auto pt-4 px-10 py-3 max-w-6xl">
          {props.children}
        </div>
      </div>
    </>
  );
}
