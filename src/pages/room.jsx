import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import '../cssfolder/room.css'; 

const RoomDetail = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Simulated room data (replace with your actual API call)
    const simulatedRoomData = {
      title: 'Cozy Beachfront Villa',
      description:
        'A beautiful beachfront villa with stunning ocean views. Enjoy the sound of waves and a private beach access.',
      price: 150,
      rating: 4.8,
      location: 'Malibu, California',
      imageUrls: [
        'https://a0.muscache.com/im/pictures/c8c0c60c-3a2e-43ef-9453-b9e173e63179.jpg?im_w=960',
        'https://a0.muscache.com/im/pictures/0bd7d895-e09e-43f9-a760-956ef1ae2d39.jpg?im_w=480',
        'https://a0.muscache.com/im/pictures/43e258b9-83a5-47e9-8d5b-46d78060c665.jpg?im_w=480',
      ],
      capacity: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Kitchen', 'Free Parking'],
    };

    // Simulate an API request delay
    setTimeout(() => {
      setRoom(simulatedRoomData);
    }, 1000);
  }, [roomId]);

  if (!room) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="room-detail">
      <div className="carousel-container">
        <Carousel showThumbs={false} dynamicHeight={true}>
          {room.imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Room ${index + 1}`}  className="carousel-image"/>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="room-info-container">
        <div className="room-info">
          <h1 className="room-title">{room.title}</h1>
          <p className="room-location">{room.location}</p>
          <div className="room-stats">
            <p className="room-rating">Rating: {room.rating}</p>
            <p className="room-price">${room.price} per night</p>
          </div>
          <p className="room-description">{room.description}</p>
          <div className="room-details">
            <p>Capacity: {room.capacity} guests</p>
            <p>Bedrooms: {room.bedrooms}</p>
            <p>Bathrooms: {room.bathrooms}</p>
            <p>Amenities:</p>
            <ul className="amenities-list">
              {room.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
