export default function Footer() {

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <footer className="footer footer-center p-12 bg-nb-black text-white border-t-8 border-black">
                <aside className="items-center grid-flow-col">
                    <p className="font-black uppercase tracking-widest text-lg">
                        <a href="#" onClick={(e) => handleClick(e, 'home')} className="hover:text-nb-yellow transition-colors">
                            © Rafly Anggara Putra. Build and <span className="text-nb-pink">Learning!</span>.
                        </a>
                    </p>
                </aside>
            </footer>
        </>
    )
}