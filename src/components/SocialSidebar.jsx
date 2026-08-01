import React from 'react';

const SocialSidebar = () => {
  const socials = [
    {
      name: 'GitHub',
      iconUrl: '/assets/img/github.webp',
      url: 'https://github.com/Apewww',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-yellow'
    },
    {
      name: 'LinkedIn',
      iconUrl: '/assets/img/linkedin.webp',
      url: 'https://linkedin.com/in/rafly-anggara',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-cyan'
    },
    {
      name: 'Discord',
      iconUrl: '/assets/img/discord.webp',
      url: 'https://discord.com/users/695513585639620629',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-pink'
    },
    {
      name: 'Instagram (@stellochron)',
      iconSvg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 fill-current text-black" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: 'https://www.instagram.com/stellochron/',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-pink'
    },
  ];

  return (
    <div className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex-col gap-3 pr-2 sm:pr-4">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${social.color} ${social.hoverColor} border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none`}
          title={social.name}
        >
          {social.iconUrl ? (
            <img
              src={social.iconUrl}
              alt={social.name}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
            />
          ) : (
            social.iconSvg
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
