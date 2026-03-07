import { useState, useEffect, useLayoutEffect } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Use layout effect to set isMounted before first paint
  useLayoutEffect(() => {
    setIsMounted(true);
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMounted]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col gap-1.5 focus:outline-none relative z-50 p-2 active:opacity-70 transition-opacity"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        type="button"
      >
        <span
          className="w-6 h-0.5 bg-gray-800 transition-all duration-300 block"
          style={{
            transform: isOpen ? 'rotate(45deg) translateY(10px)' : 'rotate(0)',
          }}
        />
        <span
          className="w-6 h-0.5 bg-gray-800 transition-all duration-300 block"
          style={{
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          className="w-6 h-0.5 bg-gray-800 transition-all duration-300 block"
          style={{
            transform: isOpen ? 'rotate(-45deg) translateY(-10px)' : 'rotate(0)',
          }}
        />
      </button>

      {/* Mobile Menu Backdrop + Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 z-30 bg-black/20 md:hidden"
            onClick={closeMenu}
            role="presentation"
          />

          {/* Menu */}
          <div className="fixed left-0 right-0 top-16 z-40 bg-white md:hidden max-h-[calc(100vh-64px)] overflow-y-auto shadow-lg">
            <nav className="flex flex-col divide-y divide-gray-100">
              <a
                href="/"
                onClick={closeMenu}
                className="text-lg font-semibold text-gray-800 hover:bg-blue-50 active:bg-blue-100 transition-colors py-4 px-6 block w-full text-left"
              >
                Início
              </a>
              <a
                href="/sobre"
                onClick={closeMenu}
                className="text-lg font-semibold text-gray-800 hover:bg-blue-50 active:bg-blue-100 transition-colors py-4 px-6 block w-full text-left"
              >
                Sobre
              </a>
              <a
                href="/servicos"
                onClick={closeMenu}
                className="text-lg font-semibold text-gray-800 hover:bg-blue-50 active:bg-blue-100 transition-colors py-4 px-6 block w-full text-left"
              >
                Serviços
              </a>
              <a
                href="/contato"
                onClick={closeMenu}
                className="text-lg font-semibold text-white bg-primary hover:bg-blue-600 active:bg-blue-700 transition-colors py-4 px-6 block w-full text-left"
              >
                Contato
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
