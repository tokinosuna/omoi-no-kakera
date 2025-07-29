(function(window) {
    // Make sure React is available
    if (!window.React) {
        throw new Error("React must be loaded before Blog.js");
    }
    const { useState } = window.React;

    // --- Author Biography Component ---
    // A reusable function to display the author's information.
    const AuthorBio = ({ authorName, language, t }) => {
        const getBio = (lang) => {
            const bios = {
                en: "A passionate contributor to the Daily Heroes project, dedicated to finding and sharing stories that matter.",
                de: "Ein leidenschaftlicher Mitwirkender des Daily Heroes-Projekts, der sich dem Finden und Teilen von wichtigen Geschichten widmet.",
                zh: "「日常英雄」計畫的熱情貢獻者，致力於發掘並分享那些至關重要的故事。"
            };
            return bios[lang] || bios['en'];
        };

        const avatarLetter = authorName ? authorName.charAt(0).toUpperCase() : '?';

        return (
            <div className="author-bio-box">
                <h3 className="author-bio-title">{t('aboutAuthor')}</h3>
                <div className="author-bio-content">
                    <img
                        src={`https://placehold.co/80x80/cccccc/000000?text=${avatarLetter}`}
                        alt={`${authorName}'s avatar`}
                        className="author-avatar"
                    />
                    <div className="author-details">
                        <h4 className="author-name">{authorName}</h4>
                        <p className="author-description">{getBio(language)}</p>
                    </div>
                </div>
            </div>
        );
    };

    // --- Article Component ---
    const ItemDetailView = ({
        item,
        language,
        t,
        getRelatedStories,
        handleFilter,
        handleNavigation,
        setActiveItem,
        renderMarkdown, // We receive this function as a prop now
        initialIsPlaying = false // Receive initial playing state
    }) => {
        const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
        const relatedStories = getRelatedStories(item);

        return (
            <div className="detail-view">
                <button className="back-button" onClick={() => setActiveItem(null)}>
                    {'←'} {t('back')}
                </button>
                <header className="article-header">
                    <div className="article-category-link">{item.category[language]}</div>
                    <h1 className="article-title">{item.title[language]}</h1>
                    <div className="article-meta">
                        <span className="article-author">{item.author[language]}</span>
                        <span className="article-date">{item.date}</span>
                        <span className="article-read-time">{item.readTime}</span>
                    </div>
                </header>
                <div className="article-player">
                    <div className="article-featured-image">
                        <img src={item.image} alt={item.title[language]} />
                    </div>
                    <div className="player-controls">
                        <button onClick={() => handleNavigation(-1)} title="Previous story">
                            {'«'}
                        </button>
                        <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)} title={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? '❚❚' : '▶️'}
                        </button>
                        <button onClick={() => handleNavigation(1)} title="Next story">
                            {'»'}
                        </button>
                    </div>
                </div>
                <div className="article-body">
                    {renderMarkdown(item.content[language])}
                </div>
                <footer className="article-footer">
                    <div className="article-tags">
                        <strong>{t('tags')}:</strong>
                        <div className="tag-cloud">
                            {item.tags.map(tag => (
                                <a key={tag} onClick={() => handleFilter('tag', tag)} className="article-tag">
                                    {tag}
                                </a>
                            ))}
                        </div>
                    </div>

                    <AuthorBio authorName={item.author[language]} language={language} t={t} />

                    {relatedStories.length > 0 && (
                        <div className="related-stories">
                            <h3>{t('relatedStories')}</h3>
                            <div className="related-grid">
                                {relatedStories.map(story => (
                                    <div key={story.id} className="related-card" onClick={() => setActiveItem(story)}>
                                        <img src={story.image} alt={story.title[language]} />
                                        <div className="related-content">
                                            <h4>{story.title[language]}</h4>
                                            <p>{story.category[language]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </footer>
            </div>
        );
    };

    window.BlogComponents = {
        ItemDetailView
    };

})(window);
