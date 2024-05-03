import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const currentPage = useLocation().pathname;
    const pages = [
        ['Adventure', '/Adventure'],
        ['Monster Closet', '/Closet'],
    ];

    return (
        <nav className="fixed top-20 left-0 mt-4 ml-4 flex z-10">
                {/* Buttons for Navbar */}
                {pages.map(([title, url], index) => (
                    <div key={url} className="mr-1">
                        <Link
                            to={url}
                            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 shadow-[0px_8px_8px_0px_rgba(2,48,71,1)]"
                        >
                            {title}
                        </Link>
                    </div>
                ))}
        </nav>
    );
}

export default Navbar;

