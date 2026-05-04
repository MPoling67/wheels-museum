import { useState } from 'react';
import HeroBanner from './HeroBanner';
import SubscribeBar from './SubscribeBar';

const LOGGER = "https://script.google.com/macros/s/AKfycbxtCPP6q6wqCUYlSEtNdyQxFF_22K94lvgP4MJytXYX-kWqpCYkZnXG7tYV5fSZThYj/exec";
const SESSION_ID = Math.random().toString(36).slice(2, 10);
const IS_ME = new URLSearchParams(window.location.search).has('me');

// ── Quiz Data ─────────────────────────────────────────────────────────────────
const questions = [
  {
    era: "The Arrival — 1880s",
    q: "What year did the railroad arrive in Albuquerque, transforming it from a small farming village into a booming commercial city?",
    options: ["1862", "1880", "1898", "1912"],
    correct: 1,
    context: "In January 1880 — three months before the first train arrived — Albuquerque was designated as a division point for the AT&SF and Atlantic & Pacific railroads. That announcement alone triggered a land boom and changed the city's trajectory forever.",
    exhibit: "Early Railroad Documents & Maps Collection",
    exhibitIcon: "🗺️",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=613"
  },
  {
    era: "The Workforce — 1919",
    q: "At its peak in 1919, the Albuquerque locomotive shops employed 970 workers. What fraction of the city's entire workforce was that?",
    options: ["1 in 10", "1 in 6", "1 in 4", "1 in 2"],
    correct: 2,
    context: "One quarter of Albuquerque's total workforce — and that's just the shops. Add depot workers, hotel staff, train crews, and rail-related businesses and the railroad basically was the local economy.",
    exhibit: "Railyard Workers Photo Wall & Commemorative Plaques",
    exhibitIcon: "👷",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=270"
  },
  {
    era: "The Alvarado Hotel",
    q: "The Alvarado Hotel was the largest Harvey House in the Santa Fe railroad system. What happened to it?",
    options: ["Converted to a courthouse", "Burned in a fire", "Still standing today", "Demolished in 1970"],
    correct: 3,
    context: "Gone in 1970 — one of Albuquerque's most lamented demolitions. WHEELS Museum holds one of the few surviving collections of Alvarado Hotel artifacts and photographs.",
    exhibit: "Alvarado Hotel Gallery",
    exhibitIcon: "🏨",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=290"
  },
  {
    era: "This Building — 1914",
    q: "The building WHEELS Museum occupies today was built in 1914. What was its original purpose?",
    options: ["Locomotive roundhouse", "Passenger waiting hall", "The Storehouse", "Blacksmith shop"],
    correct: 2,
    context: "The Storehouse held a massive inventory of parts and supplies for the entire Santa Fe railroad system — not just Albuquerque. You're standing inside a piece of that infrastructure right now.",
    exhibit: "The Rail Yards Storehouse — This Building",
    exhibitIcon: "🏭",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=88"
  },
  {
    era: "Rails vs. The Road",
    q: "Route 66 was officially commissioned in 1926. Which came first in Albuquerque — Route 66 or the railroad?",
    options: ["Route 66", "The Railroad"],
    correct: 1,
    context: "The railroad arrived in 1880, a full 46 years before Route 66 was commissioned. Route 66's path through Albuquerque largely followed the commercial corridor the railroad had already made viable.",
    exhibit: "Tracks & Trails — Railroad to Route 66 Exhibit",
    exhibitIcon: "🛣️",
    exhibitUrl: "https://wheelsmuseum.org/?p=4349"
  },
  {
    era: "Architecture as PR",
    q: "What architectural style did the Santa Fe Railway deliberately adopt for its depots, hotels, and Harvey Houses?",
    options: ["Art Deco, to signal modernity", "Gothic Revival, to imply permanence", "California Mission, to attract tourists", "Pueblo Revival, chosen by Mary Colter"],
    correct: 2,
    context: "It was a calculated branding move — the Mission style evoked a romantic Southwest to draw tourists while softening the railroad's monopoly image. Architecture as public relations, in 1902.",
    exhibit: "Santa Fe Depot & Harvey House Photography Collection",
    exhibitIcon: "🏛️",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=613"
  },
  {
    era: "Mary Colter",
    q: "Designer Mary Colter created iconic Harvey Houses and Grand Canyon landmarks. Which of these did she NOT design?",
    options: ["Bright Angel Lodge", "Hermit's Rest", "The Alvarado Hotel", "The Santa Fe Depot in ABQ"],
    correct: 3,
    context: "Colter designed the Alvarado Hotel and many Harvey Houses, blending Pueblo and Spanish Colonial styles decades before 'authentic' was a design trend. The ABQ Depot was a Santa Fe Railway design, not Colter's.",
    exhibit: "Fred Harvey Collection",
    exhibitIcon: "✨",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=1838"
  },
  {
    era: "Bankruptcy & Rebirth",
    q: "The Santa Fe Railroad went bankrupt in the Panic of 1893. What was it reorganized as two years later?",
    options: ["The Union Pacific Southwest Division", "The Atchison, Topeka and Santa Fe Railway", "The New Mexico Central Railroad", "The Burlington Northern Santa Fe"],
    correct: 1,
    context: "The reorganization brought Edward Ripley to the presidency in 1896, launching the 'golden era' of the Santa Fe — including the Albuquerque shop expansion and the Mission-style building campaign.",
    exhibit: "Santa Fe Railroad Historical Documents",
    exhibitIcon: "📜",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=613"
  },
  {
    era: "The Harvey Girls",
    q: "WHEELS Museum holds artifacts connected to what long-running American dining brand that operated out of Albuquerque's train depot?",
    options: ["Howard Johnson's", "The Fred Harvey Company", "Stuckey's", "Union Station Diner"],
    correct: 1,
    context: "The Fred Harvey Company was America's first restaurant chain. The Harvey Girls — young women recruited to staff the lunch counters and dining rooms — became a cultural phenomenon. The Alvarado Hotel was their flagship New Mexico location.",
    exhibit: "Fred Harvey Collection & Those Harvey Girls",
    exhibitIcon: "🍽️",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=3403"
  },
  {
    era: "The Giant — Locomotive No. 2926",
    q: "WHEELS Museum is working to restore locomotive Santa Fe No. 2926 to operating condition. Roughly how long is it?",
    options: ["About 60 feet", "About 80 feet", "Over 120 feet", "Over 200 feet"],
    correct: 2,
    context: "More than 120 feet long and nearly one million pounds — No. 2926 is one of the largest steam locomotives ever built. It will eventually be based at the Rail Yards and used for passenger excursions.",
    exhibit: "Locomotive Collection / No. 2926 Restoration Project",
    exhibitIcon: "🚂",
    exhibitUrl: "https://wheelsmuseum.org/?page_id=1873"
  }
];

const ranks = [
  { min: 0,  max: 3,  rank: "Railyard Rookie",  msg: "You've got a lot of track to cover — but that's what the museum is for. Every exhibit here is a story waiting to be found." },
  { min: 4,  max: 5,  rank: "Station Agent",     msg: "You know the basics and you're clearly paying attention. A walk through the Railyard Storehouse will fill in the rest." },
  { min: 6,  max: 7,  rank: "Conductor",         msg: "Solid knowledge of Albuquerque's transportation history. You'd hold your own with the volunteers at WHEELS." },
  { min: 8,  max: 9,  rank: "Chief Dispatcher",  msg: "Impressive. You clearly have a deep connection to this history — or you've spent some time in the archives." },
  { min: 10, max: 10, rank: "Railroad Baron",     msg: "Perfect score. You know this history cold. Have you considered volunteering at WHEELS Museum? They could use you." }
];

function getRank(s) {
  return ranks.find(r => s >= r.min && s <= r.max) || ranks[0];
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase]           = useState('quiz');
  const [current, setCurrent]       = useState(0);
  const [score, setScore]           = useState(0);
  const [answered, setAnswered]     = useState(false);
  const [selectedIdx, setSelected]  = useState(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];

  function selectAnswer(idx) {
    if (answered) return;
    const isCorrect = idx === q.correct;
    setAnswered(true);
    setSelected(idx);
    setShowResult(true);
    if (isCorrect) setScore(s => s + 1);
    if (!IS_ME) {
      fetch(LOGGER, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: new Date().toISOString(), event: 'quiz_answer', app: 'WHEELS Quiz', question: current + 1, correct: isCorrect, sessionId: SESSION_ID })
      }).catch(() => {});
    }
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      setPhase('final');
    } else {
      setCurrent(c => c + 1);
      setAnswered(false);
      setSelected(null);
      setShowResult(false);
    }
  }

  function restartQuiz() {
    setPhase('quiz');
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setShowResult(false);
  }

  function optClass(i) {
    let cls = 'opt-btn';
    if (!answered) return cls;
    if (i === q.correct && selectedIdx !== i) return cls + ' reveal-correct';
    if (i === selectedIdx && selectedIdx === q.correct) return cls + ' correct';
    if (i === selectedIdx && selectedIdx !== q.correct) return cls + ' wrong';
    return cls;
  }

  const rank        = getRank(score);
  const progressPct = (current / questions.length) * 100;
  const finalPct    = (score / questions.length) * 100;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #1a1a18; --surface: #242422; --surface2: #2e2e2b;
          --border: rgba(255,255,255,0.08); --border2: rgba(255,255,255,0.14);
          --text: #f0ede8; --accent: #861442; --accent2: #be3650; --radius: 10px;
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'Plus Jakarta Sans', sans-serif;
          --pad: clamp(16px,4vw,2rem);
        }
        body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-weight: 300; min-height: 100vh; }
        .seo-h1 { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot-bar { from { width: 0 } }
        .dot-anim { animation: fadeUp 0.5s ease both; }

        /* Footer rule */
        .page-footer-rule { width:100%; height:1.5px; background:rgba(134,20,66,0.5); }

        /* Footer */
        .page-footer { background:#111110; padding:1.25rem var(--pad); font-family:var(--font-body); font-size:11px; font-weight:400; color:#f0ede8; line-height:2; text-align:center; }
        .page-footer a { color:#be3650; text-decoration:none; font-weight:500; }
        .page-footer a:hover { color:#f0ede8; }

        /* Quiz wrapper */
        .quiz-wrap { padding: 2rem var(--pad) 3rem; max-width: 860px; margin: 0 auto; }

        /* Progress */
        .progress-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; font-size:12px; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; color:#c8c4bc; }
        .progress-track { width:100%; height:3px; background:var(--surface2); border-radius:99px; margin-bottom:1.75rem; overflow:hidden; }
        .progress-fill { height:100%; background:var(--accent); border-radius:99px; transition:width 0.4s ease; }

        /* Question card */
        .q-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:1.75rem; margin-bottom:1.25rem; animation:fadeUp 0.4s ease both; }
        .q-era { font-size:11px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--accent2); margin-bottom:0.75rem; }
        .q-text { font-family:var(--font-display); font-size:clamp(17px,3vw,22px); font-weight:300; line-height:1.4; color:var(--text); }

        /* Options */
        .options-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1.25rem; }
        @media(max-width:540px) { .options-grid { grid-template-columns:1fr; } }
        .opt-btn { background:var(--surface); border:1px solid var(--border2); border-radius:var(--radius); padding:0.9rem 1.1rem; color:var(--text); font-family:var(--font-body); font-size:14px; font-weight:300; text-align:left; cursor:pointer; transition:border-color .18s,background .18s; line-height:1.5; width:100%; }
        .opt-btn:hover:not(:disabled) { border-color:var(--accent); background:rgba(134,20,66,0.08); }
        .opt-btn.correct { border-color:#4caf8a; background:rgba(76,175,138,0.1); }
        .opt-btn.wrong { border-color:#c0705a; background:rgba(192,112,90,0.1); }
        .opt-btn.reveal-correct { border-color:#4caf8a; background:rgba(76,175,138,0.07); }
        .opt-btn:disabled { cursor:default; }

        /* Result panel */
        .result-panel { background:#111110; border:1px solid var(--border); border-radius:var(--radius); padding:1.25rem 1.5rem; margin-bottom:1.25rem; animation:fadeUp .35s ease both; }
        .result-verdict { font-size:12px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:0.5rem; }
        .result-verdict.correct { color:#4caf8a; }
        .result-verdict.wrong { color:#c0705a; }
        .result-context { font-size:13px; font-weight:300; line-height:1.75; color:rgba(255,255,255,0.7); margin-bottom:1rem; }

        /* Exhibit card */
        .exhibit-card { border-top:1px solid rgba(255,255,255,0.07); padding-top:1rem; display:flex; align-items:center; gap:1rem; }
        .exhibit-icon { width:40px; height:40px; background:rgba(134,20,66,0.2); border:1px solid rgba(134,20,66,0.3); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:18px; }
        .exhibit-label { font-size:10px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--accent2); margin-bottom:2px; }
        .exhibit-name { font-size:13px; font-weight:400; color:var(--text); }
        .exhibit-link { margin-left:auto; font-size:12px; font-weight:500; color:var(--accent2); text-decoration:none; letter-spacing:0.04em; flex-shrink:0; opacity:0.8; transition:opacity .15s; }
        .exhibit-link:hover { opacity:1; text-decoration:underline; }

        /* Next button */
        .next-btn { background:var(--accent); color:#fff; border:none; border-radius:var(--radius); padding:11px 28px 13px; font-family:var(--font-body); font-size:14px; font-weight:500; cursor:pointer; transition:opacity .15s; animation:fadeUp .3s ease both; }
        .next-btn:hover { opacity:.88; }

        /* Final screen */
        .final-wrap { text-align:center; padding:2.5rem var(--pad) 2rem; max-width:860px; margin:0 auto; animation:fadeUp .5s ease both; }
        .final-rank { font-size:12px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:var(--accent2); margin-bottom:0.5rem; }
        .final-big-score { font-family:var(--font-display); font-size:clamp(72px,13vw,108px); font-weight:300; font-style:italic; color:var(--accent2); line-height:1; margin-bottom:0.25rem; }
        .final-of { font-family:var(--font-display); font-size:22px; font-weight:300; color:#c8c4bc; }
        .final-bar-track { width:100%; max-width:400px; height:6px; background:var(--surface2); border-radius:99px; margin:1.5rem auto; overflow:hidden; }
        .final-bar-fill { height:100%; background:var(--accent); border-radius:99px; animation:dot-bar 1.2s ease forwards; }
        .final-title { font-family:var(--font-display); font-size:clamp(22px,4vw,32px); font-weight:700; color:var(--text); margin-bottom:0.75rem; }
        .final-msg { font-size:14px; font-weight:300; line-height:1.8; color:rgba(255,255,255,0.6); max-width:520px; margin:0 auto 2rem; }
        .cta-row { display:flex; gap:.75rem; justify-content:center; flex-wrap:wrap; margin-bottom:2rem; }
        .btn-primary { background:var(--accent); color:#fff; border:none; border-radius:var(--radius); padding:11px 24px 13px; font-family:var(--font-body); font-size:14px; font-weight:500; cursor:pointer; text-decoration:none; transition:opacity .15s; display:inline-block; }
        .btn-primary:hover { opacity:.88; }
        .btn-ghost { background:transparent; color:var(--text); border:1px solid var(--border2); border-radius:var(--radius); padding:11px 24px 13px; font-family:var(--font-body); font-size:14px; font-weight:400; cursor:pointer; transition:border-color .15s,color .15s; }
        .btn-ghost:hover { border-color:var(--accent2); color:var(--accent2); }

        @media print { .no-print { display:none !important; } }
      `}</style>

      <h1 className="seo-h1">ABQ Rail History Quiz — Free Quiz Mini-App | Data on Tap</h1>

      <div style={{ maxWidth: 860, margin: '0 auto', overflow: 'hidden' }}>

        <HeroBanner
          titleStrong="ABQ Rail"
          titleEm="History Quiz"
          subHeadline="How well do you know Albuquerque's railroad and Route 66 story?"
          subBody="10 questions. Each answer connects to a real exhibit at WHEELS Museum."
          dimLabels={["Founded 1914", "21,000 Sq Ft", "$0 Admission"]}
          heroImage="/wheels-museum-hero.jpg"
          faviconSrc="/favicon.svg"
          faviconAlt="ABQ Rail History Quiz"
        />
        <div className="page-footer-rule" />

        {/* ── QUIZ PHASE ── */}
        {phase === 'quiz' && (
          <div className="quiz-wrap">
            <div className="progress-row">
              <span>Question {current + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>

            <div key={current} className="q-card">
              <div className="q-era">{q.era}</div>
              <div className="q-text">{q.q}</div>
            </div>

            <div className="options-grid">
              {q.options.map((opt, i) => (
                <button key={i} className={optClass(i)} disabled={answered} onClick={() => selectAnswer(i)}>
                  {opt}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="result-panel">
                <div className={`result-verdict ${selectedIdx === q.correct ? 'correct' : 'wrong'}`}>
                  {selectedIdx === q.correct ? '✓ Correct!' : '✗ Not quite'}
                </div>
                <div className="result-context">{q.context}</div>
                <div className="exhibit-card">
                  <div className="exhibit-icon">{q.exhibitIcon}</div>
                  <div>
                    <div className="exhibit-label">See it at WHEELS Museum</div>
                    <div className="exhibit-name">{q.exhibit}</div>
                  </div>
                  <a href={q.exhibitUrl} target="_blank" rel="noopener noreferrer" className="exhibit-link">Visit →</a>
                </div>
              </div>
            )}

            {showResult && (
              <button className="next-btn" onClick={nextQuestion}>
                {current < questions.length - 1 ? 'Next Question →' : 'See My Score →'}
              </button>
            )}
          </div>
        )}

        {/* ── FINAL PHASE ── */}
        {phase === 'final' && (
          <div className="final-wrap dot-anim">
            <div className="final-rank">{rank.rank}</div>
            <div className="final-big-score">{score}</div>
            <div className="final-of">out of {questions.length}</div>
            <div className="final-bar-track">
              <div className="final-bar-fill" style={{ width: `${finalPct}%` }} />
            </div>
            <div className="final-title">{rank.rank}</div>
            <div className="final-msg">{rank.msg}</div>
            <div className="cta-row">
              <a href="https://wheelsmuseum.org" target="_blank" rel="noopener noreferrer" className="btn-primary">Visit WHEELS Museum</a>
              <button className="btn-ghost" onClick={restartQuiz}>Play Again</button>
            </div>
          </div>
        )}

        <div className="page-footer-rule" />
      </div>

      {/* ── SUBSCRIBE ── */}
      <SubscribeBar appName="WHEELS Quiz" url={window.location.href} />

      {/* ── FOOTER ── */}
      <div className="page-footer-rule" />
      <div className="page-footer">
        <div>© 2026 ABQ Rail History Quiz &nbsp;◆&nbsp; <a href="https://dataontap.dev" target="_blank" rel="noopener noreferrer">Data on Tap</a> &nbsp;◆&nbsp; <a href="https://wheelsmuseum.org" target="_blank" rel="noopener noreferrer">wheelsmuseum.org</a></div>
      </div>
    </>
  );
}
