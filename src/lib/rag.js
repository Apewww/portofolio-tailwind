import { vectorStore } from './vectorStore';
import { DOCS } from './docs';

const KEYWORD_MAP = [
  {
    docKey: 'identity',
    keywords: ['siapa', 'identitas', 'profil', 'profile', 'rafly', 'bio', 'nama', 'tentang', 'about', 'personal', 'data diri', 'kontak', 'email', 'lokasi', 'bandung', 'anggara'],
  },
  {
    docKey: 'skills',
    keywords: ['skill', 'keahlian', 'kemampuan', 'teknologi', 'tech', 'stack', 'backend', 'frontend', 'devops', 'infrastructure', 'api', 'python', 'fastapi', 'node.js', 'react', 'next.js', 'laravel', 'flask', 'docker', 'postgresql', 'mysql', 'supabase', 'java', 'javascript', 'c#', 'bahasa pemrograman', 'framework', 'database', 'tools'],
  },
  {
    docKey: 'projects',
    keywords: ['project', 'proyek', 'portfolio', 'portofolio', 'karya', 'aplikasi', 'app', 'website', 'syncra', 'cuacakita', 'natahost', 'myfinance', 'gateway', 'ai gateway', 'asset management', 'algorithm saw', 'saw', 'github', 'demo', 'link'],
  },
  {
    docKey: 'experience',
    keywords: ['experience', 'pengalaman', 'kerja', 'pekerjaan', 'karier', 'career', 'riwayat', 'pendidikan', 'education', 'sekolah', 'kuliah', 'universitas', 'university', 'unjani', 'smk', 'cimahi', 'sija', 'sertifikasi', 'sertif', 'certif', 'certification', 'certificate', 'ijazah', 'gelar', 'coursera', 'meta', 'sertifikat'],
  },
  {
    docKey: 'academicProjects',
    keywords: ['proyek akademik', 'akademik', 'tugas', 'tugas besar', 'tugas kuliah', 'tugas kampus', 'skripsi', 'tugas akhir', 'makalah', 'penelitian', 'research', 'academic', 'semester', 'universitas', 'kuliah', 'tribite', 'endlessdrive', 'startup simulator', 'pddikti', 'bot pddikti'],
  },
];

function scoreTopic(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.reduce((score, kw) => {
    if (lower.includes(kw)) return score + 1;
    return score;
  }, 0);
}

function keywordRetrieve(query) {
  const scores = KEYWORD_MAP.map(({ docKey, keywords }) => ({
    docKey,
    score: scoreTopic(query, keywords),
  }));
  const matched = scores.filter(s => s.score > 0).sort((a, b) => b.score - a.score);
  if (matched.length === 0) return null;
  const top = matched.slice(0, 2);
  if (top.length === 1) {
    return { key: top[0].docKey, content: DOCS[top[0].docKey] };
  }
  const combined = top.map(t => DOCS[t.docKey]).join('\n\n---\n\n');
  return { key: top.map(t => t.docKey).join('+'), content: combined };
}

export async function retrieveRelevantDocs(query) {
  try {
    const results = await vectorStore.search(query, 3);
    if (!results || results.length === 0) return keywordRetrieve(query);
    const content = results.map(r => r.text).join('\n\n---\n\n');
    return { key: results.map(r => r.key).join('+'), content };
  } catch (e) {
    console.warn('Vector search failed, falling back to keyword:', e);
    return keywordRetrieve(query);
  }
}
