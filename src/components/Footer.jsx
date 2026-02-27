export default function Footer() {
    
    const handleClick = (e, id) => {
        e.preventDefault(); 
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <aside className="items-center grid-flow-col">
            {/* eslint-disable-next-line */}
            <p><a href="#" onClick={(e) => handleClick(e, 'home')}>© Rafly Anggara Putra. All right reserved.</a></p>
          </aside> 
        </footer>
        </>
    )
}