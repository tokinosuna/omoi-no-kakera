const headerContent = [
    {
        title: { en: "Daily Heroes", de: "Tägliche Helden", zh: "日常英雄" },
        subtitle: { en: "A space to celebrate the small acts of kindness, dedication, and creativity that make our world better. Discover inspiring stories and share your own.", de: "Ein Raum, um die kleinen Akte der Freundlichkeit, Hingabe und Kreativität zu feiern, die unsere Welt besser machen. Entdecke inspirierende Geschichten und teile deine eigenen.", zh: "一個慶祝小小善行、奉獻和創造力的空間，讓我們的世界變得更美好。發現鼓舞人心的故事並分享您自己的故事。" }
    },
    {
        title: { en: "Every Story Matters", de: "Jede Geschichte zählt", zh: "每個故事都很重要" },
        subtitle: { en: "From the barista who remembers your name to the neighbor who tends a community garden, heroes walk among us every day.", de: "Vom Barista, der sich an deinen Namen erinnert, bis zum Nachbarn, der einen Gemeinschaftsgarten pflegt – Helden wandeln täglich unter uns.", zh: "從記住您名字的咖啡師到照料社區花園的鄰居，英雄每天都在我們身邊。" }
    }
];

const contentData = [
    { 
        id: "welcome-1", 
        type: { en: "Announcement", de: "Ankündigung", zh: "站務公告" }, 
        title: { en: "Welcome to Daily Heroes", de: "Willkommen bei Tägliche Helden", zh: "歡迎來到日常英雄" }, 
        category: { en: "About Us", de: "Über Uns", zh: "關於我們" }, 
        image: "https://placehold.co/800x450/B5EAD7/000000?text=Welcome!", 
        tags: ["welcome", "community", "mission", "share"], 
        content: {
            en: `## A Place for Your Story
This is a space dedicated to the quiet heroes and the small, significant moments that shape our lives. We believe that heroism isn't just about grand gestures; it's found in the **patience of a teacher**, the **dedication of a craftsman**, the **kindness of a stranger**, and the **comfort of a childhood keepsake**.

### Our Mission
Our mission is simple: to create a collection of stories that remind us of the goodness, creativity, and resilience of the human spirit. We want to celebrate the barista who knows your order by heart, the neighbor who tends a community garden, and the friend who listens without judgment. These are the daily heroes who make our world a brighter place.

This is not just our collection; it's our shared community archive. Your experiences, your memories, and your tributes are the heart of this project. If you have a story of a person, a place, or even an object that holds special meaning, we invite you to share it.

> Your story matters here.`, 
            de: `## Ein Ort für deine Geschichte
Dies ist ein Raum, der den stillen Helden und den kleinen, bedeutsamen Momenten gewidmet ist, die unser Leben formen. Wir glauben, dass Heldentum nicht nur aus großen Gesten besteht; es findet sich in der **Geduld eines Lehrers**, der **Hingabe eines Handwerkers**, der **Freundlichkeit eines Fremden** und dem **Trost eines Andenkens aus der Kindheit**.

### Unsere Mission
Unsere Mission ist einfach: eine Sammlung von Geschichten zu schaffen, die uns an die Güte, Kreativität und Widerstandsfähigkeit des menschlichen Geistes erinnern. Wir möchten den Barista feiern, der deine Bestellung auswendig kennt, den Nachbarn, der einen Gemeinschaftsgarten pflegt, und den Freund, der ohne Urteil zuhört. Das sind die täglichen Helden, die unsere Welt zu einem helleren Ort machen.

> Deine Geschichte zählt hier.`,
            zh: `## 一個屬於你的故事空間
這是一個獻給那些默默無聞的英雄，以及構成我們生命的、微小而意義深遠的片刻。我們相信，英雄主義不只存在於偉大的事蹟中；它體現在**一位老師的耐心**、**一位職人的執著**、**一位陌生人的善意**，以及**一件童年信物的慰藉**之中。

### 我們的使命
我們的使命很簡單：建立一個故事典藏館，提醒我們人性的良善、創造力與韌性。我們想讚揚那位記得你喜好的咖啡師、那位照料社區花園的鄰居、那位不帶批判傾聽的朋友。這些，就是讓世界更明亮的日常英雄。

> 你的故事，在這裡很重要。`
        }, 
        author: { en: "The Curator", de: "Der Kurator", zh: "館長" }, 
        date: "2025-02-22",
        readTime: "2 min"
    },
    { 
        id: "hero-1", 
        type: { en: "Tribute", de: "Tribut", zh: "致敬" }, 
        title: { en: "My Little Blanket: A Time Capsule of Tenderness", de: "Meine kleine Decke: Eine Zeitkapsel der Zärtlichkeit", zh: "我的小被被：一件乘載25年溫柔的時光信物" }, 
        category: { en: "Memory Musings", de: "Erinnerungen", zh: "記憶隨筆" }, 
        image: "https://placehold.co/800x450/F7CAC9/000000?text=My+Little+Blanket", 
        tags: ["nostalgia", "family", "childhood", "keepsake"], 
        content: {
            en: `Everyone has a "talisman" that holds extraordinary meaning. For me, it's a **yellowish-white cotton blanket**—I call it *'my little blankie.'* It’s not a fancy brand, nor does it have ornate patterns, but it has been with me since the moment I was born, for over ***twenty-five years*** now.

My grandma picked it out. She said a baby's skin is tender and needs the best pure cotton. Twenty-five years of washing have made it incredibly soft, with fuzzy pills at the corners and some spots so thin you can almost see through them. But it's this worn-in feeling that carries an irreplaceable warmth.

### The Scent of Peace
What's most magical is its unique scent—a mix of sunshine, laundry soap, and years of skin contact that creates an indescribable "blankie smell." To me, its unique scent is the synonym of **'peace of mind.'** Whether it was the anxiety of moving into a dorm or facing challenges alone after starting my career, burying my face in my little blankie could instantly calm all my anxieties, as if grandma's warm hand was gently patting my back.

> It’s not just a blanket; it’s a portable sanctuary, the sum of grandma’s love, childhood carefree days, and all peaceful dreams.

It has witnessed all my secrets. I cried on it, dreamed wild dreams, and held it tight when I was sick. Every fold, every little ball of fluff is like a coordinate of memory. This little blanket is my time machine—with just a gentle touch, I can return to that original self who still believed in fairy tales and was curious about the world.`,
            de: `Jeder hat einen "Talisman", der eine außergewöhnliche Bedeutung hat. Für mich ist es eine **gelblich-weiße Baumwolldecke** – ich nenne sie *'mein kleines Deckchen'*. Es ist keine schicke Marke und hat auch keine kunstvollen Muster, aber sie ist seit meiner Geburt bei mir, seit über ***fünfundzwanzig Jahren***.

Meine Oma hat sie ausgesucht. Sie sagte, die Haut eines Babys sei zart und brauche die beste reine Baumwolle. Fünfundzwanzig Jahre Waschen haben sie unglaublich weich gemacht, mit Fusseln an den Ecken und einigen Stellen, die so dünn sind, dass man fast hindurchsehen kann. Aber es ist dieses abgenutzte Gefühl, das eine unersetzliche Wärme in sich birgt.

### Der Duft des Friedens
Am magischsten ist ihr einzigartiger Duft – eine Mischung aus Sonne, Waschmittel und jahrelangem Hautkontakt, die einen unbeschreiblichen "Deckchenduft" erzeugt. Für mich ist dieser Geruch das Synonym für **'Seelenfrieden'**. Als ob Omas warme Hand sanft meinen Rücken tätschelt.

> Sie ist nicht nur eine Decke; sie ist ein tragbares Refugium, die Summe der Liebe meiner Oma, sorgloser Kindheitstage und all der friedlichen Träume.

Jede Falte, jeder kleine Fussel ist wie eine Koordinate der Erinnerung. Diese kleine Decke ist meine Zeitmaschine.`,
            zh: `每個人的生命中，或許都有一件意義非凡的**「信物」**。對我而言，那是一條泛黃的米白色棉質毯子——我稱之為*「我的小被被」*。它不是什麼名貴的品牌，也沒有華麗的圖案，但它從我出生的那一刻起，就陪伴在我身邊，至今已超過***二十五個年頭***。

這條小被被，是阿嬤在我出生時，到鎮上的棉被店親手挑選的。她說，嬰兒的皮膚嫩，要用最好的純棉才行。二十五年的歲月，早已將它洗滌得無比柔軟，邊角起了毛球，有些地方甚至薄得透光。但正是這種殘舊感，讓它承載了無可取代的溫暖。

### 安心的氣味
最奇妙的是它獨有的氣味。那是一種混合了陽光、洗衣精、以及長年累月肌膚接觸後形成的，難以言喻的「被被味」。對我而言，那是**「安心」**的代名詞。無論是求學時搬進宿舍的不安，或是出社會後獨自面對挑戰的夜晚，只要將臉埋進小被被，那熟悉的氣味就能瞬間撫平所有焦躁，彷彿阿嬤溫熱的手掌正輕輕拍著我的背。

> 它不只是一條毯子；它是一個可攜式的避風港，是阿嬤的愛、童年的無憂無慮，以及所有安穩夢境的總和。

它見證了我所有的祕密。我在它上面流過淚、做過天馬行空的夢，也曾在生病時緊緊將它擁在懷中。毯子上的每一處摺痕、每一顆毛球，都像是記憶的座標。這條小被被，是我的時光機，輕輕一觸，就能回到那個還相信童話、對世界充滿好奇的，最初的自己。`
        }, 
        author: { en: "The Curator", de: "Der Kurator", zh: "館長" }, 
        date: "2025-05-20",
        readTime: "5 min"
    },
    { 
        id: "hero-2", 
        type: { en: "Community Story", de: "Gemeinschaftsgeschichte", zh: "社群故事" }, 
        title: { en: "The Patient Dog Walker", de: "Der geduldige Hundeführer", zh: "有耐心的遛狗人" }, 
        category: { en: "Community Stories", de: "Gemeinschaftsgeschichten", zh: "社群故事" }, 
        image: "https://placehold.co/800x450/92A8D1/FFFFFF?text=🐾", 
        tags: ["kindness", "animals", "patience", "community"], 
        content: {
            en: `## Healing Hearts, One Leash at a Time
In our neighborhood, there's a quiet hero you might miss if you're not paying attention. Every day, rain or shine, **Mr. Henderson** can be seen walking a small pack of shelter dogs. But these aren't just any dogs; he specializes in the ***scared, anxious, and forgotten ones***.

### The Art of Patience
With endless patience, he teaches them that a raised hand can be for petting, not hitting, and that a soft voice can be a source of comfort. Each walk is a lesson in trust. His quiet, consistent kindness makes these dogs adoptable, finding them **forever homes** they might otherwise never have seen.

> "It's not about the walking—it's about showing them that humans can be kind."

Mr. Henderson transforms not just the dogs, but our entire neighborhood's understanding of **compassion in action**. He is a daily reminder that the biggest changes often start with the smallest, most patient steps.`, 
            de: `## Heilende Herzen, eine Leine nach der anderen
In unserer Nachbarschaft gibt es einen stillen Helden, den man leicht übersieht, wenn man nicht aufpasst. Jeden Tag, bei Regen oder Sonnenschein, kann man **Mr. Henderson** sehen, wie er mit einem kleinen Rudel Tierheimhunde spazieren geht. Er spezialisiert sich auf die ***verängstigten, ängstlichen und vergessenen***.

### Die Kunst der Geduld
Mit unendlicher Geduld lehrt er sie, dass eine erhobene Hand zum Streicheln da sein kann. Jeder Spaziergang ist eine Lektion in Vertrauen. Seine ruhige, beständige Freundlichkeit macht diese Hunde vermittelbar und findet für sie **ein Zuhause für immer**.

> "Es geht nicht ums Spazierengehen – es geht darum, ihnen zu zeigen, dass Menschen freundlich sein können."

Mr. Henderson ist eine tägliche Erinnerung daran, dass die größten Veränderungen oft mit den kleinsten, geduldigsten Schritten beginnen.`, 
            zh: `## 一次一條牽繩，治癒受傷的心
在我們的社區裡，有一位如果你不留心，就可能錯過的無名英雄。每天，無論風雨，您都可以看到**亨德森先生**帶著一群收容所的狗狗散步。但他專門照顧那些***受驚、焦慮和被遺忘的狗狗***。

### 耐心的藝術
他用無盡的耐心，教導牠們舉起的手可以是為了撫摸而非傷害，溫柔的聲音可以是安慰的來源。每一次散步都是一堂關於信任的課。他安靜而持續的善意，讓這些狗狗變得能夠被領養，為牠們找到了**永遠的家**。

> 「重要的不是散步本身——而是向牠們展示，人類也可以是善良的。」

他每天都在提醒我們，最巨大的改變，往往始於最微小、最耐心的步伐。`
        }, 
        author: { en: "Community Member", de: "Community-Mitglied", zh: "社群成員" }, 
        date: "2025-06-06",
        readTime: "3 min"
    },
    { 
        id: "hero-3", 
        type: { en: "Recruitment", de: "Rekrutierung", zh: "訪談招募" }, 
        title: { en: "Seeking Artisan Stories", de: "Suche nach Handwerkergeschichten", zh: "尋找職人故事" }, 
        category: { en: "Interview Recruitment", de: "Interview-Rekrutierung", zh: "訪談招募" }, 
        image: "https://placehold.co/800x450/DDA0DD/FFFFFF?text=🛠️", 
        tags: ["craftsmanship", "career", "interview", "share"], 
        content: {
            en: `## Share Your Craft: We're Seeking the Stories Behind the Skill
Every creation holds a story of passion, dedication, and countless hours of practice. We believe that true mastery is more than just skill—it's about the love you pour into your work. That's why we are looking for individuals with a **unique craft or skill** to share their journey with our community.

Whether you are a ***master carpenter*** reviving old traditions, a *digital artist* painting with pixels, or a **traditional chef** preserving family recipes, we want to hear your story.

### We are particularly interested in:
- The **passion** that drives you.
- Your **dedication** to excellence and the challenges you've overcome.
- The **wisdom** you've gained and wish to share with others.

> "True mastery isn't just about skill—it's about the love you put into every creation."

Your story matters. Contact us to be featured in our upcoming series celebrating the ***spirit of craftsmanship***.`, 
            de: `## Teile dein Handwerk: Wir suchen die Geschichten hinter dem Können
Jede Schöpfung birgt eine Geschichte von Leidenschaft und Hingabe. Wir glauben, dass wahre Meisterschaft mehr ist als nur Können – es geht um die Liebe, die man in seine Arbeit steckt. Deshalb suchen wir Personen mit einem **einzigartigen Handwerk oder einer besonderen Fähigkeit**, die ihre Reise mit unserer Gemeinschaft teilen.

Ob Sie ein ***Tischlermeister***, ein *Digitalkünstler* oder ein **traditioneller Koch** sind, wir möchten Ihre Geschichte hören.

### Wir sind besonders interessiert an:
- Der **Leidenschaft**, die Sie antreibt.
- Ihrer **Hingabe** zur Exzellenz.
- Der **Weisheit**, die Sie erlangt haben.

> "Wahre Meisterschaft ist nicht nur Können – es ist die Liebe, die Sie in jede Schöpfung einbringen."`, 
            zh: `## 分享您的手藝：我們在尋找技術背後的故事
每一件作品，都蘊藏著一個關於熱情、執著與無數小時練習的故事。我們相信，真正的精通不僅僅是技能——更是您傾注於作品中的愛。因此，我們正在尋找擁有**獨特工藝或技能**的您，來與我們的社群分享您的心路歷程。

無論您是復興古老傳統的***木工大師***、用像素繪畫的*數位藝術家*，還是保存家族食譜的**傳統廚師**，我們都想聽聽您的故事。

### 我們尤其希望聽見：
- 驅動您的那份**熱情**。
- 您對卓越的**奉獻**與克服挑戰的經歷。
- 您所獲得的，並願意與他人分享的**智慧**。

> 「真正的精通不僅僅是技能——而是您投入每件作品中的愛。」

您的故事很重要。歡迎與我們聯繫，讓我們在即將推出的***「職人精神」***系列中，為您喝采。`
        }, 
        author: { en: "Admin", de: "Admin", zh: "管理員" }, 
        date: "2025-07-07",
        readTime: "2 min"
    },
    { 
        id: "hero-4", 
        type: { en: "Hero Story", de: "Heldengeschichte", zh: "英雄故事" }, 
        title: { en: "The Midnight Programmer", de: "Der Mitternachtsprogrammierer", zh: "午夜程式設計師" }, 
        category: { en: "Technology", de: "Technologie", zh: "科技" }, 
        image: "https://placehold.co/800x450/FFB6C1/000000?text=💻", 
        tags: ["technology", "dedication", "open-source", "impact"], 
        content: {
            en: `## The Code That Writes Poetry for Humanity
While the city sleeps, a different kind of poetry is being written. **Sarah Chen** codes through the night, not for profit, but for ***purpose***. She is one of the countless unsung heroes of the open-source world, whose contributions have helped millions of developers and users worldwide.

### The Silent Impact
Her work might be invisible to most. But every bug she fixes, every feature she improves, every tool she creates makes the digital world a little more **inclusive** and **reliable** for everyone. While others sleep, Sarah is debugging, optimizing, and building the silent infrastructure that powers our daily lives.

> "Code is poetry, and every line should serve humanity."

Her dedication is a powerful reminder that heroism can be found in the quiet, persistent effort to build a better world, one line of code at a time.`, 
            de: `## Der Code, der Poesie für die Menschheit schreibt
Während die Stadt schläft, wird eine andere Art von Poesie geschrieben. **Sarah Chen** programmiert die ganze Nacht, nicht für Profit, sondern für einen ***Zweck***. Sie ist eine der unzähligen unbesungenen Helden der Open-Source-Welt.

### Der stille Einfluss
Ihre Arbeit mag für die meisten unsichtbar sein. Aber jeder Fehler, den sie behebt, und jedes Werkzeug, das sie erschafft, macht die digitale Welt ein wenig **inklusiver** und **zuverlässiger**.

> "Code ist Poesie, und jede Zeile sollte der Menschheit dienen."

Ihr Engagement ist eine kraftvolle Erinnerung daran, dass Heldentum im stillen, beharrlichen Bemühen gefunden werden kann, eine bessere Welt zu schaffen.`, 
            zh: `## 為人類寫詩的程式碼
當城市沉睡時，一種不同的詩篇正在被譜寫。**陳莎拉**整夜編寫程式，不是為了利潤，而是為了***一個目標***。她是開源世界中無數無名英雄之一，她的貢獻已幫助了全球數百萬的開發者與使用者。

### 無聲的影響
對大多數人來說，她的工作可能是看不見的。但她修復的每一個錯誤、改善的每一個功能，都讓數位世界對每個人來說都更具**包容性**與**可靠性**。

> 「程式碼是詩歌，而每一行都應為人類服務。」

她的奉獻精神有力地提醒著我們，英雄主義，就存在於那份安靜而執著的努力之中——一次一行程式碼，打造一個更美好的世界。`
        }, 
        author: { en: "Tech Community", de: "Tech-Community", zh: "科技社群" }, 
        date: "2024-08-10",
        readTime: "4 min"
    }
];
