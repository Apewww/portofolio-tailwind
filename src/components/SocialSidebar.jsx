import React from 'react';

const SocialSidebar = () => {
  const socials = [
    {
      name: 'GitHub',
      iconUrl: '/assets/img/github.png',
      url: 'https://github.com/Apewww',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-yellow'
    },
    {
      name: 'LinkedIn',
      iconUrl: '/assets/img/linkedin.png',
      url: 'https://linkedin.com/in/rafly-anggara',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-cyan'
    },
    {
      name: 'Discord',
      iconUrl: '/assets/img/discord.png',
      url: 'https://discord.com',
      color: 'bg-white',
      hoverColor: 'hover:bg-nb-pink'
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 pr-4">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center w-14 h-14 ${social.color} ${social.hoverColor} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
          title={social.name}
        >
          <img
            src={social.iconUrl}
            alt={social.name}
            className="w-8 h-8 object-contain"
          />
        </a>
      ))}

    </div>
  );
};

export default SocialSidebar;
