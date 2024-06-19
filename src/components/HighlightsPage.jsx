import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const images = [
    "https://plus.unsplash.com/premium_photo-1718204436526-277f9f34607c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1718570262641-54c3ea3142e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const API_KEY = import.meta.env.VITE_API_KEY;

function HighlightsPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noNews, setNoNews] = useState(false);
    useEffect(() => {
        setNews([]);
        const getNews = async () => {
            try {
                const res = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`
                );
                const data = await res.json();
                setNews(data);
                if (data.length > 0) {
                    setNoNews(false);
                }
            } catch (e) {
                console.log("Couldn't fetch news from API");
            } finally {
                setLoading(false);
            }
        };
        getNews();
    }, []);
    return (
        <>
            {loading && (
                <div className="flex justify-center h-screen items-center">
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="text-2xl px-4">Loading news..</span>
                </div>
            )}
            {!noNews && (
                <div className="h-screen w-full carousel carousel-vertical rounded-box">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="carousel-item h-full w-full"
                        >
                            <div className="hero min-h-screen bg-base-200">
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <img
                                        src={image}
                                        className="w-sm md:max-w-lg rounded-lg shadow-2xl"
                                    />

                                    <div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-primary">
                                            Box Office News!
                                        </h1>

                                        <p className="text-xl md:text-2xl text-pretty py-6 md:pr-24">
                                            Provident cupiditate voluptatem et
                                            in. Quaerat fugiat ut assumenda
                                            excepturi exercitationem quasi. In
                                            deleniti eaque aut repudiandae et a
                                            id nisi.
                                        </p>
                                        <div className="py-2">
                                            SOURCE: The Times of India
                                            2024-05-08T14:52:26Z
                                        </div>

                                        <button className="btn btn-secondary">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {noNews && (
                <div>
                    <span className="flex justify-center items-center h-screen text-2xl">
                        Sorry, No news found!! 😔😔
                    </span>
                </div>
            )}
        </>
    );
}

export default HighlightsPage;
