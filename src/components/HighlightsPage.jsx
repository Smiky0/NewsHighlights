import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import backup_img from "../assets/backupnews.png";

const API_KEY = import.meta.env.VITE_API_KEY;

function HighlightsPage() {
    const [newsHighlights, setNewsHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noNews, setNoNews] = useState(true);
    useEffect(() => {
        setNewsHighlights([]);
        const getNews = async () => {
            try {
                const res = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=in&pageSize=50&apiKey=${API_KEY}`
                );
                const data = await res.json();
                console.log(data);
                setNewsHighlights(data.articles);
                if (data.articles.length > 0) {
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
                    {newsHighlights.map((news, index) => (
                        <div
                            key={index}
                            className="carousel-item h-full w-full"
                        >
                            <div className="hero min-h-screen bg-base-200">
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <img
                                        src={
                                            news.urlToImage != null
                                                ? news.urlToImage
                                                : backup_img
                                        }
                                        className="object-cover w-96 h-48 md:w-auto md:h-auto md:max-w-lg rounded-lg shadow-2xl"
                                    />

                                    <div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-primary">
                                            {news.title}
                                        </h1>

                                        <p className="hidden sm:block text-xl md:text-2xl text-pretty py-6 md:pr-24">
                                            {news.description}
                                        </p>
                                        <div className="py-2">
                                            SOURCE: {news.source.name}
                                            <p>{news.publishedAt}</p>
                                        </div>

                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                window.open(news.url, "_blank")
                                            }
                                        >
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
