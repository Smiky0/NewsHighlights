import React, { useEffect, useState } from "react";
import HighlightsPage from "./components/HighlightsPage";
import githubico from "./assets/github.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function App() {
    const [country, setCountry] = useState(() => {
        try {
            const savedCountry = JSON.parse(localStorage.getItem("country"));
            return savedCountry || "in";
        } catch (e) {
            console.log(
                "Error while fetching country name from local storage",
                e
            );
        }
    });

    useEffect(() => {
        localStorage.setItem("country", JSON.stringify(country));
    }, [country]);

    return (
        <>
            <div className="navbar fixed flex z-10 bg-primary text-primary-content">
                <div className="flex-1">
                    <a className="text-xl sm:text-3xl font-display font-semibold">
                        News Highlights
                    </a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-4">
                        <li>
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm font-sans font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-secondary">
                                        Country{" "}
                                        <span className="uppercase">
                                            {country}
                                        </span>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 h-5 w-5 text-black"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        <MenuItem>
                                            <a
                                                onClick={() => setCountry("in")}
                                                className="block font-sans px-4 py-2 text-lg text-white data-[focus]:bg-gray-200 data-[focus]:text-black"
                                            >
                                                🇮🇳 India
                                            </a>
                                        </MenuItem>

                                        <MenuItem>
                                            <a
                                                onClick={() => setCountry("us")}
                                                className="block font-sans px-4 py-2 text-lg text-white data-[focus]:bg-gray-200 data-[focus]:text-black"
                                            >
                                                🇺🇸 US
                                            </a>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </li>
                        <li>
                            <button
                                className="hidden sm:block btn btn-outline btn-circle px-1"
                                onClick={() =>
                                    window.open(
                                        "https://github.com/Smiky0",
                                        "_blank"
                                    )
                                }
                            >
                                <img src={githubico} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <HighlightsPage country={country} />
        </>
    );
}
