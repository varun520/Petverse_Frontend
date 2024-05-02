import { useState, useEffect } from 'react';
import saloon1 from '../assets/grooming.jpg';
import Heade2r from '../componants/Heade2r'
import Header from '../componants/Header'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { ChakraBaseProvider } from '@chakra-ui/react';
const SaloonList = () => {
  const { userid } = useParams();
  
  const [loca, setLoca] = useState('');
  const [salons, setSalons] = useState([]);
  const { location } = useParams();
  

  const labelStyle = {
    fontFamily: 'Open Sans, sans-serif',
  };

  useEffect(() => {
    setLoca(location);
  }, [location]);

  useEffect(() => {
    fetchSalons();
  }, [location, loca, setLoca, salons, setSalons]);

  const fetchSalons = async () => {
    try {
      const response = await fetch(`https://petverse-3.onrender.com/salon/Hyderabad`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setSalons(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
    <ChakraBaseProvider>
      {userid !== undefined ? (
        <Header />
      ) : <Heade2r/>}
      <div className="container" >
      <>
        {salons.map((item) => (
          <>
          <div className="saloon-container1" style={{ display: 'flex' }}>
            <div className="image-container">
              <Image src={`https://petverse-3.onrender.com/uploads/${item.image}`} alt="Your Image" className="img-fluid" boxSize='1rem' style={{  height: 'auto', width: '118%',
    
    marginTop: '8rem',
    marginLeft: '6rem' }}
     />
            </div>
            <div className="content-container" style={{ marginLeft: '125px', marginTop: '20px' }}>
              <h2 className="title" style={{ marginLeft: '20px', marginBottom: '20px', labelStyle }}>{item.title}</h2>
              <p className="description" style={{ marginLeft: '25px', labelStyle }}>
                {item.description}
              </p>
              <br />
              <div className="location">
                <h6 style={{ marginLeft: '24px', labelStyle }}><b>Location:</b> {item.address}</h6>
              </div>
              <div className="location">
                <h6 style={{ marginLeft: '24px', labelStyle }}><b>Phone:</b> {item.phoneNumber}</h6>
              </div>
              <Link to={`/saloonsingle/${item.title}/${userid}`}>Read more</Link>
            </div>
          </div>
          <br /><br />
        
          </>
        ))}
        </>
      </div>
      </ChakraBaseProvider>
    </>
  );
}

export default SaloonList;
