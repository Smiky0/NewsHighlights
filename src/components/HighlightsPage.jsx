import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import backup_img from "../assets/backupnews.png";

const API_KEY = import.meta.env.VITE_API_KEY;

function HighlightsPage() {
    const [newsHighlights, setNewsHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noNews, setNoNews] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const openModal = (newsItem) => {
        setSelectedNews(newsItem);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNews(null);
        setModalOpen(false);
    };
    useEffect(() => {
        const getNews = async () => {
            setNewsHighlights([]);
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.worldnewsapi.com/top-news?source-country=in&language=en&api-key=${API_KEY}`
                );
                const data = await res.json();
                if (data.top_news && data.top_news.length > 0) {
                    const articles = data.top_news.flatMap(
                        (newsItem) => newsItem.news
                    );
                    const filteredNews = filterNewsByDomain(articles);
                    setNewsHighlights(filteredNews);
                    setNoNews(false);
                } else {
                    setNoNews(true);
                }
            } catch (e) {
                console.log("Couldn't fetch news from API");
            } finally {
                setLoading(false);
            }
        };
        getNews();
    }, []);
    const desiredDomains = ["ndtv.com", "thehindu.com", "bbc.co.uk"];

    const filterNewsByDomain = (articles) => {
        return articles.filter((article) => {
            return desiredDomains.some((domain) =>
                article.url.includes(domain)
            );
        });
    };
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
                                            news.image != null
                                                ? news.image
                                                : backup_img
                                        }
                                        className="object-cover w-96 h-48 md:w-auto md:h-auto md:max-w-lg rounded-lg shadow-2xl"
                                    />

                                    <div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-primary">
                                            {news.title}
                                        </h1>

                                        <p className="hidden sm:block text-xl md:text-2xl text-pretty py-6 md:pr-24">
                                            {news.summary}
                                        </p>
                                        <div className="py-2">
                                            Author: {news.author}
                                            <p>{news.publish_date}</p>
                                        </div>

                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => openModal(news)}
                                        >
                                            Read More
                                        </button>
                                        {selectedNews && (
                                            <dialog
                                                id="my_modal_3"
                                                className="modal my-8"
                                                open={modalOpen}
                                                onClick={(e) => {
                                                    if (
                                                        e.target.tagName ===
                                                        "DIALOG"
                                                    ) {
                                                        closeModal();
                                                    }
                                                }}
                                            >
                                                <div className="modal-box ">
                                                    <form method="dialog">
                                                        {/* Close button */}
                                                        <button
                                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                            onClick={closeModal}
                                                        >
                                                            ✕
                                                        </button>
                                                    </form>

                                                    <p className="py-4 text-lg">
                                                        {selectedNews.text}
                                                    </p>
                                                </div>
                                            </dialog>
                                        )}
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
