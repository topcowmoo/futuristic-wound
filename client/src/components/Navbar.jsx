import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const currentPage = useLocation().pathname;
    const pages = [
        ['Adventure', '/Adventure'],
        ['Monster Closet', '/Closet'],
    ];
    return (
        <nav className="flex items-center space-x-4 mx-auto lg:float-right lg:mt-12">
            {pages.map(([title, url]) => (
                <Link
                    key={url}
                    to={url}
                    className={`text-lg font-medium ${
                        currentPage === url ? 'text-blue-700' : 'text-gray-900'
                    }`}
                >
                    {title}
                </Link>
            ))}
        </nav>
    );
}
export default Navbar;