import {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";


const Home = () => {
  const [turma, setTurma] = useState('');
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const nomeUsuario = location.state?.nomeUsuario || '';


  


  const handleTurmaChange = (e) => {
    const inputTurma = e.target.value;
    let formattedTurma = '';

    if (inputTurma.length === 1) {
      formattedTurma = inputTurma;
    } else if (inputTurma.length === 2 && inputTurma.indexOf('-') === -1) {
      formattedTurma = `${inputTurma}-`;
    } else if (inputTurma.length > 2) {
      const firstDigit = inputTurma.slice(0, 1);
      const restDigits = inputTurma.slice(1);
      const formattedRestDigits = restDigits.replace(/\D/g, '').slice(0, 2);
      formattedTurma = `${firstDigit}-${formattedRestDigits}`;
    }

    setTurma(formattedTurma);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (turma == '') {
      setShowAlert(true)
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/horarios', {
        method: 'POST',
        headers:{ 
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({ turma })
      });

      if (response.ok) {
        console.log('horario cadastrado');
      }

    } catch (error) {
      console.error();
    }
    

    setTurma('');
  };



  return (
    
    <div>
      
      <header className="bg-yellow-500 flex justify-between items-center p-4">
        <h1 className="text-white text-2xl">CEDUP CLASS</h1>
      </header>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="bg-gray-500 p-8 rounded">
          <h1 className="text-white text-2xl mb-6">Home</h1>
          <div className="mb-4">
            <span className="text-white">Nome: </span>
            <span className="text-white font-bold">{nomeUsuario}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="w-full rounded border border-white px-4 py-2 mb-4 bg-transparent text-white placeholder-white"
              type="text"
              placeholder="Turma (Ex: 3-52)"
              value={turma}
              onChange={handleTurmaChange}
            />
            <button
              className="w-10 h-10 bg-yellow-500 hover:bg-orange-500 text-white font-bold rounded-full flex justify-center items-center text-center"
              type="submit"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
          <CSSTransition
            in={showAlert}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <div className="bg-red-500 text-white p-4 rounded">
                <span className="mr-2">Campos em branco!</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default Home;
