import { CalendarDays, Clock3, Heart, MapPin, Navigation } from 'lucide-react'

const photo = (name: string) => `/photos/${encodeURIComponent(name)}`

const photos = [
  { src: photo("bride.jpeg"), alt: "R. கார்த்திகா", label: "மணமகள்" },
  { src: photo("groom.jpeg"), alt: "M. சந்தன குமார்", label: "மணமகன்" },
  {
    src: photo("elder brother.jpeg"),
    alt: "குடும்ப நினைவுகள்",
    label: "R. சந்தனபெருமாள்",
  },
  {
    src: photo("Nesam.s.Ganeshan.jpeg"),
    alt: "திருமண நினைவுக் காட்சி",
    label: "Nesam.s.Ganeshan",
  },
  {
    src: photo("Sankarasuppu.jpeg"),
    alt: "திருமண நினைவுக் காட்சி",
    label: "Sankarasuppu",
  },
  {
    src: photo("WhatsApp Image 2026-11-03 at 2.10.23 PM (1).jpeg"),
    alt: "திருமண நினைவுக் காட்சி",
    label: "திருமண நினைவுகள்",
  },
  {
    src: photo("Muthuvenkadesh.jpeg"),
    alt: "திருமண நினைவுக் காட்சி",
    label: "Muthuvenkadesh",
  },
];

export function FloralThoranam() {
  const leaves = Array.from({ length: 15 }, (_, i) => i)
  return (
    <div className="thoranam" aria-hidden="true">
      <div className="thoranam-rope" />
      {leaves.map((i) => (
        <span className={`mango-leaf leaf-${i % 2}`} key={i} style={{ left: `${6 + i * 6.25}%`, animationDelay: `${i * 0.09}s` }}>
          <i />
        </span>
      ))}
      <div className="flower-rope">{Array.from({ length: 13 }, (_, i) => <b key={i} />)}</div>
    </div>
  )
}

export function MangoLeafDecoration() {
  return (
    <div className="mango-cluster" aria-hidden="true">
      <span /><span /><span /><span /><span />
    </div>
  )
}

export function FlowerPetals() {
  const petals = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((i) => (
        <i key={i} style={{ left: `${(i * 17) % 100}%`, animationDelay: `${(i * 1.7) % 12}s`, animationDuration: `${9 + (i % 5)}s` }} />
      ))}
    </div>
  )
}

export function WeddingCouple() {
  return (
    <div className="couple-composition" aria-label="மணமகன் மற்றும் மணமகள்">
      <div className="portrait-arch groom-arch">
        <div className="portrait-inner">
          <img src="/photos/groom.jpeg" alt="மணமகன் M. சந்தன குமார்" />
        </div>
        <span className="portrait-caption">மணமகன்</span>
      </div>
      <div className="center-kalash" aria-hidden="true">
        <span className="kalash-flame">✦</span>
        <div className="kalash-vessel" />
        <div className="kalash-leaves"><i /><i /><i /></div>
      </div>
      <div className="portrait-arch bride-arch">
        <div className="portrait-inner">
          <img src="/photos/bride.jpeg" alt="மணமகள் R. கார்த்திகா" />
        </div>
        <span className="portrait-caption">மணமகள்</span>
      </div>
    </div>
  )
}

export function WeddingHero() {
  return (
    <section className="hero" id="home">
      <FlowerPetals />
      <FloralThoranam />
      <div className="hero-frame">
        <div className="corner corner-tl">✦</div><div className="corner corner-tr">✦</div>
        <div className="corner corner-bl">✦</div><div className="corner corner-br">✦</div>
        <p className="blessing">ஸ்ரீ முத்தாரம்மன் அருளால்</p>
        <div className="gold-divider"><span /><b>❦</b><span /></div>
        <p className="couples-label">மணமக்கள்</p>
        <p className="ceremony-line">திருமண விழா</p>
        <WeddingCouple />
        <h1 className="wedding-title">
          <span>M. சந்தன குமார்</span>
          <b>&amp;</b>
          <span>R. கார்த்திகா</span>
        </h1>
        <div className="hero-date">
          <span>திருமண நாள்</span>
          <strong>22-11-2026</strong>
          <i>ஞாயிற்றுக்கிழமை</i>
        </div>
      </div>
      <MangoLeafDecoration />
    </section>
  )
}

export function WeddingDetails() {
  return (
    <section className="invitation section" id="invitation">
      <div className="section-heading reveal">
        <span>திருமண அழைப்பிதழ்</span>
        <div className="ornament-line"><i /><b>✦</b><i /></div>
      </div>
      <article className="invitation-card reveal">
        <div className="invitation-corners" aria-hidden="true">✦</div>
        <p className="tamil-blessing">மங்களம் நிறைந்த திருமண வாழ்த்துகள்</p>
        <h2>மணமக்கள்</h2>
        <div className="invitation-names">
          <div><small>மணமகன்</small><strong>M. சந்தன குமார்</strong></div>
          <div className="name-divider">❦</div>
          <div><small>மணமகள்</small><strong>R. கார்த்திகா</strong></div>
        </div>
        <p className="invitation-copy">இன்பமுடன் இனிதே சேரும் இந்த பவித்ர பந்தத்தில்<br />தங்களையும் உங்கள் குடும்பத்தாரையும் அன்போடு அழைக்கின்றோம்.</p>
      </article>
    </section>
  )
}

export function WeddingSchedule() {
  return (
    <section className="schedule section" id="schedule">
      <div className="section-heading reveal">
        <span>திருமண நிகழ்ச்சி</span>
        <div className="ornament-line"><i /><b>✦</b><i /></div>
      </div>
      <div className="schedule-grid">
        <article className="schedule-card reveal">
          <div className="schedule-icon"><CalendarDays /></div>
          <small>திருமணம்</small>
          <h3>22-11-2026</h3>
          <p>ஞாயிற்றுக்கிழமை</p>
          <div className="schedule-time"><Clock3 /> காலை 10:30 – 11:30</div>
        </article>
        <article className="schedule-card reveal">
          <div className="schedule-icon"><CalendarDays /></div>
          <small>வரவேற்பு</small>
          <h3>25-11-2026</h3>
          <p>புதன்கிழமை</p>
          <div className="schedule-time"><Clock3 /> மாலை 5:00 மணி</div>
        </article>
      </div>
      <div className="family-note reveal">
        <span>மணமகள் இல்லம்</span>
        <strong>உடன்குடி</strong>
      </div>
    </section>
  )
}

export function WeddingGallery() {
  return (
    <section className="gallery-section section" id="gallery">
      <div className="section-heading reveal">
        <span>மணமக்களை வாழ்த்தும் பெருமக்கள்</span>
        <div className="ornament-line">
          <i />
          <b>✦</b>
          <i />
        </div>
      </div>
      <figure className="people-cutout reveal">
        <img
          src="/design/six_people_gold_frame_design.png"
          alt="மணமக்களை வாழ்த்தும் பெருமக்கள் - திருமண குடும்பக் கணம்"
        />
      </figure>
    </section>
  );
}

export function VenueDetails() {
  const venue = 'பேட்டை செக்கிழார் ஸ்ரீ சந்தனமார் அம்மாள் சன்னதி'
  const address = 'சுந்தர விநாயகர் கோவில் தெரு, சேனைத்தலைவர் மண்டபம், பேட்டை'
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, ${address}`)}`
  return (
    <section className="venue section" id="venue">
      <div className="section-heading reveal">
        <span>திருமண மண்டபம்</span>
        <div className="ornament-line"><i /><b>✦</b><i /></div>
      </div>
      <div className="venue-card reveal">
        <div className="venue-seal"><MapPin /></div>
        <h2>{venue}</h2>
        <p>{address}</p>
        <a className="direction-button" href={mapUrl} target="_blank" rel="noreferrer">
          <Navigation /> வழிகாட்டி பெறுக
        </a>
      </div>
    </section>
  )
}

export function BlessingsSection() {
  return (
    <section className="blessings" id="blessings">
      <FloralThoranam />
      <div className="blessing-heart"><Heart /></div>
      <p>வாழ்த்துக்களுடன்</p>
      <h2>இருவரின் திருமண வாழ்வு<br />மகிழ்ச்சி நிறைந்ததாகட்டும்</h2>
      <div className="ornament-line light"><i /><b>✦</b><i /></div>
      <strong className="final-names">M. சந்தன குமார் &amp; R. கார்த்திகா</strong>
    </section>
  )
}

export default function App() {
  return (
    <>
      <WeddingHero />
      <main>
        <WeddingDetails />
        <WeddingSchedule />
        <WeddingGallery />
        <VenueDetails />
      </main>
      <BlessingsSection />
    </>
  )
}
