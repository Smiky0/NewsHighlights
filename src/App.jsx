import React from "react";
import HighlightsPage from "./components/HighlightsPage";
import githubico from "./assets/github.svg";

export default function App() {
    return (
        <>
            <div className="navbar absolute flex z-10 bg-primary text-primary-content">
                <span className="flex-grow text-2xl font-semibold">
                    News Highlights
                </span>

                <button
                    className="btn btn-outline btn-circle px-1"
                    onClick={() =>
                        window.open("https://github.com/Smiky0", "_blank")
                    }
                >
                    <img src={githubico} />
                </button>
            </div>
            <HighlightsPage />
        </>
    );
}
