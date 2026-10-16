import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink, Play, Star } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  EDIT THIS SECTION                                                  */
/* ------------------------------------------------------------------ */

const PROFILE = {
    name: 'Evan Hicks', // <- change me
    role: 'Computer Science Student and Full-Stack Developer',
    status: 'Open to co-op opportunities',
    tagline: 'I build full-stack and ML projects, like a hold-detection model that learns from user corrections and a deployed SMS bot with scheduled reminders and Stripe billing.',
    github: 'https://github.com/EvanHicks123',
    linkedin: 'www.linkedin.com/in/evan-hicks123',
    email: 'evanhicksman@gmail.com',
    resume: '', // e.g. '/resume.pdf' (file goes in your public folder)
    photo: '', // e.g. '/me.jpg' (file goes in your public folder). Empty shows your initials.
};

// Rename FightHub here once.
const FIGHT_APP_NAME = 'Beef';

/*
  Demo videos: paste either
    embedUrl: 'https://www.youtube.com/embed/VIDEO_ID'
    videoUrl: '/demos/climbing.mp4'  (file in /public)
  Leave both empty to show a "coming soon" placeholder.
*/
const projects = [
    {
        id: 'climbing',
        featured: true,
        title: 'HoldVision',
        subtitle: 'Computer vision route grader',
        description:
            'Take a photo of a climbing wall and the app detects every hold, classifies its type, and estimates the route difficulty from the holds you select.',
        highlights: [
            'YOLOv8 model fine-tuned from a Roboflow dataset to classify hold types',
            'Users correct detections on their own photos, and the model keeps learning from those corrections',
            'Custom spatial vector algorithm turns a selected hold sequence into a V-grade',
        ],
        tech: ['React Native', 'Expo', 'Flask', 'Python', 'YOLOv8'],
        github: 'https://github.com/EvanHicks123/ClimbingApp',
        live: '',
        embedUrl: 'https://www.youtube.com/embed/8S94xCsspQM?rel=0',
        videoUrl: '',
    },
    {
        id: 'bouncer',
        featured: true,
        title: 'Bouncer',
        subtitle: 'SMS accountability bot',
        description:
            'A text-message bot that remembers the tasks you set, reminds you when it is time, and calls you out when you skip them. It runs 24/7, and there is no app to install.',
        highlights: [
            'Two-way SMS through Twilio, with Gemini API generating the replies and the roasts',
            'Tasks and commitments stored in Supabase, with reminders triggered by cron jobs and hosted around the clock on Render',
            'Stripe integration for monthly subscriptions',
        ],
        tech: ['Twilio', 'Supabase', 'Render', 'Cron', 'Stripe'],
        github: 'https://github.com/EvanHicks123/bouncer',
        live: '',
        embedUrl: '',
        videoUrl: '',
    },
    {
        id: 'fight',
        featured: false,
        title: FIGHT_APP_NAME,
        subtitle: 'Settle friend-group disputes by vote',
        description:
            "Challenge a friend over anything, and the group votes on whether it is worth it. Accepted challenges open up predictions, with odds built from each side's height, weight, and record.",
        highlights: [
            'Real-time voting and prediction updates with Supabase subscriptions',
            'Row-level security on every table',
            'Odds are snapshotted when a prediction is placed, so payouts are always calculated correctly',
        ],
        tech: ['React Native', 'Expo Router', 'PostgreSQL', 'Supabase'],
        github: 'https://github.com/EvanHicks123/beef',
        live: '',
        embedUrl: '',
        videoUrl: '',
    },
    {
        id: 'quizgen',
        featured: false,
        title: 'QuizGen',
        subtitle: 'Adaptive study tool',
        description:
            'Paste in your notes or a lecture and get a quiz built from them. Any question you miss or skip comes back until you get every question right.',
        highlights: [
            'Grok API generates quiz questions from raw notes and lecture text',
            'Mastery loop re-queues missed and skipped questions until the quiz is cleared',
            'Clean, minimal interface built for quick study sessions',
        ],
        tech: ['React', 'Python', 'PostgreSQL', 'Grok API'],
        github: 'https://github.com/EvanHicks123/QuizGen',
        live: '',
        embedUrl: '',
        videoUrl: '',
    },
];

const skillGroups = [
    { label: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
    { label: 'Frontend and mobile', items: ['React', 'React Native', 'Expo', 'Tailwind CSS'] },
    { label: 'Backend and data', items: ['Node.js', 'Flask', 'REST APIs', 'PostgreSQL', 'Supabase', 'MongoDB', 'Firebase', 'Row-Level Security'] },
    { label: 'ML and AI', items: ['Computer Vision', 'YOLOv8', 'Roboflow', 'LLM APIs (Gemini, Grok)'] },
    { label: 'Integrations and deployment', items: ['Twilio', 'Stripe', 'Render', 'Cron Jobs', 'Real-time Subscriptions'] },
    { label: 'Practice', items: ['Full-Stack', 'Git and GitHub'] },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

// Fades content in the first time it scrolls into view.
function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setShown(true); io.disconnect(); }
        }, { threshold: 0.12 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <div ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

function DemoVideo({ project }) {
    const { title, embedUrl, videoUrl } = project;
    return (
        <div className="video-frame">
            {embedUrl ? (
                <iframe
                    src={embedUrl}
                    title={`${title} demo video`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : videoUrl ? (
                <video src={videoUrl} controls preload="metadata" playsInline />
            ) : (
                <div className="video-placeholder">
                    <span className="play-dot"><Play size={22} /></span>
                    <span>{title} demo video coming soon</span>
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project }) {
    return (
        <article className={`card ${project.featured ? 'card-featured' : ''}`}>
            {project.featured && (
                <Star className="star" size={22} fill="currentColor" aria-label="Featured project" />
            )}
            <h3>{project.title}</h3>
            <p className="card-subtitle">{project.subtitle}</p>
            <p className="card-desc">{project.description}</p>
            <ul className="card-highlights">
                {project.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <div className="tag-row">
                {project.tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
            </div>
            {(project.github || project.live) && (
                <div className="project-links">
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15} /></a>
                    )}
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer">Source code <Github size={15} /></a>
                    )}
                </div>
            )}
        </article>
    );
}

function Portfolio() {
    const featured = projects.filter((p) => p.featured);
    const more = projects.filter((p) => !p.featured);
    const year = new Date().getFullYear();
    const initials = PROFILE.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="pf">
            <style>{css}</style>

            <nav className="nav">
                <div className="nav-inner">
                    <a href="#top" className="nav-brand">{PROFILE.name}</a>
                    <div className="nav-right">
                        <div className="nav-links">
                            <a href="#projects">Projects</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="nav-icons">
                            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
                            {PROFILE.linkedin && (
                                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main id="top" className="wrap">
                <header className="intro">
                    <span className="status"><i /> {PROFILE.status}</span>
                    <h1>{PROFILE.name}</h1>
                    <p className="role">{PROFILE.role}</p>
                    <p className="tagline">{PROFILE.tagline}</p>
                    <div className="intro-links">
                        <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}><Mail size={17} /> Email me</a>
                        {PROFILE.linkedin && (
                            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
                        )}
                        <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                        {PROFILE.resume && (
                            <a className="btn" href={PROFILE.resume} target="_blank" rel="noreferrer"><FileText size={17} /> Resume</a>
                        )}
                    </div>
                </header>

                <section id="projects">
                    <Reveal>
                        <h2 className="section-title">Featured projects</h2>
                        <p className="section-note">Start with the demo videos. Code and details are one click away.</p>
                    </Reveal>
                    <div className="featured-list">
                        {featured.map((p) => (
                            <Reveal key={p.id}>
                                <div className="feature-row">
                                    <ProjectCard project={p} />
                                    <DemoVideo project={p} />
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal><h2 className="section-title title-secondary">More projects</h2></Reveal>
                    <div className="more-grid">
                        {more.map((p, i) => (
                            <Reveal key={p.id} className="fill" delay={i * 90}>
                                <ProjectCard project={p} />
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section id="about" className="about">
                    <Reveal><h2 className="section-title">About me</h2></Reveal>
                    <Reveal>
                        <div className="about-row">
                            {PROFILE.photo ? (
                                <img className="photo" src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} />
                            ) : (
                                <div className="photo photo-fallback" aria-hidden="true">{initials}</div>
                            )}
                            <div className="about-text">
                                <p>
                                    I'm a computer science student at UVIC, looking for a four or eight month co-op. My projects
                                    so far span computer vision, mobile apps, and backend services, and I want to work on
                                    real systems alongside a team that can teach me more.
                                </p>
                                <p>Outside of coding, I play soccer, drums, and guitar.</p>                            </div>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div className="skills-box">
                            <h3>Skills</h3>
                            <div className="skills-grid">
                                {skillGroups.map((g) => (
                                    <div className="skill-group" key={g.label}>
                                        <span className="skill-label">{g.label}</span>
                                        <div className="tag-row">
                                            {g.items.map((s) => <span className="skill-tag" key={s}>{s}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>
            </main>

            <footer id="contact" className="footer">
                <Reveal>
                    <h2>Contact Me</h2>
                    <div className="footer-links">
                        <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}><Mail size={17} /> {PROFILE.email}</a>
                        {PROFILE.linkedin && (
                            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
                        )}
                        <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                    </div>
                    <p className="copy">© {year} {PROFILE.name}</p>
                </Reveal>
            </footer>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
html { scroll-behavior: smooth; }
.pf {
  --panel: #131a30; --panel-hover: #18213e; --line: rgba(71, 85, 105, 0.55);
  --text: #e8edf6; --soft: #c3cde0; --muted: #8b99b3; --blue: #60a5fa; --cyan: #22d3ee;
  min-height: 100vh;
  background:
    radial-gradient(900px 480px at 15% -5%, rgba(59, 130, 246, 0.16), transparent 60%),
    linear-gradient(160deg, #0a0e27 0%, #121833 55%, #0b0f26 100%);
  background-attachment: fixed;
  color: var(--text);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.pf *, .pf *::before, .pf *::after { box-sizing: border-box; }
.pf a { color: inherit; text-decoration: none; }
.pf a:focus-visible { outline: 2px solid var(--cyan) !important; outline-offset: 3px; border-radius: 6px; }
.pf section, .pf footer { scroll-margin-top: 5rem; }

/* scroll reveal */
.pf .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
.pf .reveal.in { opacity: 1; transform: none; }
.pf .fill { height: 100%; }

/* nav */
.pf .nav { position: sticky; top: 0; z-index: 50; background: rgba(10, 14, 39, 0.78); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(148, 163, 184, 0.1); }
.pf .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0.85rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.pf .nav-brand { font-weight: 700; letter-spacing: -0.01em; }
.pf .nav-right { display: flex; align-items: center; gap: 1.75rem; }
.pf .nav-links { display: flex; gap: 1.6rem; font-size: 0.93rem; color: var(--muted); font-weight: 500; }
.pf .nav-links a:hover, .pf .nav-icons a:hover { color: var(--text); }
.pf .nav-icons { display: flex; gap: 1rem; color: var(--muted); padding-left: 1.5rem; border-left: 1px solid var(--line); }

.pf .wrap { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* intro */
.pf .intro { padding: 4.5rem 0 4rem; max-width: 780px; }
.pf .status { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.35rem 0.85rem; border: 1px solid var(--line); border-radius: 999px; font-size: 0.85rem; color: var(--soft); background: rgba(19, 26, 48, 0.7); }
.pf .status i { width: 8px; height: 8px; border-radius: 50%; background: #34d399; }
.pf .intro h1 { font-size: clamp(2.6rem, 6vw, 4rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.05; margin: 1.25rem 0 0.6rem; }
.pf .role { font-size: 1.3rem; font-weight: 600; color: var(--blue); margin: 0 0 1rem; }
.pf .tagline { font-size: 1.1rem; color: var(--muted); margin: 0 0 1.75rem; max-width: 60ch; }
.pf .intro-links, .pf .footer-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.pf .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.15rem; border-radius: 0.65rem; font-weight: 600; font-size: 0.95rem; border: 1px solid var(--line); background: rgba(19, 26, 48, 0.6); transition: background 0.2s, border-color 0.2s; }
.pf .btn:hover { background: rgba(59, 130, 246, 0.15); border-color: var(--blue); }
.pf .btn-primary { background: #2563eb; border-color: #2563eb; }
.pf .btn-primary:hover { background: #1d4ed8; border-color: #1d4ed8; }

/* headings */
.pf .section-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.025em; margin: 0 0 0.4rem; }
.pf .section-note { color: var(--muted); margin: 0 0 2.25rem; }
.pf .title-secondary { margin: 5rem 0 1.75rem; }

/* featured rows */
.pf .featured-list { display: flex; flex-direction: column; gap: 3rem; }
.pf .feature-row { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 2rem; align-items: center; }

/* cards */
.pf .card { position: relative; background: var(--panel); border: 1px solid var(--line); border-radius: 1rem; padding: 1.9rem; height: 100%; transition: border-color 0.25s, background 0.25s; }
.pf .card:hover { border-color: rgba(96, 165, 250, 0.55); background: var(--panel-hover); }
.pf .card-featured { padding-top: 3.3rem; border-color: rgba(96, 165, 250, 0.35); box-shadow: 0 24px 60px -30px rgba(59, 130, 246, 0.45); }
.pf .star { position: absolute; top: 1.25rem; left: 1.5rem; color: var(--blue); filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.4)); }
.pf .card h3 { margin: 0; font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; }
.pf .card-subtitle { margin: 0.2rem 0 1rem; color: var(--blue); font-weight: 600; font-size: 0.95rem; }
.pf .card-desc { margin: 0 0 1rem; color: var(--soft); }
.pf .card-highlights { margin: 0 0 1.35rem; padding-left: 1.1rem; color: var(--soft); font-size: 0.94rem; }
.pf .card-highlights li { margin-bottom: 0.45rem; }
.pf .card-highlights li::marker { color: var(--blue); }

.pf .tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pf .tech-tag { font-size: 0.8rem; padding: 0.28rem 0.7rem; border-radius: 0.4rem; background: rgba(71, 85, 105, 0.35); border: 1px solid rgba(148, 163, 184, 0.2); color: var(--soft); transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s; }
.pf .tech-tag:hover { background: rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.45); color: #7dd3fc; transform: translateY(-1px); }
.pf .project-links { display: flex; gap: 1.5rem; margin-top: 1.3rem; padding-top: 1.1rem; border-top: 1px solid rgba(148, 163, 184, 0.12); }
.pf .project-links a { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--blue); font-weight: 600; font-size: 0.95rem; }
.pf .project-links a:hover { color: var(--cyan); }

/* video */
.pf .video-frame { width: 100%; aspect-ratio: 16 / 9; border-radius: 1rem; overflow: hidden; background: #0d1230; border: 1px solid var(--line); box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.8); }
.pf .video-frame iframe, .pf .video-frame video { width: 100%; height: 100%; border: 0; display: block; background: #000; }
.pf .video-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.9rem; color: var(--muted); font-size: 0.95rem; text-align: center; padding: 1rem; background: radial-gradient(400px 220px at 50% 45%, rgba(59, 130, 246, 0.14), transparent 70%), #0d1230; }
.pf .play-dot { width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center; border: 1px solid rgba(96, 165, 250, 0.55); color: var(--blue); }

.pf .more-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.75rem; }

/* about */
.pf .about { padding: 6rem 0 4rem; }
.pf .about-row { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 2.5rem; align-items: center; margin: 1.5rem 0 2.5rem; }
.pf .photo { width: 220px; height: 220px; border-radius: 1.25rem; object-fit: cover; border: 1px solid var(--line); box-shadow: 0 20px 50px -25px rgba(59, 130, 246, 0.5); }
.pf .photo-fallback { display: grid; place-items: center; font-size: 3.5rem; font-weight: 800; color: var(--blue); background: linear-gradient(145deg, #18213e, #0f1530); }
.pf .about-text p { color: var(--soft); font-size: 1.1rem; margin: 0 0 1rem; max-width: 62ch; }

.pf .skills-box { background: var(--panel); border: 1px solid var(--line); border-radius: 1rem; padding: 2.25rem 1.75rem; text-align: center; }
.pf .skills-box h3 { margin: 0 0 1.75rem; font-size: 1.4rem; font-weight: 700; }
.pf .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.9rem 2.5rem; }
.pf .skill-label { display: block; font-size: 0.88rem; font-weight: 600; color: var(--muted); margin-bottom: 0.6rem; }
.pf .skills-box .tag-row { justify-content: center; }
.pf .skill-tag { font-size: 0.85rem; padding: 0.32rem 0.75rem; border-radius: 0.4rem; background: rgba(59, 130, 246, 0.14); border: 1px solid rgba(59, 130, 246, 0.38); color: #7dd3fc; cursor: default; transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
.pf .skill-tag:hover { background: rgba(59, 130, 246, 0.28); border-color: rgba(96, 165, 250, 0.75); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(59, 130, 246, 0.2); }

/* footer */
.pf .footer { border-top: 1px solid rgba(148, 163, 184, 0.12); padding: 4rem 1.5rem 2.5rem; text-align: center; }
.pf .footer h2 { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 1.5rem; }
.pf .footer-links { justify-content: center; }
.pf .copy { color: var(--muted); font-size: 0.88rem; margin: 2.5rem 0 0; }

@media (max-width: 900px) {
  .pf .feature-row { grid-template-columns: 1fr; }
  .pf .more-grid { grid-template-columns: 1fr; }
  .pf .about-row { grid-template-columns: 1fr; justify-items: start; gap: 1.5rem; }
  .pf .photo { width: 160px; height: 160px; }
  .pf .intro { padding-top: 2rem; }
}
@media (max-width: 560px) {
  .pf .nav-links { gap: 1rem; }
  .pf .nav-icons { display: none; }
  .pf .card { padding: 1.4rem; }
  .pf .card-featured { padding-top: 3.1rem; }
  .pf .skills-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .pf *, html { transition: none !important; scroll-behavior: auto; }
  .pf .reveal { opacity: 1; transform: none; }
}
`;

export default Portfolio;