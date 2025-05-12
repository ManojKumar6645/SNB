import { useState, useEffect } from 'react';
import logo from '../assets/images/smartneckband-logo.png'
export default function Header({ isMobileMenuOpen, toggleSidebar }) {
    const [isDark, setIsDark] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Sync with system preference and localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen(prev => {
            if (prev) setIsProfileOpen(false);
            return !prev;
        });
    };

    const toggleProfile = () => {
        setIsProfileOpen(prev => {
            if (prev) setIsNotificationsOpen(false);
            return !prev;
        });
    };

    const closeMenus = () => {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
    };

    // Sample notifications data
    const notifications = [
        { id: 1, type: 'message', title: 'New message', content: 'You have 5 unread messages', time: '2 min ago', unread: true },
        { id: 2, type: 'sale', title: 'New sale', content: 'Order #1234 has been completed', time: '1 hour ago', unread: true },
        { id: 3, type: 'alert', title: 'System update', content: 'Scheduled maintenance tonight', time: '3 hours ago', unread: false }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="sticky top-0 z-40 py-3 bg-white shadow-sm dark:bg-gray-800 transition-colors duration-300">
            <div className="container flex items-center justify-between h-full px-4 mx-auto md:px-6">
                {/* Mobile menu button and logo */}
                <div className="flex items-center space-x-4">
                    {/* Mobile Menu Toggle (Hamburger icon) */}
                    <button
                        className="mobile-menu-button p-1 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        onClick={toggleSidebar}  // Make sure this is using the correct prop name
                        aria-label="Menu"
                    >
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Logo & Brand Name */}
                    <div className="flex items-center space-x-2">
                        <img
                            src={logo}
                            alt="Smart Neckband Logo"
                            className="h-12 w-15 object-cover"
                        />
                        <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400 hidden sm:block">
                            Smart Neckband
                        </h1>
                    </div>
                </div>


                {/* Search input - shown only on medium+ screens */}
                <div className="hidden md:flex justify-center flex-1 mx-4 lg:mx-8">
                    <div className="relative w-full max-w-xl">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            className="w-full py-2 pl-10 pr-4 text-sm text-black-700 placeholder-black-500 bg-gray-100 border-0 rounded-lg dark:bg-gray-700 dark:text-black-600 dark:placeholder-black-600 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                            type="text"
                            placeholder="Search animals details..."
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Right menu */}
                <div className="flex items-center space-x-4 sm:space-x-6">
                    {/* Mobile search button - shown only on small screens */}
                    <button className="p-1 md:hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400">
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Theme toggler */}
                    {/* <button
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-200"
                        onClick={toggleTheme}
                        aria-label="Toggle color mode"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button> */}

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={toggleNotifications}
                            aria-label="Notifications"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-200 relative"
                        >
                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {isNotificationsOpen && (
                            <div
                                className="absolute right-0 mt-2 w-80 max-w-xs sm:max-w-sm origin-top-right bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                                onMouseLeave={closeMenus}
                            >
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">Notifications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{unreadCount} unread</p>
                                </div>

                                <div className="max-h-96 overflow-y-auto custom-scrollbar divide-y divide-gray-100 dark:divide-gray-700">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ${notification.unread ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                                                }`}
                                        >
                                            <div className="mt-1">
                                                {notification.type === 'message' && (
                                                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                )}
                                                {notification.type === 'sale' && (
                                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {notification.type === 'alert' && (
                                                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                                                <p className="font-medium">
                                                    {notification.title}
                                                    {notification.unread && (
                                                        <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                                                    )}
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-400">{notification.content}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
                                    <a href="#" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                                        View all notifications
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Profile Menu */}
                    <div className="relative">
                        <button
                            onClick={toggleProfile}
                            aria-label="Account"
                            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 rounded-full"
                        >
                            <img
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500 dark:ring-purple-400"
                                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=crop&w=200&q=80"
                                alt="Profile"
                            />
                            <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
                        </button>

                        {isProfileOpen && (
                            <div
                                className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 divide-y divide-gray-100 dark:divide-gray-700"
                                onMouseLeave={closeMenus}
                            >
                                <div className="px-4 py-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                                </div>
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                                    >
                                        Settings
                                    </a>
                                </div>
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                                    >
                                        Log out
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}