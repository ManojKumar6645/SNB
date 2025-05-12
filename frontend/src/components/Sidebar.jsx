import { useState } from 'react';
import {
    FiHome,
    FiActivity,
    FiDatabase,
    FiPieChart,
    FiHeart,
    FiMap,
    FiSettings,
    FiChevronDown,
    FiChevronUp,
    FiUsers,
    FiBell,
    FiPlus,
    FiUser
} from 'react-icons/fi';
import { IoPawOutline, IoPaw } from 'react-icons/io5';
import { MdPets, MdOutlinePets } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [openMenus, setOpenMenus] = useState({});
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState('Dashboard');

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        // Close sidebar on mobile after selection
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    const mainMenuItems = [
        {
            name: 'Dashboard',
            icon: <FiHome className="w-5 h-5" />,
            activeIcon: <FiHome className="w-5 h-5 text-purple-600" />,
            link: '/'
        },
        {
            name: 'SNB Data',
            icon: <FiHeart className="w-5 h-5" />,
            activeIcon: <FiHeart className="w-5 h-5 text-purple-600" />,
            link: '/snbdata'
        },
        {
            name: 'Activity',
            icon: <FiActivity className="w-5 h-5" />,
            activeIcon: <FiActivity className="w-5 h-5 text-purple-600" />,
            link: '/animalDetail'
        },
        {
            name: 'Users',
            icon: <FiUser className="w-5 h-5" />,
            activeIcon: <FiUser className="w-5 h-5 text-purple-600" />,
            link: '/users'
        }
    ];

    const dropdownMenus = [
        {
            name: 'Pet Tracking',
            icon: <IoPawOutline className="w-5 h-5" />,
            activeIcon: <IoPaw className="w-5 h-5 text-purple-600" />,
            items: [
                { name: 'Pet Health', link: '#', icon: <MdOutlinePets className="w-4 h-4" /> },
                { name: 'Pet GPS', link: '#', icon: <FiMap className="w-4 h-4" /> }
            ]
        },
        {
            name: 'Settings',
            icon: <FiSettings className="w-5 h-5" />,
            activeIcon: <FiSettings className="w-5 h-5 text-purple-600" />,
            items: [
                { name: 'Profile', link: '#', icon: <FiUsers className="w-4 h-4" /> },
                { name: 'Device', link: '#', icon: <FiPieChart className="w-4 h-4" /> }
            ]
        }
    ];

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-20 h-full w-64 bg-white shadow-lg transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0`}
            >
                <div className="flex flex-col h-full py-4">
                    {/* Logo/Brand */}
                    <div className="px-6 py-4 mb-2">
                        <h1 className="text-xl font-bold text-purple-600 flex items-center">
                            <IoPaw className="mr-2" />
                            SmartNeckband
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {/* Main Menu */}
                        <ul className="mt-2">
                            {mainMenuItems.map((item, index) => (
                                <li key={index} className="relative px-6 py-3">
                                    {activeItem === item.name && (
                                        <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" />
                                    )}
                                    <button
                                        onClick={() => {
                                            handleItemClick(item.name);
                                            navigate(item.link);
                                        }}
                                        className={`flex items-center w-full space-x-3 text-medium font-medium transition-colors
                                                 ${activeItem === item.name
                                                ? 'text-purple-600'
                                                : 'text-gray-600 hover:text-purple-500'}`}
                                    >
                                        {activeItem === item.name ? item.activeIcon : item.icon}
                                        <span>{item.name}</span>
                                    </button>

                                </li>
                            ))}
                        </ul>

                        {/* Dropdown Menus */}
                        <ul className="mt-2">
                            {dropdownMenus.map((menu, index) => (
                                <li key={index} className="px-6 py-3">
                                    <button
                                        onClick={() => {
                                            toggleMenu(menu.name);
                                            handleItemClick(menu.name);
                                        }}
                                        className={`flex items-center justify-between w-full text-medium font-medium transition-colors
                                            ${activeItem === menu.name
                                                ? 'text-purple-600'
                                                : 'text-gray-600 hover:text-purple-500'}`}
                                    >
                                        <span className="flex items-center space-x-3" >
                                            {activeItem === menu.name ? menu.activeIcon : menu.icon}
                                            <span>{menu.name}</span>
                                        </span>
                                        {openMenus[menu.name] ? (
                                            <FiChevronUp className="w-4 h-4 transition-transform duration-200" />
                                        ) : (
                                            <FiChevronDown className="w-4 h-4 transition-transform duration-200" />
                                        )}
                                    </button>
                                    {openMenus[menu.name] && (
                                        <ul className="mt-2 ml-8 space-y-2 text-medium">
                                            {menu.items.map((sub, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={sub.link}
                                                        onClick={() => handleItemClick(sub.name)}
                                                        className={`flex items-center space-x-2 px-2 py-1 rounded transition-all duration-200
                                                            ${activeItem === sub.name
                                                                ? 'bg-purple-50 text-purple-700 font-medium'
                                                                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'}`}
                                                    >
                                                        {sub.icon}
                                                        <span>{sub.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="px-6 my-6">
                            <button
                                onClick={() => navigate('/create-account')}
                                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            >
                                Create User
                                <span className="ml-2" aria-hidden="true">+</span>
                            </button>
                        </div>


                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black/30 md:hidden transition-opacity duration-300"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;