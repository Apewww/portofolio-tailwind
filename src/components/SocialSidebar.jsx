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
      url: 'https://discord.com/users/695513585639620629',
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
          <img
            src={social.iconUrl}
            alt={social.name}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
          />
        </a>
      ))}

    </div>
  );
};

export default SocialSidebar;
