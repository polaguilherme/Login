import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";






const Cadastro = () => {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showAlert, setShowAlert] = useState(false);
     


    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (email === '' || senha === '') {
        setShowAlert(true);
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3001/cadastro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, email, senha }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const { nome } = data.novoCliente;
          localStorage.setItem('nomeUsuario', nome);
          console.log('Cliente cadastrado:', data.novoCliente);
          navigate('/login');
        } else {
          console.error('Erro ao cadastrar cliente');
        }
      } catch (error) {
        console.error(error);
      }
  
      setNome('');
      setEmail('');
      setSenha('');
    };
  
    useEffect(() => {
      const handleClickOutside = () => {
        setShowAlert(false);
      };
  
      window.addEventListener('click', handleClickOutside);
  
      return () => {
        window.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="bg-gray-500 p-8 rounded">
          <h1 className="text-white text-2xl mb-6">Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="w-full rounded border border-white px-4 py-2 mb-4 bg-transparent text-white placeholder-white"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="w-full rounded border border-white px-4 py-2 mb-4 bg-transparent text-white placeholder-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full rounded border border-white px-4 py-2 mb-4 bg-transparent text-white placeholder-white"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              className="w-full bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Cadastrar
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
    );
  };
  
  export default Cadastro;
  