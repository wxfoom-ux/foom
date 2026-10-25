import { useState } from "react";
import { ArrowDown, ArrowUpRight, CircleDotDashed, Heart, Moon, Sparkles, Telescope } from "lucide-react";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import RippleDistortion from "@/components/RippleDistortion";

const moments = [
  { src: "/ghalia-galaxy.jpg", alt: "A glowing spiral galaxy in violet and rose light", title: "A galaxy made of wonder", note: "Somehow, every beautiful thing in the universe feels a little brighter when I think of you." },
  { src: "/ghalia-black-hole.jpg", alt: "A dreamy black hole with a luminous accretion disk", title: "Your gravity is different", note: "You have the kind of pull that makes every ordinary moment slow down and feel worth keeping." },
  { src: "/ghalia-cosmic-hero.jpg", alt: "A soft blue and violet nebula glowing among the stars", title: "Soft light, everywhere", note: "Even the quietest corner of space would feel warm if it carried a little of your kindness." },
  { src: "/ghalia-galaxy.jpg", alt: "A spiral galaxy floating in deep indigo space", title: "My favorite constellation", note: "If I mapped the sky by the things I love, your name would be the brightest constellation." },
  { src: "/ghalia-black-hole.jpg", alt: "A luminous black hole surrounded by starlight", title: "A beautiful mystery", note: "You are proof that the loveliest things do not need to explain themselves to be felt." },
  { src: "/ghalia-cosmic-hero.jpg", alt: "A heart-like nebula in a field of tiny stars", title: "A little universe for you", note: "No distance is too far for a small message: you are precious, you are loved, and you are never alone." },
];

const notes = [
  { number: "01", title: "For the way you light up a room", text: "You arrive, and somehow even the atmosphere changes. Being near you feels like finding a warm star in a very big sky." },
  { number: "02", title: "For the laugh I would know anywhere", text: "I hope the universe keeps sending you reasons to laugh today. And if it forgets, I will gladly become one." },
  { number: "03", title: "For the little things that are everything", text: "Your kindness, your spark, the way you notice what others miss — I keep these small miracles close, like constellations." },
];

const personalMessages = [
  { label: "A note from a quiet orbit", title: "You are my favorite light", text: "Dear Ghalia, there is a softness in you that makes even the busiest day feel calm. You make people feel seen, and that is a rare kind of magic." },
  { label: "For an ordinary night", title: "You make the everyday glow", text: "Dear Ghalia, if I could give you one thing, it would be the chance to see yourself the way I do: warm, thoughtful, and quietly radiant." },
  { label: "Kept in my constellation", title: "Your gravity feels like home", text: "Dear Ghalia, wherever life takes us, I hope you never doubt this: your happiness matters deeply, and I am endlessly glad that you are exactly who you are." },
  { label: "A message across the stars", title: "You are never too far", text: "Dear Ghalia, some people feel close even across galaxies. You are one of them — a little piece of home I can find anywhere." },
  { label: "For the days that run long", title: "Your light stays with me", text: "Dear Ghalia, even after a long day, remembering your smile makes the universe feel softer around the edges. I hope some of that warmth finds its way back to you." },
  { label: "No occasion needed", title: "Just because it is you", text: "Dear Ghalia, this note has no grand reason. I simply wanted you to know that you matter to me, and that being yourself is already more than enough." },
];

export default function Home() {
  const [activeBloom, setActiveBloom] = useState(0);
  const [openNote, setOpenNote] = useState<number | null>(null);
  const [openPersonalMessage, setOpenPersonalMessage] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const shareGarden = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch { setCopied(false); }
  };

  return (
    <main className="garden-shell cosmic-shell">
      <div className="starfield" aria-hidden="true" />
      <div className="ripple-backdrop" aria-hidden="true">
        <RippleDistortion src="/ghalia-cosmic-hero.jpg" brushSize={150} strength={0.2} swirl={1} rings={4} grayscale={false} spread={5} fade={3} spacing={15} dispersion={0} glint={0.2} tint="#8b5cf6" tintAmount={0.1} highlightColor="#ffffff" trigger="hover" clickStrength={2} quality="low" enabled className="ripple-backdrop__surface" />
      </div>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Cosmic Ghalia home">
          <span className="brand__seal"><Moon size={19} strokeWidth={1.5} /></span>
          <span className="brand__words"><strong>cosmic, Ghalia</strong><small>A little universe for you</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#garden">The cosmos</a><a href="#little-things">Little stars</a><a href="#love-letters">Sweet messages</a><a href="#letter">The signal</a>
        </nav>
        <button className="share-button" type="button" onClick={shareGarden}>{copied ? "Copied across the stars" : "Share this universe"}<ArrowUpRight size={15} /></button>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero__copy">
          <div className="eyebrow"><span className="eyebrow__line" />A SMALL UNIVERSE FOR GHALIA <span className="eyebrow__sparkle">✦</span></div>
          <h1 id="hero-title">For you,<br /><em>Ghalia.</em></h1>
          <p className="hero__lead">Somewhere between a shooting star and a soft little moon, there is a whole universe of sweet words for you.</p>
          <a className="round-cta" href="#garden"><span>Wander through<br />your cosmos</span><i><ArrowDown size={18} /></i></a>
          <span className="hero__scribble" aria-hidden="true">you are my favorite sky</span>
        </div>
        <div className="hero__art">
          <div className="hero__photo-wrap"><img src="/ghalia-cosmic-hero.jpg" alt="A glowing nebula and stars made for Ghalia" fetchPriority="high" /><div className="hero__photo-glaze" /><div className="hero__caption"><span>01 / A PLACE TO BEGIN</span><span>Made for your kind of magic</span></div></div>
          <div className="hero__stamp" aria-label="Made with love"><Heart size={14} fill="currentColor" /><span>made<br />with starlight</span></div>
          <div className="hero__flower-mark" aria-hidden="true">✦</div>
        </div>
        <div className="hero__footnote"><span>SCROLL A LITTLE</span><span className="hero__footnote-line" /></div>
      </section>

      <section className="intro-strip" aria-label="A note for Ghalia"><span className="intro-strip__ornament">✦</span><p>Some people make the whole universe feel more <em>beautiful.</em><br className="desktop-break" /> You have always been one of them.</p><span className="intro-strip__signature">A little truth, just for you <Heart size={13} /></span></section>

      <section className="garden-section" id="garden" aria-labelledby="garden-title">
        <div className="section-heading"><div className="eyebrow"><span className="eyebrow__line" />TAKE YOUR TIME</div><h2 id="garden-title">A few wonders<br /><em>I keep close</em> when<br />I think of you.</h2><p>Every scene holds a small thought.<br />Choose one, and let it tell you.</p><span className="section-heading__flower" aria-hidden="true">✧</span></div>
        <div className="garden-gallery"><InfiniteSpiral flowers={moments} onSelect={setActiveBloom} /><div className="bloom-note" aria-live="polite" key={activeBloom}><span className="bloom-note__index">A COSMIC THOUGHT · {String(activeBloom + 1).padStart(2, "0")}</span><h3>{moments[activeBloom].title}</h3><p>{moments[activeBloom].note}</p><span className="bloom-note__rule" /></div><div className="gallery-side-note" aria-hidden="true"><span>ROTATE GENTLY</span><span>✦</span></div></div>
      </section>

      <section className="notes-section" id="little-things" aria-labelledby="notes-title"><div className="notes-section__header"><div><div className="eyebrow"><span className="eyebrow__line" />KEPT IN ORBIT, ALWAYS</div><h2 id="notes-title">Little star notes<br /><em>for the in-between.</em></h2></div><p>For no particular reason.<br />For every reason, really.</p></div><div className="notes-list">{notes.map((note, index) => <article className={`note-card ${openNote === index ? "note-card--open" : ""}`} key={note.number}><span className="note-card__number">{note.number}</span><div className="note-card__body"><h3>{note.title}</h3><div className="note-card__reveal" aria-hidden={openNote !== index}><p>{note.text}</p></div></div><button className="note-card__toggle" type="button" aria-expanded={openNote === index} onClick={() => setOpenNote(openNote === index ? null : index)}><span className="sr-only">{openNote === index ? "Close star note" : "Open star note"}</span><span aria-hidden="true">{openNote === index ? "−" : "+"}</span></button><span className="note-card__petal" aria-hidden="true">{index === 1 ? "✦" : "✧"}</span></article>)}</div><div className="notes-section__whisper"><Sparkles size={14} /> The best things shine without a special occasion.</div></section>

      <section className="personal-letters" id="love-letters" aria-labelledby="personal-letters-title"><div className="personal-letters__heading"><div className="eyebrow"><span className="eyebrow__line" />JUST BETWEEN THE STARS</div><h2 id="personal-letters-title">Little messages,<br /><em>meant for Ghalia.</em></h2><p>Choose a planet, open a note, and keep the words that feel like yours.</p></div><div className="personal-letters__grid">{personalMessages.map((message, index) => { const isOpen = openPersonalMessage === index; return <article className={`personal-letter ${isOpen ? "personal-letter--open" : ""}`} key={message.title}><span className="personal-letter__label">{message.label}</span><span className="personal-letter__ornament" aria-hidden="true">{index === 1 ? "◌" : "✦"}</span><span className="personal-letter__burst" aria-hidden="true"><i>✦</i><i>✧</i><i>·</i></span><h3>{message.title}</h3><div className="personal-letter__reveal" aria-hidden={!isOpen}><p>{message.text}</p></div><button className="personal-letter__toggle" type="button" aria-expanded={isOpen} onClick={() => setOpenPersonalMessage(isOpen ? null : index)}><Heart size={15} fill={isOpen ? "currentColor" : "none"} />{isOpen ? "Fold this message" : "Open your message"}</button></article>; })}</div></section>

      <section className="letter-section" id="letter" aria-labelledby="letter-title"><div className="letter-section__backdrop" aria-hidden="true" /><div className="letter-card"><div className="letter-card__top"><span>ONE LAST SIGNAL</span><Telescope size={15} /></div><span className="letter-card__small-flower" aria-hidden="true">✦</span><h2 id="letter-title">If every star<br />in the universe went quiet,</h2><p className="letter-card__verse">I would still find a way to tell you<br />how glad I am that <em>you</em> are here.</p><div className="letter-card__divider"><span />✧<span /></div><p className="letter-card__dedication">For Ghalia, with all my heart.</p><span className="letter-card__signoff">always, always</span></div><div className="letter-section__side-note">AN ENDING? <span>NOT EVEN CLOSE.</span></div></section>

      <footer className="footer"><a className="brand brand--footer" href="#home" aria-label="Back to top"><span className="brand__seal"><CircleDotDashed size={17} strokeWidth={1.5} /></span><span className="brand__words"><strong>cosmic, Ghalia</strong><small>For Ghalia, always.</small></span></a><span className="footer__note">A small corner of the universe, made softer for you.</span><span className="footer__credit">Original cosmic artwork, made with love for Ghalia.</span></footer>
    </main>
  );
}
