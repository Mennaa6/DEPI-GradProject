import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async () => {
    const returnTo = location.state && location.state.from ? location.state.from : "/";
    navigate(returnTo);
  };
  return <div>Login</div>;
};

export default Login;
