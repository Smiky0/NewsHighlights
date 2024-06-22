import React, { useEffect, useState } from "react";
import backup_img from "../assets/backupnews.png";

const API_KEY = import.meta.env.VITE_API_KEY;

function HighlightsPage() {
    const [newsHighlights, setNewsHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noNews, setNoNews] = useState(false);
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
            setNoNews(false);

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
                    setNoNews(filteredNews.length === 0);
                } else {
                    setNoNews(true);
                }
            } catch (e) {
                console.log("Couldn't fetch news from API", e);
                setNoNews(true);
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []);

    const desiredDomains = [
        "ndtv.com",
        "thehindu.com",
        "indiatimes.com",
        "bbc.co.uk",
        "business-standard.com",
        "aninews.in",
    ];

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
                    <span className="text-2xl px-4">Loading news...</span>
                </div>
            )}

            {!loading && noNews && (
                <div className="flex justify-center items-center h-screen text-2xl">
                    Sorry, no news found! 😔😔
                </div>
            )}

            {!loading && !noNews && (
                <div className="h-screen w-full carousel carousel-vertical rounded-box">
                    {newsHighlights.map((news, index) => (
                        <div
                            key={index}
                            className="carousel-item h-full w-full"
                        >
                            <div className="hero min-h-screen bg-base-200">
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <img
                                        src={news.image || backup_img}
                                        className="object-cover w-96 h-48 md:w-auto md:h-auto md:max-w-lg rounded-lg shadow-2xl"
                                        alt="News"
                                    />
                                    <div>
                                        <h1 className="text-clamp-4 text-xl md:text-5xl font-bold text-primary">
                                            {news.title}
                                        </h1>
                                        <p className="line-clamp-3 text-lg md:text-2xl text-pretty my-6 md:pr-24">
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
                                        <button
                                            className="btn btn-outline mx-4"
                                            onClick={() =>
                                                window.open(news.url, "_blank")
                                            }
                                        >
                                            Visit Site
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
                                                <div className="modal-box">
                                                    <form method="dialog">
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
        </>
    );
}

export default HighlightsPage;
