import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; // Import the new CSS

function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { name, password });
      if (res.data.success) {
        navigate('/success');
      } else {
        navigate('/fail');
      }
    } catch (err) {
      console.error(err);
      navigate('/fail');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={name} onChange={e => setName(e.target.value)} className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" />
      <button onClick={handleLogin} className="form-button">Login</button>
      <button onClick={() => navigate('/register')} className="form-button secondary">Go to Register</button>
    </div>
  );
}

export default LoginPage;
