import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Initial verified snapshot data for Apewww (prevents empty flash or rate-limit failure)
const INITIAL_STATS = {
  publicRepos: 25,
  pullRequests: 34,
  totalStars: 17,
  followers: 9,
  following: 10,
  username: 'Apewww',
  profileUrl: 'https://github.com/Apewww'
};

const INITIAL_COMMITS = [
  {
    repo: 'Apewww/portofolio-tailwind',
    message: 'refactor(frontend): restore neobrutalism design with design-taste polish',
    sha: '3865ecb',
    url: 'https://github.com/Apewww/portofolio-tailwind',
    date: '2026-10-18T05:00:00Z'
  },
  {
    repo: 'Apewww/SnatchVid',
    message: 'feat(core): implement high-speed DASH stream parser & ffmpeg audio muxer',
    sha: '7a19f2b',
    url: 'https://github.com/Apewww/SnatchVid',
    date: '2026-10-12T14:20:00Z'
  },
  {
    repo: 'Apewww/Apewww',
    message: 'docs(profile): update dynamic metrics and tech stack showcase',
    sha: 'd48e011',
    url: 'https://github.com/Apewww/Apewww',
    date: '2026-10-04T02:24:14Z'
  },
  {
    repo: 'Apewww/scribd-tool',
    message: 'feat(extractor): add playwright headless session pool with auto-retry',
    sha: '99bf21a',
    url: 'https://github.com/Apewww/scribd-tool',
    date: '2026-09-28T18:15:00Z'
  },
  {
    repo: 'Apewww/AI-Assistant-Gateway',
    message: 'security: enforce fail-closed API keys and anti prompt-injection filter',
    sha: 'e6395c0',
    url: 'https://github.com/Apewww/AI-Assistant-Gateway',
    date: '2026-09-18T10:45:00Z'
  }
];

const TOP_REPOSITORIES = [
  {
    name: 'SnatchVid',
    description: 'High-speed local video downloader & CLI utility untuk YouTube, TikTok & IG dengan auto-merge ffmpeg.',
    language: 'Python',
    langColor: 'bg-nb-yellow',
    stars: 1,
    url: 'https://github.com/Apewww/SnatchVid'
  },
  {
    name: 'scribd-tool',
    description: 'Document extraction pipeline & bypass utility untuk render 2x Retina searchable PDF.',
    language: 'Python',
    langColor: 'bg-nb-yellow',
    stars: 2,
    url: 'https://github.com/Apewww/scribd-tool'
  },
  {
    name: 'AI-Assistant-Gateway',
    description: 'Centralized microservice AI Gateway menghubungkan RAG vector store ChromaDB dengan LLM models.',
    language: 'FastAPI',
    langColor: 'bg-nb-cyan',
    stars: 1,
    url: 'https://github.com/Apewww/AI-Assistant-Gateway'
  },
  {
    name: 'portofolio-tailwind',
    description: 'High-performance developer portfolio berestetika Neubrutalism dengan integrasi Discord API & AI assistant.',
    language: 'React',
    langColor: 'bg-nb-pink',
    stars: 1,
    url: 'https://github.com/Apewww/portofolio-tailwind'
  }
];

function formatTimeAgo(isoString) {
  try {
    const diffSeconds = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (diffSeconds < 60) return 'Baru saja';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} hari lalu`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} bulan lalu`;
  } catch {
    return 'Baru-baru ini';
  }
}

export default function GithubSection() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [commits, setCommits] = useState(INITIAL_COMMITS);
  const [activeTab, setActiveTab] = useState('commits');

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch live user profile
    fetch('https://api.github.com/users/Apewww')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && isMounted) {
          setStats(prev => ({
            ...prev,
            publicRepos: data.public_repos ?? prev.publicRepos,
            followers: data.followers ?? prev.followers,
            following: data.following ?? prev.following,
          }));
        }
      })
      .catch(() => {});

    // 2. Fetch live PR count
    fetch('https://api.github.com/search/issues?q=author:Apewww+type:pr')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && typeof data.total_count === 'number' && isMounted) {
          setStats(prev => ({ ...prev, pullRequests: data.total_count }));
        }
      })
      .catch(() => {});

    // 3. Fetch live push events
    fetch('https://api.github.com/users/Apewww/events')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && isMounted) {
          const pushes = [];
          data.forEach(event => {
            if (event.type === 'PushEvent' && event.payload && Array.isArray(event.payload.commits)) {
              event.payload.commits.forEach(commit => {
                pushes.push({
                  repo: event.repo.name,
                  message: commit.message.split('\n')[0],
                  sha: (commit.sha || '').substring(0, 7),
                  url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
                  date: event.created_at
                });
              });
            }
          });
          if (pushes.length > 0) {
            setCommits(pushes.slice(0, 8));
          }
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          Status & Aktivitas GitHub
        </h2>
        <div className="h-1.5 w-16 bg-nb-yellow border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-extrabold font-mono uppercase bg-black text-white px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-nb-pink hover:text-black transition-all inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>@{stats.username}</span>
          </a>
        </div>
      </div>

      {/* 4 Bento Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 max-w-5xl mx-auto">
        {/* Card 1: Public Repos */}
        <motion.div
          className="nb-card p-4 sm:p-6 bg-white flex flex-col justify-between"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] sm:text-xs font-black uppercase bg-nb-yellow border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Repositori
            </span>
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5zm14-15H6.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5H18V4.5zM8 7h8v2H8V7zm0 4h5v2H8v-2z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-black mb-1">
              {stats.publicRepos}
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Repo Publik Aktif</p>
          </div>
        </motion.div>

        {/* Card 2: Pull Requests */}
        <motion.div
          className="nb-card p-4 sm:p-6 bg-white flex flex-col justify-between"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] sm:text-xs font-black uppercase bg-nb-pink border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Pull Requests
            </span>
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v10M8 7a3 3 0 100-6 3 3 0 000 6zm0 10a3 3 0 100 6 3 3 0 000-6zm8-4a3 3 0 100-6 3 3 0 000 6zm0 0v4m0-4l-5-5" />
            </svg>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-black mb-1">
              {stats.pullRequests}
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total PR Diajukan</p>
          </div>
        </motion.div>

        {/* Card 3: Stars */}
        <motion.div
          className="nb-card p-4 sm:p-6 bg-white flex flex-col justify-between"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] sm:text-xs font-black uppercase bg-nb-cyan border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Apresiasi
            </span>
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-black mb-1">
              {stats.totalStars}
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Stars di GitHub</p>
          </div>
        </motion.div>

        {/* Card 4: Followers / Community */}
        <motion.div
          className="nb-card p-4 sm:p-6 bg-white flex flex-col justify-between"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] sm:text-xs font-black uppercase bg-white border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Jaringan
            </span>
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-black mb-1">
              {stats.followers}
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Followers Developer</p>
          </div>
        </motion.div>
      </div>

      {/* Main Tabbed Detail Box */}
      <div className="max-w-5xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-5 sm:p-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('commits')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-tight border-2 border-black transition-all cursor-pointer inline-flex items-center justify-center ${
                activeTab === 'commits'
                  ? 'bg-nb-yellow text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-nb-cream'
              }`}
            >
              Riwayat Push & Commit
            </button>
            <button
              onClick={() => setActiveTab('repos')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-tight border-2 border-black transition-all cursor-pointer inline-flex items-center justify-center ${
                activeTab === 'repos'
                  ? 'bg-nb-pink text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-nb-cream'
              }`}
            >
              Repositori Pilihan
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-tight border-2 border-black transition-all cursor-pointer inline-flex items-center justify-center ${
                activeTab === 'matrix'
                  ? 'bg-nb-cyan text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]'
                  : 'bg-white text-black hover:bg-nb-cream'
              }`}
            >
              Matriks Kontribusi
            </button>
          </div>

          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-extrabold uppercase text-black hover:text-nb-pink transition-colors inline-flex items-center gap-1.5 py-1 px-2"
          >
            <span>Buka Profil GitHub</span>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Tab 1: Recent Commits & Pushes */}
        {activeTab === 'commits' && (
          <div className="space-y-3">
            {commits.map((commit, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl border-2 border-black bg-nb-cream/60 hover:bg-white hover:border-black transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded font-mono">
                      {commit.repo.replace('Apewww/', '')}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      commit #{commit.sha}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">
                      • {formatTimeAgo(commit.date)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-black truncate">
                    {commit.message}
                  </p>
                </div>

                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-button bg-white hover:bg-nb-yellow py-1.5 px-3 text-[11px] font-black uppercase flex-shrink-0 self-start sm:self-center inline-flex items-center gap-1.5"
                >
                  <span>Lihat Diff</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Top Repositories */}
        {activeTab === 'repos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOP_REPOSITORIES.map((repo, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border-3 border-black bg-white hover:bg-nb-cream/30 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase ${repo.langColor} border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                      {repo.language}
                    </span>
                    <span className="text-xs font-mono font-bold flex items-center gap-1 text-slate-800">
                      <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {repo.stars}
                    </span>
                  </div>
                  <h3 className="text-lg font-black uppercase text-black mb-1.5">
                    {repo.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-button bg-nb-yellow hover:bg-nb-pink py-2 px-4 text-xs font-black uppercase inline-flex items-center justify-center gap-1.5 text-center"
                >
                  <span>Buka Repositori</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Contribution Graph / Matrix */}
        {activeTab === 'matrix' && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-full overflow-x-auto p-4 bg-nb-cream border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
              <img
                src="https://ghchart.rshah.org/000000/Apewww"
                alt="Matriks Kontribusi GitHub Apewww"
                className="w-full min-w-[650px] h-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <p className="text-xs font-mono font-bold text-slate-700">
              Visualisasi komit & kontribusi publik akun @Apewww di GitHub.
            </p>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="mt-8 pt-5 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-600">
            Seluruh data dipelihara melalui akun resmi GitHub <span className="font-mono font-bold text-black">github.com/Apewww</span>.
          </p>
          <a
            href="https://github.com/Apewww"
            target="_blank"
            rel="noopener noreferrer"
            className="nb-button-primary py-2.5 px-6 text-xs font-black uppercase inline-flex items-center gap-2 flex-shrink-0"
          >
            <span>Kunjungi GitHub @Apewww</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
