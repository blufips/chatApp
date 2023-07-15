// CSS
import './Logout.scss';

// MODULE
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

function Logout() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <button className='logout' onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
}

export default Logout;
