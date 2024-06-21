import React from "react";
import HighlightsPage from "./components/HighlightsPage";

export default function App() {
    return (
        <>
            <div className="navbar absolute flex z-10 bg-primary text-primary-content">
                <span className="flex-grow text-xl md:text-2xl font-semibold">
                    News Highlights
                </span>
                <div>
                    <button
                        className="btn  mx-1"
                        onClick={() =>
                            window.open("https://www.ndtv.com/", "_blank")
                        }
                    >
                        NDTV
                    </button>
                    <button
                        className="btn mx-1"
                        onClick={() =>
                            window.open("https://www.thehindu.com/", "_blank")
                        }
                    >
                        The Hindu
                    </button>
                </div>
            </div>
            <HighlightsPage />
        </>
    );
}
