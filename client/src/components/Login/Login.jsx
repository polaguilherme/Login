import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Login = () => {
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
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Resposta do servidor:', data);
  
        if (data.message === 'Autenticação bem-sucedida') {
          const { nome } = data;
          navigate('/home',{ state: { nomeUsuario: nome } });
        } else {
          setShowAlert(true);
        }
      } else {
        console.error('Erro ao verificar o cliente');
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }

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
        <h1 className="text-white text-2xl mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
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
            Entrar
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
              <span className="mr-2">Email ou senha incorretos!</span>
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

export default Login;
