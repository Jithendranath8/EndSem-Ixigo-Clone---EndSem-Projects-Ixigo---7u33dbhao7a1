// import React, { useState } from 'react';
// import SearchPanel from '../components/SearchPanel.js';
// import HotelList from '../components/HotelList';

// const Home = () => {
//   const [hotels, setHotels] = useState([]);

//   const handleSearch = async (city) => {
//     const projectID = 'f104bi07c490'; // Replace with your actual project ID
//     const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`, {
//       headers: {
//         'projectID': projectID,
//         'accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await response.json();
//     console.log(data)
//     if (data.message === 'success') {
//       setHotels(data.data.hotels);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <SearchPanel onSearch={handleSearch} />
//       <HotelList hotels={hotels} />
//     </div>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import SearchPanel from '../components/SearchPanel.js';
import HotelList from '../components/HotelList';

const Home = () => {
  const [hotels, setHotels] = useState([]);

  const handleSearch = async (city, sortOption) => {
    const projectID = 'f104bi07c490'; // Replace with your actual project ID
    let sort = {};
    switch (sortOption) {
      case 'priceAsc':
        sort = { avgCostPerNight: 1 };
        break;
      case 'priceDesc':
        sort = { avgCostPerNight: -1 };
        break;
      case 'ratingAsc':
        sort = { rating: 1 };
        break;
      case 'ratingDesc':
        sort = { rating: -1 };
        break;
      default:
        break;
    }
    const sortString = encodeURIComponent(JSON.stringify(sort));
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}&sort=${sortString}`, {
      headers: {
        'projectID': projectID,
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
    if (data.message === 'success') {
      setHotels(data.data.hotels);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchPanel onSearch={handleSearch} />
      <HotelList hotels={hotels} />
    </div>
  );
};

export default Home;
