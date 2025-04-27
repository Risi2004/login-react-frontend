import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; // Import the same CSS

function RegisterPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { name, password });
      alert('Registration Successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        alert('User already exists!');
      } else {
        alert('Registration failed.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={name} onChange={e => setName(e.target.value)} className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" />
      <button onClick={handleRegister} className="form-button">Register</button>
      <button onClick={() => navigate('/')} className="form-button secondary">Back to Login</button>
    </div>
  );
}

export default RegisterPage;
