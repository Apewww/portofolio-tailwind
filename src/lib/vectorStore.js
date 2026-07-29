import { pipeline, env } from '@xenova/transformers';
import { DOCS } from './docs';

env.allowLocalModels = false;

class VectorStore {
  ready = false;
  #extract = null;
  #chunks = [];
  #embeddings = [];
  #initPromise = null;

  async init() {
    if (this.#initPromise) return this.#initPromise;
    this.#initPromise = this.#_init();
    return this.#initPromise;
  }

  async #_init() {
    this.#extract = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true,
    });
    this.#chunks = this.#chunk();
    this.#embeddings = await this.#embedAll();
    this.ready = true;
  }

  #chunk() {
    const chunks = [];
    for (const [key, text] of Object.entries(DOCS)) {
      const lines = text.split('\n');
      let cur = [];
      for (const line of lines) {
        if (/^#{2,3} /m.test(line) && cur.length) {
          const t = cur.join('\n').trim();
          if (t.length > 30) chunks.push({ key, text: t });
          cur = [line];
        } else {
          cur.push(line);
        }
      }
      const t = cur.join('\n').trim();
      if (t.length > 30) chunks.push({ key, text: t });
    }
    return chunks;
  }

  async #embedAll() {
    const results = [];
    for (const c of this.#chunks) {
      const out = await this.#extract(c.text, { pooling: 'mean', normalize: true });
      results.push(Array.from(out.data));
    }
    return results;
  }

  async search(query, k = 3) {
    await this.init();
    const out = await this.#extract(query, { pooling: 'mean', normalize: true });
    const qvec = Array.from(out.data);

    const scored = this.#embeddings.map((emb, i) => ({
      score: cosine(qvec, emb),
      ...this.#chunks[i],
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k);
  }
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export const vectorStore = new VectorStore();
