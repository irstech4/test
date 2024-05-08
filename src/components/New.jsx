import React, { useState } from 'react';

const navItems = [
  {
    title: 'Menu 1',
    submenu: [
      { title: 'Submenu 1.1', href: '#' },
      {
        title: 'Submenu 1.2',
        submenu: [ // Nested submenu
          { title: 'Submenu 1.2.1', href: '#' },
          { title: 'Submenu 1.2.2', href: '#' },
        ],
      },
      { title: 'Submenu 1.3', href: '#' },
    ],
  },
  {
    title: 'Menu 2',
    submenu: [
      { title: 'Submenu 1.1', href: '#' },
      {
        title: 'Submenu 1.2',
        submenu: [ // Nested submenu
          { title: 'Submenu 1.2.1', href: '#' },
          { title: 'Submenu 1.2.2', href: '#' },
        ],
      },
      { title: 'Submenu 1.3', href: '#' },
    ],
  },
  // ... other menu items with similar structure
];

const New = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleMouseEnter = (item) => setActiveItem(item);
  const handleMouseLeave = () => setActiveItem(null);

  return (
    <nav className="fixed top-0 left-0 z-50">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <a href="#" className="text-xl font-bold">Your Logo</a>
      <ul className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <li
            key={item.title}
            className={`relative group px-3 py-2 hover:bg-gray-700 cursor-pointer ${
              activeItem === item ? 'bg-gray-700 active' : ''
            }`}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <a href={item.href}>{item.title}</a>
            {item.submenu && (
              <ul
                className={`absolute top-full left-0 w-full min-h-screen bg-gray-800 shadow-md rounded-lg overflow-auto transition duration-200 ease-in-out ${
                  activeItem === item ? 'block group-hover:block fixed' : 'hidden'
                }`}
              >
                <div className="flex flex-wrap justify-start p-4 md:p-10">
                  {/* Render submenu items */}
                  {item.submenu.map((subItem) => (
                    <li
                      key={subItem.title}
                      className="w-full md:w-1/3 px-2 py-4 hover:bg-gray-700 transition duration-200 ease-in-out"
                    >
                      {subItem.submenu ? (
                        <div className="flex items-center space-x-2">
                          <a href={subItem.href}>{subItem.title}</a>
                          <svg
                            className="h-4 w-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <a href={subItem.href}>{subItem.title}</a>
                      )}
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>

  );
};

export default New;
