import { useState } from 'react';
import './Header.css';
import logoo from '../assets/Petverse_logo.jpeg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart, faHeart, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../pages/authSlice';
import axios from 'axios'; 

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };





  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3002/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="logo">
          <Link to={`/user/main/${userid}`}>
            <img src={logoo} alt="Logo" />
          </Link>
        </div>
        <div className="user-actions">
          <div className="user-action-group">
            <button className="user-button">
              <Link to={`/user/products/${userid}/CAT`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white', padding: '2rem' }}>Cat</span>
              </Link>
            </button>
          </div>
          <div className="user-action-group">
            <button className="user-button">
              <Link to={`/user/products/${userid}/DOG`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white', padding: '2rem' }}>Dog</span>
              </Link>
            </button>
          </div>
          <div className="user-action-group">
            <button className="user-button">
              <Link to={`/user/salon/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white', padding: '2rem' }}>Salon</span>
              </Link>
            </button>
          </div>
        </div>
        
        <div className="search-bar">
      <input
        type="text"
        placeholder="Search... "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <FontAwesomeIcon onClick={handleSearch} className="search-icon" icon={faSearch} />
      
    </div>
    {results.length > 0 && (
        <div className="search-results" style={{
          position: 'absolute',
    top: '100%',
   
    zIndex: '100',
    backgroundColor: '#e9a32b',
    border: '1px solid #ccc',
    borderTop: 'none',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)'
        }}>
          {results.map((product) => (
            <Link key={product._id} style={{ textDecoration: 'none', color: 'white' }} to={`/product/${userid}/${product.title}`}>
              <div className="search-result">{product.title}</div>
            </Link>
          ))}
        </div>
      )}

        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {isMenuOpen && <>
          <div className="user-action-group">
            <button className="user-button">
              <Link to='/user/products/CAT' style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Cat</span>
              </Link>
            </button>
          </div>
          <div className="user-action-group">
            <button className="user-button">
              <Link to={`/user/products/${userid}/DOG`} style={{ textDecoration: 'none', color: 'white' }}>
                <span className="label" style={{ textDecoration: 'none', color: 'white', padding: '2rem' }}>Dog</span>
              </Link>
            </button>
          </div>
          <button className="user-button">
            <span className="label">
              <Link to={`/user/salon/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Salon
              </Link>
            </span>
          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faUser} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>
              <Link to={`/User/DashBoard/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Account
              </Link>
            </span>
          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>
              <Link to={`/user/cart/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Cart
              </Link>
            </span>
          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faHeart} />
            <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Wishlist</span>
          </button>
          <button className="user-button" onClick={() => {
            dispatch(logout);
            window.location.href = '/';
          }}>
            Logout
          </button>
        </>}
        <div className="user-actions">
          <button className="user-button">
            <FontAwesomeIcon icon={faUser} />
            <span className="label">
              <Link to={`/User/DashBoard/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
                Account
              </Link>
            </span>
          </button>
          <button className="user-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="label">
              <Link to={`/user/cart/${userid}`} className='custom-link' style={{ textDecoration: 'none', color: 'white' }}>
                Cart
              </Link>
            </span>
          </button>
          <button className="user-button" >
            <FontAwesomeIcon icon={faHeart} />
            <Link to={`/user/wishlist/${userid}`} style={{ textDecoration: 'none', color: 'white' }}>
              <span className="label" style={{ textDecoration: 'none', color: 'white' }}>Wishlist</span >
            </Link>
          </button>
          <button className="user-button" onClick={() => {
            dispatch(logout);
            window.location.href = '/';
          }}>
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
