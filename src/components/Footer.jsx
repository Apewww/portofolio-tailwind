export default function Footer() {

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <footer className="footer footer-center p-12 bg-nb-black text-white border-t-8 border-black">
                <aside className="items-center grid-flow-col space-y-4">
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-bold text-sm uppercase tracking-wider">
                            📧 <a href="mailto:apewinaja@gmail.com" className="hover:text-nb-yellow transition-colors">apewinaja@gmail.com</a>
                        </p>
                        <p className="font-bold text-sm uppercase tracking-wider">
                            📍 Bandung, Indonesia
                        </p>
                    </div>
                    <p className="font-black uppercase tracking-widest text-lg mt-4">
                        <a href="#" onClick={(e) => handleClick(e, 'home')} className="hover:text-nb-yellow transition-colors">
                            © Rafly Anggara Putra. Build and <span className="text-nb-pink">Learning!</span>.
                        </a>
                    </p>
                </aside>
            </footer>
        </>
    )
}