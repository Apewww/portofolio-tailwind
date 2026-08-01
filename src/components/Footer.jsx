import React from 'react';

const navLinks = [
    { label: 'Keahlian', id: 'skills' },
    { label: 'Pendidikan', id: 'education' },
    { label: 'Proyek', id: 'portofolio' },
    { label: 'Sertifikat', id: 'certificates' },
];

export default function Footer() {
    const handleClick = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-nb-black text-white border-t-8 border-black">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
                <div className="flex flex-col items-center sm:items-start gap-2">
                    <p className="font-black uppercase tracking-tighter text-lg leading-none">Rafly Anggara Putra</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-nb-yellow">
                        Always Learning, <span className="text-nb-pink">Always Building!</span>
                    </p>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Navigasi</p>
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => handleClick(e, link.id)}
                            className="font-bold text-xs uppercase tracking-wider hover:text-nb-yellow transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Kontak</p>
                    <a href="mailto:apewinaja@gmail.com" className="font-bold text-xs uppercase tracking-wider hover:text-nb-yellow transition-colors">
                        📧 apewinaja@gmail.com
                    </a>
                    <a href="https://www.instagram.com/stellochron/" target="_blank" rel="noopener noreferrer" className="font-bold text-xs uppercase tracking-wider hover:text-nb-pink transition-colors">
                        📷 Instagram (@stellochron)
                    </a>
                    <a href="https://discord.com/users/695513585639620629" target="_blank" rel="noopener noreferrer" className="font-bold text-xs uppercase tracking-wider hover:text-nb-cyan transition-colors">
                        💬 Discord User
                    </a>
                    <p className="font-bold text-xs uppercase tracking-wider">📍 Cimahi, Indonesia</p>
                </div>
            </div>

            <div className="border-t-2 border-white/20 text-center py-4 px-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    © {new Date().getFullYear()} Rafly Anggara Putra. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
