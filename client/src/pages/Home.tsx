import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Globe2, Menu, Minus, Plus, Sparkles, X } from "lucide-react";
import Galaxy from "@/components/Galaxy";

type Language = "ar" | "en";

type Copy = {
  nav: { story: string; chapters: string; constellation: string };
  hero: { overline: string; title: string; english: string; subtitle: string; cta: string; hint: string };
  letter: { kicker: string; title: string; body: string[]; aside: string };
  chapters: { kicker: string; title: string; intro: string; open: string; close: string };
  constellation: { kicker: string; title: string; intro: string; hint: string };
  closing: { kicker: string; title: string; body: string; cta: string };
  footer: string;
};

const copy: Record<Language, Copy> = {
  ar: {
    nav: { story: "الرسالة", chapters: "الفصول", constellation: "الكوكبة" },
    hero: { overline: "مجرة صغيرة، لاسم واحد", title: "غالية", english: "GHALIA", subtitle: "Some names are written in the stars.", cta: "ادخلي إلى عالمك", hint: "المسّي نجمة غالية أو انقري في أي مكان خالٍ" },
    letter: { kicker: "الفصل الأول · من بين كل النجوم", title: "من بين كل النجوم", body: ["إنني أريدكِ أنتِ بالتحديد.", "لم يعد لديّ وصف محدد للشخص الذي قد يفضّله قلبي، فقد تجاوزتُ لأجلكِ كل القواعد التي ظننتُ أنني لن أتجاوزها يومًا.", "من بين مئات الوجوه، ومن بين كل الذين مرّوا في حياتي، لم يمِل قلبي إلا إليكِ، ولم تعرف عيناي ذلك القدر من السعادة إلا حين رأتاكِ.", "وكل ما تمنّيته يومًا، أن تكوني أنتِ...", "أنتِ، ولا أحد غيركِ."], aside: "هناك نجوم لا نحتاج إلى الوصول إليها كي نهتدي بها." },
    chapters: { kicker: "خريطة ضوء", title: "أشياء لا تُقال", intro: "بعض المعاني لا تصل في جملة واحدة. اتركي لكل فصل لحظته، ودعي الضوء يكمل ما بين السطور.", open: "افتحي الفصل", close: "أغلقي الفصل" },
    constellation: { kicker: "فصل الكوكبة · اضغطي على النجوم", title: "بعض الأضواء لا تخبو", intro: "كل نقطة هنا تحمل جملة صغيرة. اختاري نجمة، أو تنقّلي بينها بلوحة المفاتيح.", hint: "مرّري المؤشر فوق النجوم أو المسّيها" },
    closing: { kicker: "إلى غالية", title: "بعض الأسماء تجعل الكون أجمل.", body: "هذه ليست محاولة لاختصار الكون في اسمكِ، بل محاولة صغيرة لأقول إن وجودكِ يترك في هذا العالم ضوءًا لا يشبه سواه.", cta: "عودي إلى البداية" },
    footer: "صُنعت من ضوء هادئ، خصيصًا لغالية.",
  },
  en: {
    nav: { story: "The letter", chapters: "Chapters", constellation: "Constellation" },
    hero: { overline: "A small galaxy, for one name", title: "Ghalia", english: "GHALIA", subtitle: "Some names are written in the stars.", cta: "Enter your universe", hint: "Touch Ghalia's star, or click anywhere in the quiet" },
    letter: { kicker: "Chapter one · Among All the Stars", title: "Among All the Stars", body: ["I wanted you.", "You, specifically.", "I no longer had a list of qualities for the person my heart would choose. Somehow, for you, I crossed every boundary I once believed I never would.", "Among hundreds of faces, among all the people who came and went, my heart found its way only to you. And nothing brought quite the same happiness to my eyes as the sight of you.", "Of all the things I ever wished for, it was you. You, and no one else."], aside: "There are stars we never need to reach in order to find our way." },
    chapters: { kicker: "A map of light", title: "Things left unsaid", intro: "Some meanings do not arrive in a single sentence. Let each chapter have its moment, and let the light finish what lives between the lines.", open: "Open chapter", close: "Close chapter" },
    constellation: { kicker: "Constellation chapter · choose a star", title: "Some lights never fade", intro: "Each point carries a small sentence. Choose a star, or move through them with your keyboard.", hint: "Hover or touch the stars" },
    closing: { kicker: "To Ghalia", title: "Some names make the universe more beautiful.", body: "This is not an attempt to fit the entire universe into your name. It is simply a small way of saying that your presence leaves behind a light unlike any other.", cta: "Return to the beginning" },
    footer: "Made from quiet light, especially for Ghalia.",
  },
};

const chapters = [
  { id: "01", arTitle: "أشياء لا تُقال", enTitle: "Things Left Unsaid", ar: "هناك أشخاص لا يمرّون في حياتنا مرورًا عابرًا، بل يتركون في أرواحنا ضوءًا لا يشبه أي ضوء.", en: "Some people do not simply pass through our lives. They leave behind a light unlike any other.", accent: "gold" },
  { id: "02", arTitle: "بين المجرّات", enTitle: "Between Galaxies", ar: "لو أن لهذا الكون ذاكرة، لاحتفظت نجومه باسمكِ، كما احتفظت ذاكرتي بأجمل التفاصيل.", en: "If the universe could remember, its stars would carry your name, just as my memory carries the loveliest details.", accent: "lavender" },
  { id: "03", arTitle: "النجمة التي لا تشبه سواها", enTitle: "The Star Unlike Any Other", ar: "ليست كل النجوم بعيدة، فبعضها يترك ضوءه في قلوبنا، حتى وإن حالت بيننا وبينه المسافات.", en: "Not every star is truly distant. Some leave their light within us, even when miles lie between us.", accent: "ice" },
  { id: "04", arTitle: "أمنية صغيرة", enTitle: "A Small Wish", ar: "لم أكن أتمنى أن يتوقف الزمن، بل تمنّيت فقط أن تطول اللحظات الجميلة، وأن تبقى ذكراها دافئة مهما ابتعدت.", en: "I never wished for time to stop. I only wished the beautiful moments could last a little longer, and that their memory would remain warm across any distance.", accent: "gold" },
  { id: "05", arTitle: "إلى غالية", enTitle: "To Ghalia", ar: "هذه ليست محاولة لاختصار الكون في اسمكِ، بل محاولة صغيرة لأقول إن بعض الأسماء تجعل هذا الكون أجمل.", en: "This is not an attempt to fit the entire universe into your name. It is simply a small way of saying that some names make the universe more beautiful.", accent: "lavender" },
];

const constellationMessages = [
  { ar: "بعض الأضواء لا تخبو.", en: "Some lights never fade." },
  { ar: "في المسافة أيضًا، أثرٌ للحنين.", en: "Distance has its own kind of longing." },
  { ar: "ما يبقى ليس دائمًا ما نلمسه.", en: "What remains is not always what we can touch." },
  { ar: "اسمكِ نقطة هادئة في اتساع العالم.", en: "Your name is a quiet point in a very wide world." },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "ar";
    return window.localStorage.getItem("ghalia-language") === "en" ? "en" : "ar";
  });
  const [openChapter, setOpenChapter] = useState<number | null>(0);
  const [activeConstellation, setActiveConstellation] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [interactionPulse, setInteractionPulse] = useState(0);
  const t = copy[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "غالية — عالمكِ مكتوب في النجوم" : "GHALIA — A Universe Written in Starlight";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = isArabic ? "غالية — عالم شخصي مكتوب في النجوم، بتجربة فضائية سينمائية ثنائية اللغة." : "Ghalia — a personal universe written in the stars, built as a bilingual cinematic experience.";
    const socialDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (socialDescription) socialDescription.content = isArabic ? "Some names are written in the stars." : "A cinematic universe written for Ghalia.";
    window.localStorage.setItem("ghalia-language", language);
  }, [isArabic, language]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.14 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => setLanguage((current) => current === "ar" ? "en" : "ar");
  const enterUniverse = useCallback(() => {
    setEntered(true);
    window.setTimeout(() => document.querySelector("#letter")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }, []);
  const handleGalaxyInteraction = useCallback((interaction: { kind: "stardust" | "pointer" }) => {
    if (interaction.kind === "stardust") setInteractionPulse((value) => value + 1);
  }, []);

  const navItems = useMemo(() => [
    { href: "#letter", label: t.nav.story },
    { href: "#chapters", label: t.nav.chapters },
    { href: "#constellation", label: t.nav.constellation },
  ], [t]);

  return (
    <main className={`cosmos-shell ${entered ? "cosmos-shell--entered" : ""} ${isArabic ? "is-arabic" : "is-english"}`}>
      <div className="cosmos-backdrop" aria-hidden="true">
        <div className="cosmos-aurora cosmos-aurora--one" />
        <div className="cosmos-aurora cosmos-aurora--two" />
        <Galaxy density={1.05} glowIntensity={0.3} flareIntensity={1} starSpeed={0.5} mouseRepulsion clickWarp starColors={[]} hueShift={140} saturation={0} starSize={1} twinkleIntensity={0.3} speed={1} rotationSpeed={0.1} layers={4} direction="forward" repulsionStrength={2} mouseInteraction intro lightMode={false} ariaLabel={isArabic ? "سماء تفاعلية. انقري في الكون لصنع غبار نجمي." : "Interactive starfield. Click the universe to create stardust."} onInteraction={handleGalaxyInteraction} />
        <div className="cosmos-vignette" />
        <div className="cosmos-noise" />
      </div>
      <div className={`interaction-signal ${interactionPulse ? "interaction-signal--active" : ""}`} key={interactionPulse} aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label={isArabic ? "غالية — العودة إلى البداية" : "Ghalia — return to beginning"}>
          <span className="wordmark__orbit"><span /></span>
          <span><strong>GHALIA</strong><small>{isArabic ? "كونٌ مكتوب من ضوء" : "A universe in starlight"}</small></span>
        </a>
        <nav className={`site-nav ${mobileNavOpen ? "site-nav--open" : ""}`} aria-label={isArabic ? "التنقل الرئيسي" : "Primary navigation"}>
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}>
            <Globe2 size={15} strokeWidth={1.4} /><span>{isArabic ? "EN" : "ع"}</span>
          </button>
          <button className="menu-toggle" type="button" aria-expanded={mobileNavOpen} aria-label={mobileNavOpen ? (isArabic ? "إغلاق القائمة" : "Close menu") : (isArabic ? "فتح القائمة" : "Open menu")} onClick={() => setMobileNavOpen((value) => !value)}>
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <section className="hero-section" id="home" aria-labelledby="hero-title">
        <div className="hero-meta"><span>01</span><span className="meta-line" /><span>{isArabic ? "رحلة شخصية عبر الفضاء" : "A personal journey through space"}</span></div>
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.overline}</p>
          <h1 id="hero-title"><span>{t.hero.title}</span><em>{t.hero.english}</em></h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <button className="hero-cta" type="button" onClick={enterUniverse}><span>{t.hero.cta}</span><ArrowDown size={17} strokeWidth={1.2} /></button>
          <p className="hero-hint"><span className="hero-hint__dot" />{t.hero.hint}</p>
        </div>
        <button className="ghalia-star" type="button" onClick={enterUniverse} aria-label={isArabic ? "نجمة غالية — افتحي الرحلة" : "Ghalia star — open the journey"}>
          <span className="ghalia-star__halo" /><span className="ghalia-star__core" /><span className="ghalia-star__label"><strong>GHALIA</strong><small>غالية</small></span>
        </button>
        <div className="hero-footer"><span>LAT 140° · LONG 36°</span><span className="hero-footer__scroll"><span />{isArabic ? "مرّري لاكتشاف المزيد" : "Scroll to discover"}</span><span>EST. IN STARLIGHT</span></div>
      </section>

      <section className="letter-section section-shell reveal-on-scroll" id="letter" aria-labelledby="letter-title">
        <div className="section-number">02 <span /></div>
        <div className="letter-aside"><span className="vertical-label">{isArabic ? "رسالة عبر المسافة" : "A letter across distance"}</span><span className="aside-orbit" /></div>
        <div className="letter-content">
          <p className="section-kicker">{t.letter.kicker}</p>
          <h2 id="letter-title">{t.letter.title}</h2>
          <div className="letter-body">{t.letter.body.map((paragraph, index) => <p className={index === 0 || index === t.letter.body.length - 1 ? "letter-body__emphasis" : ""} key={paragraph}>{paragraph}</p>)}</div>
          <div className="letter-signature"><span className="signature-line" /><span>{t.letter.aside}</span></div>
        </div>
        <div className="letter-marker" aria-hidden="true"><span>∞</span><small>GHALIA</small></div>
      </section>

      <section className="chapters-section section-shell reveal-on-scroll" id="chapters" aria-labelledby="chapters-title">
        <div className="chapters-intro"><p className="section-kicker">{t.chapters.kicker}</p><h2 id="chapters-title">{t.chapters.title}<span>·</span></h2><p>{t.chapters.intro}</p></div>
        <div className="chapters-list">
          {chapters.map((chapter, index) => {
            const active = openChapter === index;
            return <article className={`chapter-card chapter-card--${chapter.accent} ${active ? "chapter-card--open" : ""}`} key={chapter.id}>
              <button type="button" className="chapter-trigger" onClick={() => setOpenChapter(active ? null : index)} aria-expanded={active} aria-controls={`chapter-copy-${chapter.id}`}>
                <span className="chapter-id">{chapter.id}</span><span className="chapter-title"><strong>{isArabic ? chapter.arTitle : chapter.enTitle}</strong><small>{isArabic ? chapter.enTitle : chapter.arTitle}</small></span><span className="chapter-action">{active ? <Minus size={16} /> : <Plus size={16} />}<span className="sr-only">{active ? t.chapters.close : t.chapters.open}</span></span>
              </button>
              <div className="chapter-copy" id={`chapter-copy-${chapter.id}`} aria-hidden={!active}><p>{isArabic ? chapter.ar : chapter.en}</p></div>
            </article>;
          })}
        </div>
      </section>

      <section className="constellation-section section-shell reveal-on-scroll" id="constellation" aria-labelledby="constellation-title">
        <div className="constellation-copy"><p className="section-kicker">{t.constellation.kicker}</p><h2 id="constellation-title">{t.constellation.title}</h2><p>{t.constellation.intro}</p><span className="constellation-hint"><Sparkles size={15} strokeWidth={1.2} />{t.constellation.hint}</span><div className="constellation-message" aria-live="polite"><span>0{activeConstellation + 1}</span><p>{isArabic ? constellationMessages[activeConstellation].ar : constellationMessages[activeConstellation].en}</p></div></div>
        <div className="constellation-map" role="group" aria-label={isArabic ? "كوكبة غالية التفاعلية" : "Interactive Ghalia constellation"}>
          <svg className="constellation-lines" viewBox="0 0 600 440" aria-hidden="true"><path d="M78 312 L164 182 L284 245 L391 100 L510 168 L456 332 L284 245 L206 390" /><path d="M164 182 L391 100" /><path d="M284 245 L456 332" /></svg>
          {[{ x: "27%", y: "70%" }, { x: "41%", y: "41%" }, { x: "59%", y: "55%" }, { x: "76%", y: "23%" }, { x: "85%", y: "38%" }, { x: "76%", y: "75%" }, { x: "34%", y: "89%" }].map((position, index) => <button type="button" key={`${position.x}-${position.y}`} className={`constellation-star ${index === 2 ? "constellation-star--center" : ""} ${activeConstellation === index % constellationMessages.length ? "constellation-star--active" : ""}`} style={{ left: position.x, top: position.y }} onClick={() => setActiveConstellation(index % constellationMessages.length)} onFocus={() => setActiveConstellation(index % constellationMessages.length)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); setActiveConstellation((index + 1) % constellationMessages.length); } if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); setActiveConstellation((index - 1 + constellationMessages.length) % constellationMessages.length); } }} aria-label={`${isArabic ? "رسالة الكوكبة" : "Constellation message"} ${index + 1}`}><span /></button>)}
          <span className="map-caption map-caption--one">GHALIA / غالية</span><span className="map-caption map-caption--two">03 · 18 · ∞</span>
        </div>
      </section>

      <section className="closing-section section-shell reveal-on-scroll" aria-labelledby="closing-title">
        <div className="closing-orbit" aria-hidden="true"><span /><i /><i /><i /></div>
        <div className="closing-copy"><p className="section-kicker">{t.closing.kicker}</p><h2 id="closing-title">{t.closing.title}</h2><p>{t.closing.body}</p><button className="text-link" type="button" onClick={() => document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })}>{t.closing.cta}<ArrowUpRight size={15} /></button></div>
      </section>

      <footer className="site-footer"><span>GHALIA · 2026</span><span>{t.footer}</span><span>∞</span></footer>
    </main>
  );
}
