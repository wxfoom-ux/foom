import { useState } from "react";
import { ArrowDown, ArrowUpRight, Flower2, Heart, Sparkles } from "lucide-react";
import InfiniteSpiral from "@/components/InfiniteSpiral";

const flowers = [
  { src: "/images/rose-garden.jpg", alt: "A rose arch glowing in a garden at golden hour", title: "The place you bloom", note: "Some places feel like a deep breath. You feel like that to me — the quiet kind of magic that makes everything softer." },
  { src: "/images/peonies-sunset.jpg", alt: "Blush peonies catching the last light of the day", title: "A softer kind of light", note: "You have this way of making an ordinary day look like it was painted just for us. I hope you know how rare that is." },
  { src: "/images/ranunculus.jpg", alt: "Pale pink ranunculus gathered into a delicate bouquet", title: "A hundred little things", note: "It is never only one thing. It is your laugh, your heart, your little details — all the reasons I keep choosing you." },
  { src: "/images/soft-blooms.jpg", alt: "A cloud of softly colored garden blooms", title: "Gentle, always", note: "Even the loudest days feel quieter when I think of you. You are my favorite kind of peace." },
  { src: "/images/pastel-bouquet.jpg", alt: "A tender bouquet of pastel flowers", title: "A note between petals", note: "If I could tuck a little reminder into every flower, it would say: you are loved more than words know how to hold." },
  { src: "/images/deep-rose.jpg", alt: "Deep red roses arranged in a romantic bouquet", title: "My favorite forever", note: "No grand occasion needed. Today, and all the quiet tomorrows after it, I am simply grateful that you are you." },
];

const notes = [
  { number: "01", title: "For the way you make a room feel warmer", text: "You arrive, and somehow even the light seems to settle in differently. Being near you feels like finding the sunny side of every day." },
  { number: "02", title: "For the laugh I would know anywhere", text: "I hope the world gives you a thousand reasons to laugh today. And if it forgets, I hope you remember I would spend all day trying." },
  { number: "03", title: "For the little things that are everything", text: "Your kindness, your spark, the way you notice what others miss — I collect these things quietly, like petals pressed into a favorite book." },
];

export default function Home() {
  const [activeBloom, setActiveBloom] = useState(0);
  const [openNote, setOpenNote] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const shareGarden = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="garden-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Bloom for Abeer home">
          <span className="brand__seal"><Flower2 size={19} strokeWidth={1.5} /></span>
          <span className="brand__words"><strong>petal &amp; promise</strong><small>A little garden for Abeer</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#garden">The garden</a>
          <a href="#little-things">Little things</a>
          <a href="#letter">The letter</a>
        </nav>
        <button className="share-button" type="button" onClick={shareGarden}>
          {copied ? "Copied with love" : "Share this garden"}<ArrowUpRight size={15} />
        </button>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero__copy">
          <div className="eyebrow"><span className="eyebrow__line" />A GARDEN MADE OF WORDS <span className="eyebrow__sparkle">✳</span></div>
          <h1 id="hero-title">For you,<br /><em>Abeer.</em></h1>
          <p className="hero__lead">A thousand flowers could never say it quite like this — but let them try.</p>
          <a className="round-cta" href="#garden"><span>Wander through<br />your garden</span><i><ArrowDown size={18} /></i></a>
          <span className="hero__scribble" aria-hidden="true">with all my heart</span>
        </div>
        <div className="hero__art">
          <div className="hero__photo-wrap">
            <img src="/images/rose-garden.jpg" alt="An arch of roses in a sunlit garden" fetchPriority="high" />
            <div className="hero__photo-glaze" />
            <div className="hero__caption"><span>01 / A PLACE TO BEGIN</span><span>Made for your kind of lovely</span></div>
          </div>
          <div className="hero__stamp" aria-label="Made with love"><Heart size={14} fill="currentColor" /><span>made<br />with love</span></div>
          <div className="hero__flower-mark" aria-hidden="true">✿</div>
        </div>
        <div className="hero__footnote"><span>SCROLL A LITTLE</span><span className="hero__footnote-line" /></div>
      </section>

      <section className="intro-strip" aria-label="A note for Abeer">
        <span className="intro-strip__ornament">✳</span>
        <p>Some people make the world feel more <em>beautiful.</em><br className="desktop-break" /> You have always been one of them.</p>
        <span className="intro-strip__signature">A little truth, just for you <Heart size={13} /></span>
      </section>

      <section className="garden-section" id="garden" aria-labelledby="garden-title">
        <div className="section-heading">
          <div className="eyebrow"><span className="eyebrow__line" />TAKE YOUR TIME</div>
          <h2 id="garden-title">A few things<br /><em>that bloom</em> when<br />I think of you.</h2>
          <p>Every flower holds a small thought.<br />Choose one, and let it tell you.</p>
          <span className="section-heading__flower" aria-hidden="true">✿</span>
        </div>
        <div className="garden-gallery">
          <InfiniteSpiral flowers={flowers} onSelect={setActiveBloom} />
          <div className="bloom-note" aria-live="polite" key={activeBloom}>
            <span className="bloom-note__index">A SMALL THOUGHT · {String(activeBloom + 1).padStart(2, "0")}</span>
            <h3>{flowers[activeBloom].title}</h3>
            <p>{flowers[activeBloom].note}</p>
            <span className="bloom-note__rule" />
          </div>
          <div className="gallery-side-note" aria-hidden="true"><span>ROTATE GENTLY</span><span>♡</span></div>
        </div>
      </section>

      <section className="notes-section" id="little-things" aria-labelledby="notes-title">
        <div className="notes-section__header">
          <div>
            <div className="eyebrow"><span className="eyebrow__line" />KEPT CLOSE, ALWAYS</div>
            <h2 id="notes-title">Little love notes<br /><em>for the in-between.</em></h2>
          </div>
          <p>For no particular reason.<br />For every reason, really.</p>
        </div>
        <div className="notes-list">
          {notes.map((note, index) => (
            <article className={`note-card ${openNote === index ? "note-card--open" : ""}`} key={note.number}>
              <span className="note-card__number">{note.number}</span>
              <div className="note-card__body">
                <h3>{note.title}</h3>
                <div className="note-card__reveal" aria-hidden={openNote !== index}>
                  <p>{note.text}</p>
                </div>
              </div>
              <button className="note-card__toggle" type="button" aria-expanded={openNote === index} onClick={() => setOpenNote(openNote === index ? null : index)}>
                <span className="sr-only">{openNote === index ? "Close love note" : "Open love note"}</span>
                <span aria-hidden="true">{openNote === index ? "−" : "+"}</span>
              </button>
              <span className="note-card__petal" aria-hidden="true">{index === 1 ? "❀" : "✳"}</span>
            </article>
          ))}
        </div>
        <div className="notes-section__whisper"><Sparkles size={14} /> The best things never need a special occasion.</div>
      </section>

      <section className="letter-section" id="letter" aria-labelledby="letter-title">
        <div className="letter-section__backdrop" aria-hidden="true" />
        <div className="letter-card">
          <div className="letter-card__top"><span>ONE LAST THING</span><Heart size={15} fill="currentColor" /></div>
          <span className="letter-card__small-flower" aria-hidden="true">✿</span>
          <h2 id="letter-title">If all the flowers<br />in the world went quiet,</h2>
          <p className="letter-card__verse">I would still find a way to tell you<br />how glad I am that <em>you</em> are here.</p>
          <div className="letter-card__divider"><span />✳<span /></div>
          <p className="letter-card__dedication">For Abeer, with all my heart.</p>
          <span className="letter-card__signoff">always, always</span>
        </div>
        <div className="letter-section__side-note">AN ENDING? <span>NOT EVEN CLOSE.</span></div>
      </section>

      <footer className="footer">
        <a className="brand brand--footer" href="#home" aria-label="Back to top">
          <span className="brand__seal"><Flower2 size={17} strokeWidth={1.5} /></span>
          <span className="brand__words"><strong>petal &amp; promise</strong><small>For Abeer, always.</small></span>
        </a>
        <span className="footer__note">A small corner of the world, made a little softer for you.</span>
        <span className="footer__credit">Flower photography from <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">Pexels</a> &amp; <a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a>.</span>
      </footer>
    </main>
  );
}
