import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";

const Horarios = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  


  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="flex flex-col h-screen bg-black">
      <header className="bg-yellow-500 py-4 px-8 items-center">
        <h1 className="text-white text-2xl text-center font-bold">CEDUP CLASS</h1>
      </header>
      <div className="flex">
        <div className="flex-1">
          <div className="bg-gray-500 p-8 rounded">
            <h1 className="text-white text-2xl mb-6">Horários</h1>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-yellow-500 text-lg">Segunda-feira</h2>
              <button
                className="text-white focus:outline-none"
                onClick={toggleAccordion}
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#FCD34D"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#FCD34D"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </button>
            </div>
            {isOpen && (
              <div className="bg-FCD34D p-4 rounded">
                
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="fixed top-4 left-4 text-white focus:outline-none" onClick={onDrawerOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <Drawer placement="left" onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay>
          <DrawerContent bg="#1E293B" color="white">
            <DrawerCloseButton color="white" />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <ul className="flex flex-col justify-center items-center">
                <li className="flex items-center my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <Link to="/" className="text-white">Sua turma</Link>
                </li>
                <li className="flex items-center my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <Link to="/pesquisar" className="text-white">Pesquisar por turma</Link>
                </li>
                <li className="flex items-center my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <Link to="/sair" className="text-white">Sair</Link>
                </li>
              </ul>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default Horarios;
