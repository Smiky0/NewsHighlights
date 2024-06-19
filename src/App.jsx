import React from "react";
import HighlightsPage from "./components/HighlightsPage";

export default function App() {
    return (
        <>
            <div className="navbar absolute z-10 bg-primary text-primary-content">
                <span className="text-2xl font-semibold">News Highlights</span>
            </div>
            <HighlightsPage />
        </>
    );
}
