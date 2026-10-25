import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Circle, Globe2, Menu, MoveDown, Sparkles, X } from "lucide-react";
import Galaxy from "@/components/Galaxy";

type Language = "ar" | "en";

const chapters = [
  { number: "01", arTitle: "من بين كل النجوم", enTitle: "Among All the Stars", arText: "إنني أريدكِ أنتِ بالتحديد. من بين مئات الوجوه، ومن بين كل الذين مرّوا في حياتي، لم يمِل قلبي إلا إليكِ.", enText: "I wanted you. You, specifically. Among hundreds of faces, among all the people who came and went, my heart found its way only to you.", tone: "gold" },
  { number: "02", arTitle: "أشياء لا تُقال", enTitle: "Things Left Unsaid", arText: "هناك أشخاص لا يمرّون في حياتنا مرورًا عابرًا، بل يتركون في أرواحنا ضوءًا لا يشبه أي ضوء.", enText: "Some people do not simply pass through our lives. They leave behind a light unlike any other.", tone: "violet" },
  { number: "03", arTitle: "إلى غالية", enTitle: "To Ghalia", arText: "هذه ليست محاولة لاختصار الكون في اسمكِ، بل محاولة صغيرة لأقول إن بعض الأسماء تجعل هذا الكون أجمل.", enText: "This is not an attempt to fit the universe into your name. It is a small way of saying that some names make it more beautiful.", tone: "blue" },
];

const constellationNotes = [
  { ar: "بعض الأضواء لا تخبو.", en: "Some lights never fade." },
  { ar: "في المسافة أيضًا، أثرٌ للحنين.", en: "Distance has its own kind of longing." },
  { ar: "اسمكِ نقطة هادئة في اتساع العالم.", en: "Your name is a quiet point in a very wide world." },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => typeof window !== "undefined" && localStorage.getItem("ghalia-language") === "en" ? "en" : "ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeNote, setActiveNote] = useState(0);
  const [progress, setProgress] = useState(0);
  const isArabic = language === "ar";
  const t = useMemo(() => language === "ar" ? {
    nav: ["البداية", "الرسالة", "الفصول", "الكوكبة"],
    eyebrow: "تجربة شخصية، مكتوبة في ضوء النجوم",
    title: "غالية",
    subtitle: "كونٌ صغير، لاسمٍ واحد.",
    lead: "بعض الأسماء لا تُقال فقط. تُرى، وتُحس، وتبقى معلّقة في السماء.",
    enter: "ابدئي الرحلة",
    scroll: "مرّري لاكتشاف المزيد",
    index: "المشهد الأول · نقطة البداية",
    letterKicker: "المشهد الثاني · الرسالة",
    letterTitle: "من بين كل النجوم",
    letterBody: ["إنني أريدكِ أنتِ بالتحديد.", "لم يعد لديّ وصف محدد للشخص الذي قد يفضّله قلبي، فقد تجاوزتُ لأجلكِ كل القواعد التي ظننتُ أنني لن أتجاوزها يومًا.", "وكل ما تمنّيته يومًا، أن تكوني أنتِ... أنتِ، ولا أحد غيركِ."],
    letterNote: "هناك نجوم لا نحتاج إلى الوصول إليها كي نهتدي بها.",
    chaptersKicker: "المشهد الثالث · مسارات الضوء",
    chaptersTitle: "أشياء لا تُقال",
    chaptersLead: "اتركي لكل فصل لحظته. ليس كل ما يستحق البقاء يحتاج إلى صوتٍ عالٍ.",
    constellationKicker: "المشهد الرابع · الكوكبة",
    constellationTitle: "اسمكِ في السماء",
    constellationLead: "اختاري نجمة. كل نقطة تحمل جملة صغيرة، وكل جملة تعرف طريقها إليكِ.",
    constellationHint: "اضغطي على النجوم",
    finalKicker: "المشهد الأخير · إلى غالية",
    finalTitle: "بعض الأسماء تجعل الكون أجمل.",
    finalBody: "هذه ليست محاولة لاختصار الكون في اسمكِ، بل طريقة صغيرة لأقول إن وجودكِ يترك في هذا العالم ضوءًا لا يشبه سواه.",
    finalCta: "عودي إلى البداية",
    footer: "صُنعت من ضوء هادئ، خصيصًا لغالية.",
  } : {
    nav: ["Beginning", "The letter", "Chapters", "Constellation"],
    eyebrow: "A personal experience, written in starlight",
    title: "Ghalia",
    subtitle: "A small universe, for one name.",
    lead: "Some names are not simply spoken. They are seen, felt, and left suspended in the sky.",
    enter: "Begin the journey",
    scroll: "Scroll to discover",
    index: "Scene one · The beginning",
    letterKicker: "Scene two · The letter",
    letterTitle: "Among All the Stars",
    letterBody: ["I wanted you.", "You, specifically. I no longer had a list of qualities for the person my heart would choose. Somehow, for you, I crossed every boundary I once believed I never would.", "Of all the things I ever wished for, it was you. You, and no one else."],
    letterNote: "There are stars we never need to reach in order to find our way.",
    chaptersKicker: "Scene three · Paths of light",
    chaptersTitle: "Things Left Unsaid",
    chaptersLead: "Let each chapter have its moment. Not everything worth keeping needs a loud voice.",
    constellationKicker: "Scene four · The constellation",
    constellationTitle: "Your name in the sky",
    constellationLead: "Choose a star. Each point carries a small sentence, and every sentence knows its way to you.",
    constellationHint: "Choose a star",
    finalKicker: "Final scene · To Ghalia",
    finalTitle: "Some names make the universe more beautiful.",
    finalBody: "This is not an attempt to fit the universe into your name. It is simply a small way of saying that your presence leaves behind a light unlike any other.",
    finalCta: "Return to the beginning",
    footer: "Made from quiet light, especially for Ghalia.",
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "غالية — كونٌ صغير لاسمٍ واحد" : "GHALIA — A small universe, for one name";
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", isArabic ? "تجربة سينمائية شخصية لغالية، مكتوبة في ضوء النجوم." : "A cinematic personal universe written for Ghalia in starlight.");
    localStorage.setItem("ghalia-language", language);
  }, [isArabic, language]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("scene--visible")), { threshold: .18 });
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className={`luxury-site ${isArabic ? "is-arabic" : "is-english"}`}>
      <div className="luxury-cosmos" aria-hidden="true"><Galaxy density={.82} glowIntensity={.26} flareIntensity={.7} starSpeed={.28} mouseRepulsion clickWarp starColors={["#F7F4ED", "#D7BD89", "#9288C4", "#A9C8DB"]} hueShift={154} saturation={0} starSize={.72} twinkleIntensity={.22} speed={.7} rotationSpeed={.055} layers={5} direction="forward" repulsionStrength={1.35} mouseInteraction intro lightMode={false} /><div className="cosmos-veil" /><div className="cosmos-grain" /></div>
      <div className="progress-rail" aria-hidden="true"><span style={{ height: `${Math.max(8, progress * 100)}%` }} /></div>

      <header className="luxury-header">
        <button className="brand-lockup" type="button" onClick={() => scrollTo("#scene-home")} aria-label={isArabic ? "العودة إلى البداية" : "Return to beginning"}><span className="brand-mark"><i /><b /></span><span><strong>GHALIA</strong><small>{isArabic ? "أرشيف الضوء" : "THE LIGHT ARCHIVE"}</small></span></button>
        <nav className={`luxury-nav ${menuOpen ? "luxury-nav--open" : ""}`} aria-label={isArabic ? "التنقل الرئيسي" : "Primary navigation"}>{t.nav.map((label, index) => <button key={label} type="button" onClick={() => scrollTo(["#scene-home", "#scene-letter", "#scene-chapters", "#scene-constellation"][index])}><span>0{index + 1}</span>{label}</button>)}</nav>
        <div className="header-tools"><button className="lang-button" type="button" onClick={() => setLanguage(language === "ar" ? "en" : "ar")} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}><Globe2 size={15} />{isArabic ? "EN" : "ع"}</button><button className="mobile-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </header>

      <section className="cinema-scene scene-home scene--visible" id="scene-home" data-scene aria-labelledby="hero-title">
        <div className="scene-index"><span>01</span><i /><small>{t.index}</small></div>
        <div className="hero-composition">
          <div className="hero-statement"><p className="micro-label">{t.eyebrow}</p><h1 id="hero-title">{t.title}<em>GHALIA</em></h1><p className="hero-subtitle">{t.subtitle}</p><p className="hero-lead">{t.lead}</p><button className="gold-action" type="button" onClick={() => scrollTo("#scene-letter")}><span>{t.enter}</span><ArrowDown size={16} /></button></div>
          <div className="hero-orbit"><div className="orbit-ring orbit-ring--one" /><div className="orbit-ring orbit-ring--two" /><button className="hero-star" type="button" onClick={() => scrollTo("#scene-letter")} aria-label={isArabic ? "نجمة غالية — ابدئي الرحلة" : "Ghalia star — begin the journey"}><span /><small>GHALIA<br />غالية</small></button><div className="orbit-caption"><span>34° 12′ N</span><span>ARCHIVE / 01</span></div></div>
        </div>
        <div className="scene-bottom"><span>{isArabic ? "مجرة شخصية" : "A PERSONAL GALAXY"}</span><span className="scroll-prompt"><MoveDown size={14} />{t.scroll}</span><span>∞</span></div>
      </section>

      <section className="cinema-scene letter-scene" id="scene-letter" data-scene aria-labelledby="letter-title">
        <div className="scene-index"><span>02</span><i /><small>{t.letterKicker}</small></div>
        <div className="letter-layout"><div className="scene-heading"><p className="micro-label">{t.letterKicker}</p><h2 id="letter-title">{t.letterTitle}</h2><div className="heading-rule" /></div><div className="letter-sheet"><span className="sheet-corner">GH / 001</span>{t.letterBody.map((paragraph, index) => <p className={index === 0 ? "letter-lead" : ""} key={paragraph}>{paragraph}</p>)}<div className="sheet-signature"><span /><small>{t.letterNote}</small></div></div></div>
        <div className="scene-bottom"><span>THE LETTER / 001</span><span>{isArabic ? "اقرئي ببطء" : "READ SLOWLY"}</span><span><ArrowDown size={14} /></span></div>
      </section>

      <section className="cinema-scene chapters-scene" id="scene-chapters" data-scene aria-labelledby="chapters-title">
        <div className="scene-index"><span>03</span><i /><small>{t.chaptersKicker}</small></div>
        <div className="chapters-layout"><div className="scene-heading"><p className="micro-label">{t.chaptersKicker}</p><h2 id="chapters-title">{t.chaptersTitle}<em>·</em></h2><p className="heading-description">{t.chaptersLead}</p><div className="chapter-progress"><span style={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }} /></div><small className="chapter-count">0{activeChapter + 1} / 0{chapters.length}</small></div><div className="chapter-gallery">{chapters.map((chapter, index) => <button key={chapter.number} className={`chapter-panel chapter-panel--${chapter.tone} ${activeChapter === index ? "chapter-panel--active" : ""}`} type="button" onClick={() => setActiveChapter(index)}><span className="panel-number">{chapter.number}</span><span className="panel-orb" /><span className="panel-copy"><strong>{isArabic ? chapter.arTitle : chapter.enTitle}</strong><small>{isArabic ? chapter.enTitle : chapter.arTitle}</small><span>{isArabic ? chapter.arText : chapter.enText}</span></span><ArrowUpRight className="panel-arrow" size={18} /></button>)}</div></div>
        <div className="scene-bottom"><span>THE LIGHT ARCHIVE</span><span>{isArabic ? "اختاري مسارًا" : "CHOOSE A PATH"}</span><span>03</span></div>
      </section>

      <section className="cinema-scene constellation-scene" id="scene-constellation" data-scene aria-labelledby="constellation-title">
        <div className="scene-index"><span>04</span><i /><small>{t.constellationKicker}</small></div>
        <div className="constellation-layout"><div className="constellation-copy"><p className="micro-label">{t.constellationKicker}</p><h2 id="constellation-title">{t.constellationTitle}</h2><p>{t.constellationLead}</p><span className="touch-hint"><Sparkles size={14} />{t.constellationHint}</span><div className="note-display"><span>0{activeNote + 1}</span><p>{isArabic ? constellationNotes[activeNote].ar : constellationNotes[activeNote].en}</p></div></div><div className="constellation-stage"><svg viewBox="0 0 620 470" aria-hidden="true"><path d="M74 337 L169 180 L302 250 L400 96 L529 169 L463 351 L302 250 L212 405" /><path d="M169 180 L400 96" /><path d="M302 250 L463 351" /></svg>{[{ x: "12%", y: "72%" }, { x: "28%", y: "38%" }, { x: "49%", y: "53%" }, { x: "66%", y: "20%" }, { x: "84%", y: "36%" }, { x: "73%", y: "75%" }, { x: "35%", y: "87%" }].map((position, index) => <button key={`${position.x}-${position.y}`} className={`constellation-dot ${activeNote === index % constellationNotes.length ? "constellation-dot--active" : ""}`} style={{ left: position.x, top: position.y }} type="button" onClick={() => setActiveNote(index % constellationNotes.length)} onFocus={() => setActiveNote(index % constellationNotes.length)} aria-label={`${isArabic ? "رسالة نجمة" : "Star note"} ${index + 1}`}><span /></button>)}<small className="constellation-label">GHALIA / غالية</small><small className="constellation-coordinates">03 · 18 · ∞</small></div></div>
        <div className="scene-bottom"><span>CONSTELLATION / 004</span><span>{isArabic ? "كل نقطة تحمل معنى" : "EVERY POINT HOLDS MEANING"}</span><span>∞</span></div>
      </section>

      <section className="cinema-scene finale-scene" data-scene aria-labelledby="final-title"><div className="scene-index"><span>05</span><i /><small>{t.finalKicker}</small></div><div className="finale-layout"><div className="finale-sun"><span /><i /><i /><i /></div><div className="finale-copy"><p className="micro-label">{t.finalKicker}</p><h2 id="final-title">{t.finalTitle}</h2><p>{t.finalBody}</p><button className="text-action" type="button" onClick={() => scrollTo("#scene-home")}>{t.finalCta}<ArrowUpRight size={16} /></button></div></div><div className="scene-bottom"><span>GHALIA · 2026</span><span>{t.footer}</span><span>∞</span></div></section>

      <footer className="luxury-footer"><span>GHALIA / THE LIGHT ARCHIVE</span><span>{isArabic ? "صُنعت من ضوء هادئ" : "MADE FROM QUIET LIGHT"}</span><span>05—05</span></footer>
    </main>
  );
}
