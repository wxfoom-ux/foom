import { useState } from "react";
import { ArrowDown, ArrowUpRight, Flower2, Heart, Sparkles } from "lucide-react";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import RippleDistortion from "@/components/RippleDistortion";
import ClickFlowerEffect from "@/components/ClickFlowerEffect";

const moments = [
  { src: "/manus-storage/async-images/9xDk7tyfhJwL0WijN0YGPr/image-2.webp", alt: "A dew-kissed crimson rose in dramatic velvet shadows", title: "A rose worth the pause", note: "Like the loveliest rose, you make an ordinary moment feel worth keeping." },
  { src: "/manus-storage/async-images/9xDk7tyfhJwL0WijN0YGPr/image-3.webp", alt: "A luxurious bouquet of blush peonies and ivory garden roses", title: "A softer kind of lovely", note: "There is a quiet grace in you that makes everything around you feel gentler." },
  { src: "/manus-storage/async-images/9xDk7tyfhJwL0WijN0YGPr/image-4.webp", alt: "A romantic field of pink and crimson tulips at golden hour", title: "A field of little wonders", note: "If every tulip held one kind thought about you, this field would still fall short." },
  { src: "/manus-storage/async-images/9xDk7tyfhJwL0WijN0YGPr/image-5.webp", alt: "Elegant white orchids and pale blush flowers in deep green foliage", title: "Elegance, without trying", note: "You have a way of making beauty feel effortless, simply by being yourself." },
  { src: "/manus-storage/async-images/4ZY9jB9eqijrVy6oYo9B96/image-1.webp", alt: "An intricate dark plum dahlia in soft dramatic light", title: "Every petal, a promise", note: "A hundred petals, and still none could hold all the ways you make me smile." },
  { src: "/manus-storage/async-images/4ZY9jB9eqijrVy6oYo9B96/image-2.webp", alt: "A hand-tied romantic bouquet of roses, ranunculus and seasonal blooms", title: "A bouquet, just for you", note: "All the color in this bouquet is only a small reflection of the warmth you bring." },
];

const notes = [
  { number: "01", title: "For the way you make a room feel warmer", text: "You arrive, and somehow even the light seems to settle in differently. Being near you feels like finding the sunny side of every day." },
  { number: "02", title: "For the laugh I would know anywhere", text: "I hope the world gives you a thousand reasons to laugh today. And if it forgets, I hope you remember I would spend all day trying." },
  { number: "03", title: "For the little things that are everything", text: "Your kindness, your spark, the way you notice what others miss — I collect these things quietly, like petals pressed into a favorite book." },
];

const personalMessages = [
  { label: "A note for a quiet moment", title: "The little things I notice", text: "Dear Abeer, I notice how your kindness finds its way into the smallest moments. You make people feel seen, and you make ordinary days feel gentler just by being in them. I hope you know how rare and lovely that is." },
  { label: "For an ordinary day", title: "You make the everyday glow", text: "Dear Abeer, if I could give you one thing, it would be the chance to see yourself the way I do: warm, thoughtful, and quietly radiant. Even a simple day feels like something worth remembering when it has a little piece of you in it." },
  { label: "Kept close, always", title: "A promise in every petal", text: "Dear Abeer, wherever life takes us, I hope you never doubt this: your laughter is one of my favorite sounds, your happiness matters deeply to me, and I am endlessly glad that you are exactly who you are." },
  { label: "A place in my thoughts", title: "You feel a little like home", text: "Dear Abeer, home is supposed to be a place, but sometimes it is a laugh, a familiar kindness, or the feeling that everything can slow down for a minute. Somehow, you have become all of those things to me." },
  { label: "For the days that run long", title: "Your light stays with me", text: "Dear Abeer, even after a long day, remembering your smile makes the world feel softer around the edges. I hope today sends a little of that warmth back to you, because you give so much of it to everyone around you." },
  { label: "No occasion needed", title: "Just because it is you", text: "Dear Abeer, this note has no grand reason. I simply wanted you to know that you matter to me, that I am grateful for every little moment we share, and that being yourself is already more than enough." },
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
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="garden-shell">
      <ClickFlowerEffect />
      <div className="ripple-backdrop" aria-hidden="true">
        <RippleDistortion
          src="/manus-storage/async-images/9xDk7tyfhJwL0WijN0YGPr/image-1.webp"
          brushSize={150}
          strength={0.2}
          swirl={1}
          rings={4}
          grayscale
          spread={5}
          fade={3}
          spacing={15}
          dispersion={0}
          glint={0}
          tint="#a855f7"
          tintAmount={0.1}
          highlightColor="#ffffff"
          trigger="hover"
          clickStrength={2}
          quality="low"
          enabled
          className="ripple-backdrop__surface"
        />
      </div>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Bloom for Abeer home">
          <span className="brand__seal"><Flower2 size={19} strokeWidth={1.5} /></span>
          <span className="brand__words"><strong>petal &amp; promise</strong><small>A little garden for Abeer</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#garden">The garden</a>
          <a href="#little-things">Little things</a>
          <a href="#love-letters">Love letters</a>
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
          <p className="hero__lead">A thousand beautiful things could never say it quite like this — but let me try.</p>
          <a className="round-cta" href="#garden"><span>Wander through<br />your garden</span><i><ArrowDown size={18} /></i></a>
          <span className="hero__scribble" aria-hidden="true">with all my heart</span>
        </div>
        <div className="hero__art">
          <div className="hero__photo-wrap">
            <img src="/manus-storage/async-images/9xDk7tyfhJwL0WijN0YGPr/image-2.webp" alt="A dew-kissed crimson rose in dramatic velvet shadows" fetchPriority="high" />
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
          <h2 id="garden-title">A few moments<br /><em>I keep close</em> when<br />I think of you.</h2>
          <p>Every image holds a small thought.<br />Choose one, and let it tell you.</p>
          <span className="section-heading__flower" aria-hidden="true">✿</span>
        </div>
        <div className="garden-gallery">
          <InfiniteSpiral flowers={moments} onSelect={setActiveBloom} />
          <div className="bloom-note" aria-live="polite" key={activeBloom}>
            <span className="bloom-note__index">A SMALL THOUGHT · {String(activeBloom + 1).padStart(2, "0")}</span>
            <h3>{moments[activeBloom].title}</h3>
            <p>{moments[activeBloom].note}</p>
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

      <section className="personal-letters" id="love-letters" aria-labelledby="personal-letters-title">
        <div className="personal-letters__heading">
          <div className="eyebrow"><span className="eyebrow__line" />JUST BETWEEN US</div>
          <h2 id="personal-letters-title">Little letters,<br /><em>meant for Abeer.</em></h2>
          <p>Choose a seal, open a note, and keep the words that feel like yours.</p>
        </div>
        <div className="personal-letters__grid">
          {personalMessages.map((message, index) => {
            const isOpen = openPersonalMessage === index;
            return (
              <article className={`personal-letter ${isOpen ? "personal-letter--open" : ""}`} key={message.title}>
                <span className="personal-letter__label">{message.label}</span>
                <span className="personal-letter__ornament" aria-hidden="true">✳</span>
                <span className="personal-letter__burst" aria-hidden="true"><i>✿</i><i>✧</i><i>❀</i></span>
                <h3>{message.title}</h3>
                <div className="personal-letter__reveal" aria-hidden={!isOpen}>
                  <p>{message.text}</p>
                </div>
                <button className="personal-letter__toggle" type="button" aria-expanded={isOpen} onClick={() => setOpenPersonalMessage(isOpen ? null : index)}>
                  <Heart size={15} fill={isOpen ? "currentColor" : "none"} />
                  {isOpen ? "Fold this letter" : "Open your letter"}
                </button>
              </article>
            );
          })}
        </div>
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
        <span className="footer__credit">Original floral photography, made with love for Abeer.</span>
      </footer>
    </main>
  );
}
