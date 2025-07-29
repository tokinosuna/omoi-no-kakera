const { useState, useEffect, useMemo } = React;

const Sun = () => '☀️'; const Moon = () => '🌙'; const Type = () => 'T'; const X = () => '❌'; const Menu = () => '☰'; const Home = () => '⌂'; const Mail = () => '✉️'; const Settings = () => '⚙️'; const Info = () => 'ℹ️'; const Shield = () => '🛡️'; const ArrowLeft = () => '←'; const Heart = () => '❤️'; const Play = () => '▶️'; const Pause = () => '❚❚'; const SkipBack = () => '«'; const SkipForward = () => '»'; const Facebook = () => 'FB'; const Twitter = () => 'TW'; const Instagram = () => 'IG'; const Search = () => '🔍'; const Filter = () => '▼'; const Loader = () => '...';

function DailyHeroes() {
    const [language, setLanguage] = useState('de');
    const [theme, setTheme] = useState('serene');
    const [textSize, setTextSize] = useState('normal');
    const [activeModal, setActiveModal] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeTag, setActiveTag] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);
    const [isHeaderPlaying, setIsHeaderPlaying] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alphabetical


    const translations = {
        en: { 
            settings: "Settings", 
            contact: "Share Your Story", 
            impressum: "Imprint", 
            datenschutz: "Privacy Policy", 
            allStories: "All Stories", 
            categories: "Categories", 
            tags: "Popular Tags", 
            sitemap: "Sitemap", 
            designConcept: "Design Concept", 
            home: "Home", 
            articles: "Articles", 
            back: "Back to stories", 
            submit: "Submit Story", 
            quotePlaceholder: "This is an inspiring quote related to the story.", 
            language: "Language",
            actions: "Actions",
            search: "Search stories...",
            sortBy: "Sort by",
            newest: "Newest",
            oldest: "Oldest",
            alphabetical: "A-Z",
            noResults: "No stories found",
            readMore: "Read more",
            relatedStories: "Related Stories",
            upNext: "Up Next"
        },
        de: { 
            settings: "Einstellungen", 
            contact: "Geschichte teilen", 
            impressum: "Impressum", 
            datenschutz: "Datenschutz", 
            allStories: "Alle Geschichten", 
            categories: "Kategorien", 
            tags: "Beliebte Tags", 
            sitemap: "Sitemap", 
            designConcept: "Designkonzept", 
            home: "Startseite", 
            articles: "Artikel", 
            back: "Zurück zu den Geschichten", 
            submit: "Geschichte einreichen", 
            quotePlaceholder: "Dies ist ein inspirierendes Zitat zur Geschichte.", 
            language: "Sprache",
            actions: "Aktionen",
            search: "Geschichten suchen...",
            sortBy: "Sortieren nach",
            newest: "Neueste",
            oldest: "Älteste",
            alphabetical: "A-Z",
            noResults: "Keine Geschichten gefunden",
            readMore: "Weiterlesen",
            relatedStories: "Ähnliche Geschichten",
            upNext: "Als Nächstes"
        },
        zh: { 
            settings: "設定", 
            contact: "分享你的故事", 
            impressum: "網站資訊", 
            datenschutz: "隱私權政策", 
            allStories: "所有故事", 
            categories: "文章分類", 
            tags: "熱門標籤", 
            sitemap: "網站地圖", 
            designConcept: "設計概念", 
            home: "首頁", 
            articles: "文章", 
            back: "回到故事列表", 
            submit: "提交故事", 
            quotePlaceholder: "這是一句與故事相關的勵志名言。", 
            language: "語言",
            actions: "操作",
            search: "搜索故事...",
            sortBy: "排序方式",
            newest: "最新",
            oldest: "最舊",
            alphabetical: "A-Z",
            noResults: "未找到故事",
            readMore: "閱讀更多",
            relatedStories: "相關故事",
            upNext: "下一個"
        }
    };
    
    const t = (key) => (translations[language] && translations[language][key]) || translations['en'][key] || key;

    // --- LIFECYCLE & LOGIC ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('dailyHeroesTheme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if(theme) {
            document.body.className = `theme-${theme} text-size-${textSize}`;
            localStorage.setItem('dailyHeroesTheme', theme);
        }
    }, [theme, textSize]);

    const filteredContent = useMemo(() => {
        let filtered = contentData;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(item => 
                item.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.content[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Filter by category
        if (activeCategory) {
            filtered = filtered.filter(item => item.category.en === activeCategory);
        }

        // Filter by tag
        if (activeTag) {
            filtered = filtered.filter(item => item.tags.includes(activeTag));
        }

        // Sort
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'alphabetical':
                    return a.title[language].localeCompare(b.title[language]);
                case 'newest':
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        return filtered;
    }, [contentData, activeCategory, activeTag, searchQuery, sortBy, language]);
    
    const handleNavigation = (direction) => {
        const currentIndex = filteredContent.findIndex(item => item.id === activeItem.id);
        const nextIndex = (currentIndex + direction + filteredContent.length) % filteredContent.length;
        setActiveItem(filteredContent[nextIndex]);
    };

    const handleHeaderNavigation = (direction) => {
        const nextIndex = (currentHeaderIndex + direction + headerContent.length) % headerContent.length;
        setCurrentHeaderIndex(nextIndex);
    };

    const handleFilter = (type, value) => {
        setIsLoading(true);
        setTimeout(() => {
            if (type === 'category') {
                setActiveCategory(value);
                setActiveTag(null);
            } else {
                setActiveTag(value);
                setActiveCategory(null);
            }
            setActiveItem(null);
            setShowMobileMenu(false);
            setIsLoading(false);
        }, 300);
    };

    const clearFilters = () => {
        setActiveCategory(null);
        setActiveTag(null);
        setActiveItem(null);
        setSearchQuery('');
        setShowMobileMenu(false);
    };

    const handleSearch = (query) => {
        setIsLoading(true);
        setTimeout(() => {
            setSearchQuery(query);
            setActiveCategory(null);
            setActiveTag(null);
            setIsLoading(false);
        }, 300);
    };

    const getRelatedStories = (item) => {
        return contentData
            .filter(story => story.id !== item.id)
            .filter(story => 
                story.category.en === item.category.en || 
                story.tags.some(tag => item.tags.includes(tag))
            )
            .slice(0, 2);
    };

    const renderMarkdown = (content) => {
        return content
            .split('\n')
            .map((line, index) => {
                // Headers
                if (line.startsWith('##### ')) {
                    return <h5 key={index} className="article-h5">{line.substring(6)}</h5>;
                }
                if (line.startsWith('#### ')) {
                    return <h4 key={index} className="article-h4">{line.substring(5)}</h4>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="article-h3">{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="article-h2">{line.substring(3)}</h2>;
                }
                
                // Blockquotes
                if (line.startsWith('> ')) {
                    return <blockquote key={index} className="article-quote">{line.substring(2).replace(/\*/g, '')}</blockquote>;
                }
                
                // Lists
                if (line.match(/^- \*\*(.*?)\*\*/)) {
                    return <li key={index} className="article-list-item"><strong>{line.substring(4).replace(/\*\*/g, '')}</strong></li>;
                }
                if (line.startsWith('- ')) {
                    return <li key={index} className="article-list-item">{line.substring(2)}</li>;
                }
                
                // Empty lines
                if (!line.trim()) {
                    return <br key={index} />;
                }
                
                // Regular paragraphs with formatting
                const formatted = line
                    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // Bold italic
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
                
                return <p key={index} className="article-paragraph" dangerouslySetInnerHTML={{__html: formatted}} />;
            });
    };

    // --- RENDER COMPONENTS ---
    const InitialThemeSelector = () => (
        <div className="modal-overlay">
            <div className="modal-content initial-choice">
                <h2>Choose Your Experience</h2>
                <p className="modal-subtitle">Select a visual theme to begin your journey.</p>
                <div className="button-group">
                    <button className="setting-btn" onClick={() => setTheme('serene')}>
                        <Moon size={16}/>
                        <span>Serene Minimal</span>
                        <small>Clean, elegant, accessible</small>
                    </button>
                    <button className="setting-btn" onClick={() => setTheme('dreamy')}>
                        <Sun size={16}/>
                        <span>Y2K Dream</span>
                        <small>Vibrant, nostalgic, playful</small>
                    </button>
                </div>
            </div>
        </div>
    );

    const ItemDetailView = ({ item }) => {
        const relatedStories = getRelatedStories(item);
        
        return (
            <div className="detail-view">
                <button className="back-button" onClick={() => { setActiveItem(null); setIsPlaying(false); }}>
                    <ArrowLeft size={18} /> {t('back')}
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
                            <SkipBack size={20} />
                        </button>
                        <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)} title={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                        </button>
                        <button onClick={() => handleNavigation(1)} title="Next story">
                            <SkipForward size={20} />
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
    
    const Sidebar = ({ isMobile = false }) => {
        const uniqueCategories = [...new Map(contentData.map(item => [item.category.en, item])).values()];
        const uniqueTags = [...new Set(contentData.flatMap(item => item.tags))];

        return (
            <nav className={isMobile ? "mobile-nav" : "desktop-nav"}>
                {isMobile && <div className="logo">想いの欠片 回憶圖書館</div>}
                
                <div className="sidebar-widget">
                    <div className="search-container">
                        <Search size={18} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="sidebar-widget">
                    <a className="nav-item" onClick={clearFilters}>
                        <Home size={18} /> {t('allStories')}
                    </a>
                </div>

                <div className="sidebar-widget">
                    <h4 className="widget-title">{t('sortBy')}</h4>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="newest">{t('newest')}</option>
                        <option value="oldest">{t('oldest')}</option>
                        <option value="alphabetical">{t('alphabetical')}</option>
                    </select>
                </div>

                <div className="sidebar-widget">
                    <h4 className="widget-title">{t('categories')}</h4>
                    <ul>
                        {uniqueCategories.map(item => (
                            <li key={item.id}>
                                <a onClick={() => handleFilter('category', item.category.en)}>
                                    {item.category[language]} ({contentData.filter(c => c.category.en === item.category.en).length})
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="sidebar-widget">
                    <h4 className="widget-title">{t('tags')}</h4>
                    <div className="tag-cloud">
                        {uniqueTags.slice(0, 8).map(tag => (
                            <a key={tag} onClick={() => handleFilter('tag', tag)}>{tag}</a>
                        ))}
                    </div>
                </div>
                
                <div className="sidebar-widget">
                    <h4 className="widget-title">{t('language')}</h4>
                    <div className="language-buttons">
                        <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
                        <button className={`lang-btn ${language === 'de' ? 'active' : ''}`} onClick={() => setLanguage('de')}>DE</button>
                        <button className={`lang-btn ${language === 'zh' ? 'active' : ''}`} onClick={() => setLanguage('zh')}>中文</button>
                    </div>
                </div>
                
                <div className="sidebar-widget">
                    <h4 className="widget-title">{t('actions')}</h4>
                    <a className="nav-item" onClick={() => { setActiveModal('contact'); setShowMobileMenu(false); }}>
                        <Mail size={18} /> {t('contact')}
                    </a>
                    <a className="nav-item" onClick={() => { setActiveModal('settings'); setShowMobileMenu(false); }}>
                        <Settings size={18} /> {t('settings')}
                    </a>
                </div>
            </nav>
        );
    };

    const Footer = () => (
        <footer className="site-footer">
            <div className="sitemap">
                <div className="sitemap-col">
                    <h4>{t('sitemap')}</h4>
                    <a onClick={clearFilters}>{t('home')}</a>
                    <a onClick={() => setActiveModal('contact')}>{t('contact')}</a>
                    <a onClick={() => setActiveModal('settings')}>{t('settings')}</a>
                </div>
                <div className="sitemap-col">
                    <h4>{t('designConcept')}</h4>
                    <p>This site celebrates everyday heroes through two distinct visual lenses: a vibrant, neo-brutalist Y2K aesthetic and a calm, elegant minimalist theme. Each design choice reflects the diverse ways we can honor and share inspiring stories.</p>
                </div>
            </div>
            <div className="social-media">
                <h4>Follow Us</h4>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook" title="Facebook">
                        <Facebook size={24} />
                    </a>
                    <a href="#" aria-label="Twitter" title="Twitter">
                        <Twitter size={24} />
                    </a>
                    <a href="#" aria-label="Instagram" title="Instagram">
                        <Instagram size={24} />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Made with <Heart size={14} className="heart-icon" /> for everyday heroes.</p>
                <div className="footer-links">
                    <a onClick={() => setActiveModal('impressum')}>{t('impressum')}</a>
                    <a onClick={() => setActiveModal('datenschutz')}>{t('datenschutz')}</a>
                </div>
            </div>
        </footer>
    );
    
    const Modal = () => {
        if (!activeModal) return null;
        
        const getModalContent = () => {
            switch(activeModal) {
                case 'settings':
                    return ( 
                        <> 
                            <h2>{t('settings')}</h2> 
                            <p className="modal-subtitle">Customize your reading experience.</p> 
                            <div className="setting-group"> 
                                <h3>Theme</h3> 
                                <div className="button-group"> 
                                    <button className={`setting-btn ${theme === 'serene' ? 'active' : ''}`} onClick={() => setTheme('serene')}>
                                        <Moon size={16}/>
                                        <span>Serene Minimal</span>
                                    </button>
                                    <button className={`setting-btn ${theme === 'dreamy' ? 'active' : ''}`} onClick={() => setTheme('dreamy')}>
                                        <Sun size={16}/>
                                        <span>Y2K Dream</span>
                                    </button> 
                                </div> 
                            </div> 
                            <div className="setting-group"> 
                                <h3>Text Size</h3> 
                                <div className="button-group"> 
                                    <button className={`setting-btn ${textSize === 'normal' ? 'active' : ''}`} onClick={() => setTextSize('normal')}>
                                        <Type size={16}/>
                                        <span>Normal</span>
                                    </button> 
                                    <button className={`setting-btn ${textSize === 'medium' ? 'active' : ''}`} onClick={() => setTextSize('medium')}>
                                        <Type size={20}/>
                                        <span>Medium</span>
                                    </button> 
                                    <button className={`setting-btn ${textSize === 'large' ? 'active' : ''}`} onClick={() => setTextSize('large')}>
                                        <Type size={24}/>
                                        <span>Large</span>
                                    </button> 
                                </div> 
                            </div> 
                        </> 
                    );
                case 'contact':
                    return ( 
                        <> 
                            <h2>{t('contact')}</h2> 
                            <p className="modal-subtitle">Tell us about a hero in your life.</p> 
                            <form className="form-layout" onSubmit={(e) => {e.preventDefault(); alert('Thank you for sharing! Your story will be reviewed soon.');}}> 
                                <input type="text" placeholder="Your Name" required /> 
                                <input type="email" placeholder="Your Email" required /> 
                                <input type="text" placeholder="Hero's Name" required /> 
                                <textarea placeholder="Tell us their story..." rows="5" required></textarea> 
                                <button type="submit" className="submit-btn">
                                    <Heart size={18}/>
                                    {t('submit')}
                                </button> 
                            </form> 
                        </> 
                    );
                case 'impressum':
                    return ( 
                        <> 
                            <h2>{t('impressum')}</h2> 
                            <p><strong>Daily Heroes Platform</strong></p>
                            <p>A community-driven space for celebrating everyday heroism.</p>
                            <p>Email: hello@dailyheroes.com</p>
                        </> 
                    );
                case 'datenschutz':
                    return( 
                        <> 
                            <h2>{t('datenschutz')}</h2> 
                            <h3>Data Privacy</h3>
                            <p>We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.</p>
                            <h4>Information We Collect</h4>
                            <p>When you share a story, we collect your name, email, and the story content you provide.</p>
                            <h4>How We Use Your Information</h4>
                            <p>Your information is used solely to feature your story on our platform and to communicate with you about your submission.</p>
                        </> 
                    );
                default: 
                    return null;
            }
        };

        return ( 
            <div className="modal-overlay" onClick={() => setActiveModal(null)}> 
                <div className="modal-content" onClick={e => e.stopPropagation()}> 
                    <button className="modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
                        <X size={20}/>
                    </button> 
                    {getModalContent()} 
                </div> 
            </div> 
        );
    };

    if (!theme) return <InitialThemeSelector />;

    return (
        <>
            <style>{`
                /* --- FONT & ROOT VARIABLES --- */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Press+Start+2P&family=Lora:wght@400;500;600;700&display=swap');
                
                :root { 
                    --font-size-base: 16px; 
                    --font-size-p: 1rem; 
                    --font-size-h1: 2.2rem; 
                    --font-size-h2: 1.8rem; 
                    --font-size-h3: 1.4rem; 
                    --font-size-h4: 1.2rem; 
                    --font-size-h5: 1.1rem;
                }
                
                .text-size-medium { 
                    --font-size-base: 18px; 
                    --font-size-p: 1.1rem; 
                    --font-size-h1: 2.5rem; 
                    --font-size-h2: 2.0rem; 
                    --font-size-h3: 1.6rem; 
                    --font-size-h4: 1.4rem; 
                    --font-size-h5: 1.3rem;
                }
                
                .text-size-large { 
                    --font-size-base: 20px; 
                    --font-size-p: 1.3rem; 
                    --font-size-h1: 2.8rem; 
                    --font-size-h2: 2.3rem; 
                    --font-size-h3: 1.8rem; 
                    --font-size-h4: 1.6rem; 
                    --font-size-h5: 1.5rem;
                }
                
                /* --- THEMES --- */
                .theme-dreamy { 
                    --bg-color: #FFFFFF; 
                    --text-color: #000000; 
                    --text-color-muted: #555555; 
                    --accent-primary: #F7CAC9; 
                    --accent-secondary: #92A8D1; 
                    --accent-tertiary: #FFB6C1;
                    --border-color: #000000; 
                    --shadow-color: #000000; 
                    --font-family-header: 'Press Start 2P', cursive; 
                    --font-family-body: 'Inter', sans-serif; 
                    --border-radius: 8px; 
                    --card-bg: rgba(255, 255, 255, 0.8); 
                    --neo-shadow: 6px 6px 0px var(--border-color); 
                    --highlight-bg: #FFFF00;
                    --code-bg: #F0F0F0;
                }
                
                .theme-serene { 
                    --bg-color: #FBF9F6; 
                    --text-color: #3D352E; 
                    --text-color-muted: #8D6E63;
                    --accent-primary: #C6A779; 
                    --accent-secondary: #EAE3DA; 
                    --accent-tertiary: #D7CCC8;
                    --border-color: #EAE3DA; 
                    --shadow-color: rgba(93, 64, 55, 0.15); 
                    --font-family-header: 'Lora', serif; 
                    --font-family-body: 'Inter', sans-serif; 
                    --border-radius: 16px; 
                    --card-bg: rgba(255,255,255,0.8); 
                    --glass-shadow: 0 8px 32px var(--shadow-color); 
                    --highlight-bg: rgba(198, 167, 121, 0.2);
                    --code-bg: rgba(234, 227, 218, 0.5);
                }

                /* --- GENERAL & LAYOUT --- */
                * { margin: 0; padding: 0; box-sizing: border-box; }
                
                body { 
                    background: var(--bg-color); 
                    color: var(--text-color); 
                    font-family: var(--font-family-body); 
                    font-size: var(--font-size-base); 
                    min-height: 100vh; 
                    transition: all 0.4s ease; 
                    line-height: 1.6;
                }
                
                h1, h2, h3, h4, h5, h6 { 
                    font-family: var(--font-family-header); 
                    line-height: 1.3; 
                    margin-bottom: 1rem;
                }
                
                p { 
                    line-height: 1.7; 
                    font-size: var(--font-size-p); 
                    margin-bottom: 1rem;
                }
                
                a { 
                    color: inherit; 
                    text-decoration: none; 
                    cursor: pointer;
                }
                
                strong { 
                    font-weight: 600; 
                    color: var(--accent-primary);
                }
                
                em { 
                    font-style: italic; 
                    color: var(--text-color-muted);
                }
                
                .main-container { 
                    display: grid; 
                    grid-template-columns: 320px 1fr; 
                    height: 100vh; 
                    max-height: 100vh; 
                }
                
                .sidebar-container { 
                    padding: 1.5rem; 
                    border-right: 2px solid var(--border-color); 
                    overflow-y: auto; 
                    background: var(--card-bg); 
                    backdrop-filter: blur(10px);
                }
                
                .theme-serene .sidebar-container { 
                    border-right: 1px solid var(--border-color); 
                    background: transparent;
                    box-shadow: inset -1px 0 0 var(--border-color);
                }
                
                .content-container { 
                    padding: 2rem; 
                    overflow-y: auto; 
                    position: relative; 
                }

                /* --- LOADING STATES --- */
                .loading-spinner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 200px;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* --- SEARCH & FILTERING --- */
                .search-container {
                    position: relative;
                    margin-bottom: 1rem;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-color-muted);
                    pointer-events: none;
                }

                .search-input {
                    width: 100%;
                    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
                    border: 2px solid var(--border-color);
                    border-radius: var(--border-radius);
                    background: var(--card-bg);
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }

                .theme-serene .search-input {
                    border: 1px solid var(--border-color);
                }

                .search-input:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 3px rgba(247, 202, 201, 0.1);
                }

                .sort-select {
                    width: 100%;
                    padding: 0.5rem;
                    border: 2px solid var(--border-color);
                    border-radius: var(--border-radius);
                    background: var(--card-bg);
                    font-size: 0.9rem;
                }

                .theme-serene .sort-select {
                    border: 1px solid var(--border-color);
                }

                .no-results {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: var(--text-color-muted);
                }
                
                /* --- HEADER WITH MUSIC CONTROLS --- */
                .site-header { 
                    text-align: center; 
                    padding: 2rem 1rem; 
                    margin-bottom: 2rem; 
                }
                
                .header-content { 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 2rem; 
                    max-width: 900px; 
                    margin: 0 auto; 
                }
                
                .header-image-container { 
                    position: relative; 
                    width: 120px; 
                    height: 120px; 
                    border-radius: 50%; /* Perfect circle */
                    overflow: hidden; 
                    border: 3px solid var(--border-color);
                    box-shadow: var(--neo-shadow);
                }
                
                .theme-serene .header-image-container { 
                    border: 2px solid var(--border-color); 
                    box-shadow: var(--glass-shadow);
                }
                
                .header-image { 
                    width: 100%; 
                    height: 100%; 
                    object-fit: cover; 
                    transition: transform 0.3s ease;
                }
                
                .is-header-playing .header-image { 
                    animation: spin 10s linear infinite; 
                }
                
                @keyframes spin { 
                    from { transform: rotate(0deg); } 
                    to { transform: rotate(360deg); } 
                }

                .header-text { 
                    text-align: left; 
                    flex: 1; 
                }
                
                .header-text h1 { 
                    font-size: var(--font-size-h1); 
                    margin-bottom: 1rem; 
                    background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .header-text p { 
                    color: var(--text-color-muted); 
                    opacity: 0.9; 
                    font-size: 1.1rem;
                }
                
                .header-controls { 
                    display: flex; 
                    align-items: center; 
                    gap: 1rem; 
                }
                
                .header-controls button { 
                    background: var(--card-bg); 
                    border: 2px solid var(--border-color); 
                    border-radius: 50%; 
                    width: 50px; 
                    height: 50px; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    transition: all 0.3s ease; 
                    backdrop-filter: blur(10px);
                }
                
                .theme-serene .header-controls button { 
                    border: 1px solid var(--border-color); 
                    box-shadow: var(--glass-shadow);
                }
                
                .theme-dreamy .header-controls button:hover { 
                    transform: scale(1.1) translateY(-2px); 
                    box-shadow: var(--neo-shadow);
                }
                
                .theme-serene .header-controls button:hover { 
                    transform: scale(1.05); 
                    box-shadow: 0 12px 40px var(--shadow-color);
                }

                /* --- SIDEBAR & WIDGETS --- */
                .sidebar-container .logo { 
                    font-family: var(--font-family-header); 
                    font-size: 1.2rem; 
                    margin-bottom: 2rem; 
                    text-align: center;
                    padding: 1rem;
                    background: var(--accent-primary);
                    border-radius: var(--border-radius);
                    color: white;
                }
                
                .sidebar-widget { 
                    margin-bottom: 2rem; 
                }
                
                .widget-title { 
                    text-transform: uppercase; 
                    font-size: 0.8rem; 
                    font-weight: 700; 
                    margin-bottom: 1rem; 
                    opacity: 0.8; 
                    letter-spacing: 0.5px;
                }
                
                .sidebar-widget ul { 
                    list-style: none; 
                }
                
                .sidebar-widget ul li a { 
                    display: block; 
                    padding: 0.75rem; 
                    cursor: pointer; 
                    transition: all 0.2s ease; 
                    border-radius: var(--border-radius);
                    margin-bottom: 0.25rem;
                }
                
                .sidebar-widget ul li a:hover { 
                    background: var(--accent-secondary); 
                    transform: translateX(4px);
                }
                
                .nav-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 0.75rem; 
                    padding: 0.75rem; 
                    margin: 0.25rem 0; 
                    border-radius: var(--border-radius); 
                    cursor: pointer; 
                    transition: all 0.3s ease; 
                    font-weight: 500; 
                    border: 2px solid transparent; 
                }
                
                .theme-dreamy .nav-item:hover { 
                    background: var(--accent-secondary); 
                    transform: translateX(4px); 
                    border-color: var(--accent-primary); 
                }
                
                .theme-serene .nav-item:hover { 
                    background: var(--accent-secondary); 
                    box-shadow: var(--glass-shadow);
                }
                
                .tag-cloud { 
                    display: flex; 
                    flex-wrap: wrap; 
                    gap: 0.5rem; 
                }
                
                .tag-cloud a { 
                    display: inline-block; 
                    padding: 0.4rem 0.8rem; 
                    border: 2px solid var(--border-color); 
                    border-radius: 20px; 
                    font-weight: 500; 
                    cursor: pointer; 
                    font-size: 0.8rem; 
                    transition: all 0.3s ease; 
                    background: var(--card-bg);
                }
                
                .theme-dreamy .tag-cloud a:hover { 
                    background: var(--accent-secondary); 
                    transform: translateY(-2px);
                    box-shadow: 2px 2px 0px var(--border-color);
                }
                
                .theme-serene .tag-cloud a { 
                    border: 1px solid var(--border-color); 
                    background: var(--accent-secondary); 
                }
                
                .theme-serene .tag-cloud a:hover { 
                    background: var(--accent-primary); 
                    color: white;
                }
                
                .language-buttons { 
                    display: flex; 
                    gap: 0.5rem; 
                }
                
                .lang-btn { 
                    flex: 1;
                    padding: 0.5rem 1rem; 
                    border: 2px solid var(--border-color); 
                    border-radius: var(--border-radius); 
                    background: var(--card-bg); 
                    cursor: pointer; 
                    font-weight: 500; 
                    transition: all 0.3s ease; 
                    text-align: center;
                }
                
                .theme-serene .lang-btn { 
                    border: 1px solid var(--border-color); 
                }
                
                .lang-btn.active { 
                    background: var(--accent-primary); 
                    color: white;
                    transform: scale(1.05);
                }

                /* --- CONTENT GRID & CARDS --- */
                .content-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
                    gap: 2rem; 
                }
                
                .content-card { 
                    background: var(--card-bg); 
                    backdrop-filter: blur(15px); 
                    border-radius: var(--border-radius); 
                    cursor: pointer; 
                    transition: all 0.4s ease; 
                    display: flex; 
                    flex-direction: column; 
                    overflow: hidden; 
                    position: relative;
                }
                
                .theme-dreamy .content-card { 
                    border: 3px solid var(--border-color); 
                }
                
                .theme-serene .content-card { 
                    border: 1px solid var(--border-color); 
                    box-shadow: 0 4px 20px var(--shadow-color); 
                }
                
                .content-card:hover { 
                    transform: translateY(-12px); 
                }
                
                .theme-dreamy .content-card:hover { 
                    box-shadow: var(--neo-shadow); 
                }
                
                .theme-serene .content-card:hover { 
                    box-shadow: 0 20px 60px var(--shadow-color); 
                }
                
                .card-image { 
                    width: 100%; 
                    height: 220px; 
                    object-fit: cover; 
                    transition: transform 0.4s ease;
                }
                
                .content-card:hover .card-image {
                    transform: scale(1.05);
                }
                
                .card-body { 
                    padding: 2rem; 
                    flex-grow: 1; 
                    display: flex; 
                    flex-direction: column; 
                }
                
                .card-type { 
                    font-weight: 700; 
                    font-size: 0.8rem; 
                    margin-bottom: 0.75rem; 
                    text-transform: uppercase; 
                    letter-spacing: 0.5px;
                    color: var(--accent-primary);
                }
                
                .card-title { 
                    font-size: var(--font-size-h3); 
                    margin-bottom: 1rem; 
                    line-height: 1.4;
                    font-weight: 600;
                }
                
                .tag-list { 
                    margin-top: auto; 
                    display: flex; 
                    flex-wrap: wrap; 
                    gap: 0.5rem; 
                }
                
                .tag-list .tag { 
                    display: inline-block; 
                    padding: 0.3rem 0.8rem; 
                    border: 2px solid var(--border-color); 
                    border-radius: 15px; 
                    font-size: 0.7rem; 
                    font-weight: 500; 
                    cursor: pointer; 
                    transition: all 0.3s ease; 
                    background: var(--accent-secondary);
                }
                
                .theme-dreamy .tag-list .tag:hover { 
                    background: var(--accent-primary); 
                    transform: translateY(-1px);
                }
                
                .theme-serene .tag-list .tag { 
                    border: 1px solid var(--border-color); 
                }
                
                .theme-serene .tag-list .tag:hover { 
                    background: var(--accent-primary); 
                    color: white;
                }
                
                /* --- DETAIL VIEW & ARTICLE --- */
                .detail-view { 
                    padding: 1rem; 
                    animation: fadeInUp 0.6s ease; 
                    max-width: 900px;
                    margin: 0 auto;
                }
                
                @keyframes fadeInUp { 
                    from { opacity: 0; transform: translateY(30px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                
                .back-button { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 0.5rem; 
                    margin-bottom: 2rem; 
                    padding: 0.75rem 1.5rem; 
                    border-radius: var(--border-radius); 
                    border: 2px solid var(--border-color); 
                    background: var(--card-bg); 
                    cursor: pointer; 
                    font-weight: 600; 
                    transition: all 0.3s ease;
                }
                
                .theme-serene .back-button { 
                    border: 1px solid var(--border-color); 
                }
                
                .back-button:hover {
                    background: var(--accent-secondary);
                    transform: translateX(-4px);
                }
                
                .article-header { 
                    text-align: center; 
                    margin-bottom: 3rem; 
                }
                
                .article-category-link { 
                    color: var(--accent-primary); 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    letter-spacing: 1px; 
                    margin-bottom: 1rem; 
                    display: inline-block;
                }
                
                .article-title { 
                    font-size: var(--font-size-h1); 
                    margin-bottom: 1.5rem; 
                    line-height: 1.2;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .article-meta { 
                    color: var(--text-color-muted); 
                    opacity: 0.9; 
                    font-size: 1rem;
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .article-meta span {
                    position: relative;
                }
                
                .article-meta span:not(:last-child)::after { 
                    content: '•'; 
                    margin-left: 1rem; 
                    opacity: 0.5;
                }
                
                .article-player { 
                    margin-bottom: 3rem; 
                }
                
                .article-featured-image { 
                    width: 100%; 
                    max-width: 800px; 
                    margin: 0 auto; 
                    border-radius: var(--border-radius); 
                    overflow: hidden; 
                    border: 3px solid var(--border-color); 
                    box-shadow: var(--neo-shadow);
                }
                
                .theme-serene .article-featured-image { 
                    border: 2px solid var(--border-color); 
                    box-shadow: var(--glass-shadow);
                }
                
                .article-featured-image img { 
                    width: 100%; 
                    height: auto; 
                    display: block; 
                }
                
                .player-controls { 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    gap: 1.5rem; 
                    margin-top: 2rem; 
                }
                
                .player-controls button { 
                    background: var(--card-bg); 
                    border: 2px solid var(--border-color); 
                    border-radius: 50%; 
                    width: 55px; 
                    height: 55px; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    transition: all 0.3s ease; 
                    backdrop-filter: blur(10px);
                }
                
                .player-controls button.play-pause-btn { 
                    width: 75px; 
                    height: 75px; 
                    background: var(--accent-primary); 
                    color: white;
                }
                
                .theme-serene .player-controls button { 
                    border: 1px solid var(--border-color); 
                    box-shadow: var(--glass-shadow);
                }
                
                .player-controls button:hover { 
                    transform: scale(1.1); 
                }
                
                .theme-dreamy .player-controls button:hover {
                    box-shadow: 3px 3px 0px var(--border-color);
                }

                /* --- ARTICLE TYPOGRAPHY --- */
                .article-body { 
                    max-width: 750px; 
                    margin: 0 auto; 
                    font-size: var(--font-size-p); 
                    line-height: 1.8;
                }

                .article-h2 {
                    font-size: var(--font-size-h2);
                    margin: 2rem 0 1rem 0;
                    color: var(--accent-primary);
                    border-bottom: 2px solid var(--accent-secondary);
                    padding-bottom: 0.5rem;
                }

                .article-h3 {
                    font-size: var(--font-size-h3);
                    margin: 1.5rem 0 0.75rem 0;
                    color: var(--text-color);
                    font-weight: 600;
                }

                .article-h4 {
                    font-size: var(--font-size-h4);
                    margin: 1.25rem 0 0.5rem 0;
                    color: var(--text-color-muted);
                    font-weight: 600;
                }

                .article-h5 {
                    font-size: var(--font-size-h5);
                    margin: 1rem 0 0.5rem 0;
                    color: var(--text-color-muted);
                    font-weight: 500;
                    font-style: italic;
                }

                .article-paragraph {
                    margin-bottom: 1.5rem;
                    text-align: justify;
                }

                .article-list-item {
                    margin-left: 2rem;
                    margin-bottom: 0.5rem;
                    list-style-type: disc;
                }

                .article-quote { 
                    border-left: 4px solid var(--accent-primary); 
                    padding: 1.5rem; 
                    margin: 2rem 0; 
                    font-style: italic; 
                    font-size: 1.1em; 
                    background: var(--highlight-bg);
                    border-radius: 0 var(--border-radius) var(--border-radius) 0;
                    position: relative;
                }

                .article-quote::before {
                    content: '"';
                    position: absolute;
                    top: -10px;
                    left: 20px;
                    font-size: 3rem;
                    color: var(--accent-primary);
                    opacity: 0.5;
                }
                
                .article-footer { 
                    margin-top: 4rem; 
                    padding-top: 2rem;
                    border-top: 2px solid var(--border-color);
                }

                .article-tags {
                    margin-bottom: 3rem;
                }

                .article-tags strong {
                    display: block;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }

                .article-tag {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    margin: 0.25rem;
                    background: var(--accent-secondary);
                    border: 2px solid var(--border-color);
                    border-radius: 25px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .theme-serene .article-tag {
                    border: 1px solid var(--border-color);
                }

                .article-tag:hover {
                    background: var(--accent-primary);
                    color: white;
                    transform: translateY(-2px);
                }

                .related-stories {
                    margin-top: 3rem;
                }

                .related-stories h3 {
                    margin-bottom: 1.5rem;
                    font-size: var(--font-size-h3);
                    text-align: center;
                }

                .related-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                }

                .related-card {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--card-bg);
                    border: 2px solid var(--border-color);
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .theme-serene .related-card {
                    border: 1px solid var(--border-color);
                    box-shadow: var(--glass-shadow);
                }

                .related-card:hover {
                    transform: translateY(-4px);
                    background: var(--accent-secondary);
                }

                .related-card img {
                    width: 80px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: var(--border-radius);
                }

                .related-content h4 {
                    font-size: 1rem;
                    margin-bottom: 0.25rem;
                    font-weight: 600;
                }

                .related-content p {
                    font-size: 0.8rem;
                    color: var(--text-color-muted);
                    margin: 0;
                }

                /* --- FOOTER --- */
                .site-footer { 
                    padding: 3rem 2rem 2rem; 
                    margin-top: 4rem; 
                    border-top: 2px solid var(--border-color); 
                    background: var(--card-bg); 
                    backdrop-filter: blur(15px);
                }
                
                .theme-serene .site-footer { 
                    border-top: 1px solid var(--border-color); 
                    background: transparent; 
                }
                
                .sitemap { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                    gap: 2rem; 
                    margin-bottom: 2rem; 
                }
                
                .sitemap-col h4 { 
                    margin-bottom: 1rem; 
                    font-size: 1.1rem;
                    color: var(--accent-primary);
                }
                
                .sitemap-col a, .sitemap-col p { 
                    display: block; 
                    margin-bottom: 0.75rem; 
                    opacity: 0.8; 
                    cursor: pointer; 
                    transition: all 0.2s ease;
                    line-height: 1.6;
                }

                .sitemap-col a:hover {
                    opacity: 1;
                    color: var(--accent-primary);
                    transform: translateX(4px);
                }

                .social-media {
                    text-align: center;
                    margin: 2rem 0;
                }

                .social-media h4 {
                    margin-bottom: 1rem;
                    color: var(--accent-primary);
                }

                .social-icons {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                }

                .social-icons a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    background: var(--card-bg);
                    border: 2px solid var(--border-color);
                    border-radius: 50%;
                    color: var(--text-color);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .theme-serene .social-icons a {
                    border: 1px solid var(--border-color);
                }

                .social-icons a:hover {
                    background: var(--accent-primary);
                    color: white;
                    transform: translateY(-4px);
                }

                .theme-dreamy .social-icons a:hover {
                    box-shadow: 3px 3px 0px var(--border-color);
                }
                
                .footer-bottom { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    border-top: 2px solid var(--border-color); 
                    padding-top: 2rem; 
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .theme-serene .footer-bottom { 
                    border-top: 1px solid var(--border-color); 
                }
                
                .heart-icon { 
                    display: inline-block; 
                    vertical-align: middle; 
                    animation: heartbeat 2s infinite; 
                    color: var(--accent-primary); 
                }
                
                @keyframes heartbeat { 
                    0%, 50%, 100% { transform: scale(1); } 
                    25% { transform: scale(1.3); } 
                }
                
                .footer-links {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .footer-links a { 
                    padding: 0.5rem 1rem;
                    text-decoration: underline; 
                    cursor: pointer; 
                    transition: all 0.2s ease;
                    border-radius: var(--border-radius);
                }

                .footer-links a:hover {
                    background: var(--accent-secondary);
                    text-decoration: none;
                }

                /* --- MODALS --- */
                .modal-overlay { 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100vw; 
                    height: 100vh; 
                    background: rgba(0,0,0,0.6); 
                    backdrop-filter: blur(15px); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    z-index: 2000; 
                    animation: fadeIn 0.3s; 
                }
                
                .modal-content { 
                    background: var(--bg-color); 
                    border: 3px solid var(--border-color); 
                    border-radius: var(--border-radius); 
                    padding: 2.5rem; 
                    width: 90%; 
                    max-width: 550px; 
                    position: relative; 
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .theme-dreamy .modal-content { 
                    box-shadow: var(--neo-shadow); 
                }
                
                .theme-serene .modal-content { 
                    border: 2px solid var(--border-color); 
                    box-shadow: var(--glass-shadow); 
                }

                .initial-choice .button-group {
                    gap: 1.5rem;
                }

                .initial-choice .setting-btn {
                    flex-direction: column;
                    padding: 2rem 1rem;
                    text-align: center;
                    gap: 1rem;
                }

                .initial-choice .setting-btn small {
                    opacity: 0.7;
                    font-size: 0.8rem;
                    font-weight: normal;
                }
                
                .modal-close-btn { 
                    position: absolute; 
                    top: 1rem; 
                    right: 1rem; 
                    background: none; 
                    border: none; 
                    cursor: pointer; 
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }

                .modal-close-btn:hover {
                    background: var(--accent-secondary);
                }
                
                .modal-content h2 { 
                    font-size: var(--font-size-h2); 
                    margin-bottom: 0.5rem; 
                }
                
                .modal-subtitle { 
                    opacity: 0.7; 
                    margin-bottom: 2rem; 
                    font-size: 1.1rem;
                }
                
                .setting-group { 
                    margin-bottom: 2rem; 
                }
                
                .setting-group h3 { 
                    font-size: var(--font-size-h3); 
                    margin-bottom: 1rem; 
                    color: var(--accent-primary);
                }
                
                .button-group { 
                    display: flex; 
                    gap: 1rem; 
                    flex-wrap: wrap; 
                }
                
                .setting-btn { 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 0.5rem; 
                    padding: 1rem 1.5rem; 
                    border: 2px solid var(--border-color); 
                    border-radius: var(--border-radius); 
                    cursor: pointer; 
                    background: var(--card-bg); 
                    font-weight: 600; 
                    flex: 1; 
                    min-width: 120px;
                    transition: all 0.3s ease;
                }
                
                .theme-serene .setting-btn { 
                    border: 1px solid var(--border-color); 
                }
                
                .setting-btn:hover {
                    transform: translateY(-2px);
                    background: var(--accent-secondary);
                }
                
                .setting-btn.active { 
                    background: var(--accent-primary); 
                    color: white;
                    transform: scale(1.05);
                }
                
                .form-layout { 
                    display: grid; 
                    gap: 1.5rem; 
                }
                
                .form-layout input, .form-layout textarea { 
                    width: 100%; 
                    padding: 1rem; 
                    border-radius: var(--border-radius); 
                    border: 2px solid var(--border-color); 
                    background: var(--card-bg); 
                    font-size: var(--font-size-p); 
                    transition: all 0.2s ease;
                    font-family: inherit;
                }
                
                .theme-serene .form-layout input, .theme-serene .form-layout textarea { 
                    border: 1px solid var(--border-color); 
                }

                .form-layout input:focus, .form-layout textarea:focus {
                    outline: none;
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 3px rgba(247, 202, 201, 0.1);
                }
                
                .submit-btn { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 0.5rem; 
                    width: 100%; 
                    justify-content: center; 
                    padding: 1.25rem; 
                    background: var(--accent-primary); 
                    border: 2px solid var(--border-color); 
                    border-radius: var(--border-radius); 
                    font-weight: 700; 
                    cursor: pointer; 
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    color: white;
                }
                
                .theme-serene .submit-btn { 
                    border: none; 
                    box-shadow: var(--glass-shadow);
                }

                .submit-btn:hover {
                    background: var(--accent-secondary);
                    transform: translateY(-2px);
                }
                
                /* --- RESPONSIVE DESIGN --- */
                .mobile-menu-btn { 
                    display: none; 
                }
                
                @media (max-width: 968px) {
                    .main-container { 
                        grid-template-columns: 1fr; 
                        height: auto; 
                    }
                    
                    .sidebar-container { 
                        display: none; 
                    }
                    
                    .content-container { 
                        padding: 1rem; 
                    }
                    
                    .header-content { 
                        flex-direction: column; 
                        text-align: center; 
                        gap: 1.5rem;
                    }
                    
                    .header-text { 
                        text-align: center; 
                    }

                    .content-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }

                    .article-meta {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .article-meta span:not(:last-child)::after {
                        display: none;
                    }

                    .player-controls {
                        gap: 1rem;
                    }

                    .player-controls button {
                        width: 45px;
                        height: 45px;
                    }

                    .player-controls button.play-pause-btn {
                        width: 65px;
                        height: 65px;
                    }

                    .related-grid {
                        grid-template-columns: 1fr;
                    }

                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                        gap: 1.5rem;
                    }

                    .sitemap {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    
                    .mobile-menu-btn { 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        position: fixed; 
                        bottom: 2rem; 
                        right: 2rem; 
                        z-index: 1000; 
                        width: 65px; 
                        height: 65px; 
                        border-radius: 50%; 
                        border: 3px solid var(--border-color); 
                        background: var(--accent-primary); 
                        cursor: pointer; 
                        color: white;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    }
                    
                    .theme-dreamy .mobile-menu-btn { 
                        box-shadow: var(--neo-shadow); 
                    }
                    
                    .theme-serene .mobile-menu-btn { 
                        border: 2px solid var(--border-color); 
                        box-shadow: var(--glass-shadow); 
                    }

                    .mobile-menu-btn:hover {
                        transform: scale(1.1);
                    }
                    
                    .mobile-menu-overlay { 
                        position: fixed; 
                        top: 0; 
                        left: 0; 
                        width: 100%; 
                        height: 100%; 
                        background: var(--bg-color); 
                        z-index: 1001; 
                        padding: 2rem; 
                        overflow-y: auto; 
                        animation: slideInRight 0.4s ease; 
                    }
                    
                    @keyframes slideInRight { 
                        from { transform: translateX(100%); } 
                        to { transform: translateX(0); } 
                    }
                    
                    .mobile-menu-close-btn { 
                        position: absolute; 
                        top: 2rem; 
                        right: 2rem; 
                        background: var(--accent-secondary); 
                        border: 2px solid var(--border-color); 
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer; 
                        transition: all 0.3s ease;
                    }

                    .mobile-menu-close-btn:hover {
                        background: var(--accent-primary);
                        color: white;
                    }
                }

                @media (max-width: 480px) {
                    .header-image-container {
                        width: 100px;
                        height: 100px;
                    }

                    .modal-content {
                        padding: 2rem;
                        margin: 1rem;
                    }

                    .button-group {
                        flex-direction: column;
                    }

                    .language-buttons {
                        flex-direction: column;
                    }
                }

                /* --- ACCESSIBILITY IMPROVEMENTS --- */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                button:focus-visible,
                input:focus-visible,
                textarea:focus-visible,
                select:focus-visible {
                    outline: 3px solid var(--accent-primary);
                    outline-offset: 2px;
                }
            `}</style>
            
            <div className="main-container">
                <div className="sidebar-container">
                    <div className="logo">想いの欠片 回憶圖書館</div>
                    <Sidebar />
                </div>
                <div className="content-container">
                    {activeItem ? (
                        <ItemDetailView item={activeItem} />
                    ) : (
                        <>
                            <div className="site-header">
                                <div className="header-content">
                                    <div className={`header-image-container ${isHeaderPlaying ? 'is-header-playing' : ''}`}>
                                        <img 
                                            src="https://placehold.co/120x120/F7CAC9/000000?text=♪" 
                                            alt="Daily Heroes"
                                            className="header-image"
                                        />
                                    </div>
                                    <div className="header-text">
                                        <h1>{headerContent[currentHeaderIndex].title[language]}</h1>
                                        <p>{headerContent[currentHeaderIndex].subtitle[language]}</p>
                                    </div>
                                    <div className="header-controls">
                                        <button 
                                            onClick={() => handleHeaderNavigation(-1)}
                                            aria-label="Previous header content"
                                        >
                                            <SkipBack size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleHeaderNavigation(1)}
                                            aria-label="Next header content"
                                        >
                                            <SkipForward size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="loading-spinner">
                                    <Loader size={40} className="spinner" />
                                </div>
                            ) : filteredContent.length === 0 ? (
                                <div className="no-results">
                                    <h3>{t('noResults')}</h3>
                                    <p>Try adjusting your search or filters.</p>
                                    <button onClick={clearFilters} className="back-button">
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="content-grid">
                                    {filteredContent.map(item => (
                                        <article key={item.id} className="content-card" onClick={() => setActiveItem(item)}>
                                            <img src={item.image} alt={item.title[language]} className="card-image" />
                                            <div className="card-body">
                                                <span className="card-type">
                                                    {item.type[language]} • {item.category[language]}
                                                </span>
                                                <h3 className="card-title">{item.title[language]}</h3>
                                                <div className="tag-list">
                                                    {item.tags.map(tag => (
                                                        <span key={tag} className="tag" onClick={(e) => { e.stopPropagation(); handleFilter('tag', tag); }}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                    <Footer />
                </div>
            </div>

            <Modal />

            <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(true)} aria-label="Open menu">
                <Menu size={24} />
            </button>

            {showMobileMenu && (
                <div className="mobile-menu-overlay">
                    <button className="mobile-menu-close-btn" onClick={() => setShowMobileMenu(false)} aria-label="Close menu">
                        <X size={24}/>
                    </button>
                    <Sidebar isMobile={true} />
                </div>
            )}
        </>
    );
    
}

// Find the 'root' div in index.html and tell React to take control of it.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your DailyHeroes component inside that div.
root.render(<DailyHeroes />);
