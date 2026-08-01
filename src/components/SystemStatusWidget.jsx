import React, { useState, useEffect } from 'react';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, '');

export default function SystemStatusWidget() {
  const [systemStatus, setSystemStatus] = useState({
    online: false,
    model: 'llama-3.3-70b-versatile',
    vectorStore: 'ChromaDB',
    latency: null
  });

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      const startTime = performance.now();
      try {
        const response = await fetch(`${BACKEND_URL}/status`, { cache: 'no-store' });
        const endTime = performance.now();
        if (response.ok && isMounted) {
          const data = await response.json();
          setSystemStatus({
            online: true,
            model: data.model || 'llama-3.3-70b-versatile',
            vectorStore: data.vector_store || 'ChromaDB Ready',
            latency: Math.round(endTime - startTime)
          });
        }
      } catch (err) {
        if (isMounted) {
          setSystemStatus((prev) => ({ ...prev, online: false }));
        }
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-black text-white py-3 px-4 border-y-4 border-black">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono font-bold">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemStatus.online ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${systemStatus.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
          <span className="uppercase tracking-wider">
            Backend Gateway: {systemStatus.online ? 'Online' : 'Offline / Standby'}
          </span>
          {systemStatus.latency && (
            <span className="text-nb-yellow text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
              {systemStatus.latency}ms
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-gray-300">
          <div>
            LLM Model: <span className="text-nb-cyan font-semibold">{systemStatus.model}</span>
          </div>
          <div>•</div>
          <div>
            Vector DB: <span className="text-nb-pink font-semibold">{systemStatus.vectorStore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
