// src/components/Home.js
import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import myImage from "../images/e7b2ce0dae12eb4726b83cee0d0009c5.jpg";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const center = {
  lat: 51.5226, //UCL
  lng: -0.1306,
};




function Home() {
  const [locations, setLocations] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


  useEffect(() => {
    const fetchfoundItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "found_items"));
        const foundItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          location: doc.data().location, 
        }));

        const updatedLocations = await Promise.all(
          foundItems.map(async (item) => {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(item.location)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

            try {
              const response = await fetch(url);
              const data = await response.json();

              if (data.status === "OK") {
                const { lat, lng } = data.results[0].geometry.location;
                return { ...item, lat, lng };
              } else {
                console.error(`Geocoding failed for ${item.location}:`, data.status);
                return item; 
              }
            } catch (error) {
              console.error(`Error fetching coordinates for ${item.location}:`, error);
              return item; 
            }
          })
        );

        setLocations(updatedLocations);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchfoundItems();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div class="container-fluid py-5 mt-5">
      <div class="jumbotron">
        <h1 class="display-5 fw-bold text-center">
        Anagolay - Lost & Found at Uni: Uniting Students with Their Belongings
        </h1>
        <div class="container">
          <div class="text">
            <p class="col-md-8 fs-4">
              "Anagolay - Lost & Found at Uni" is a dedicated platform for university
              students to report and locate lost items within the campus. With
              easy-to-navigate features, students can
              <ul>
                <li>Report lost items</li>
                <li>
                  View found items, which can be filtered using the filter
                  function
                </li>
                <li>Potentially get free drinks/items!!</li>
              </ul>
            </p>
          </div>
          <div class="image">
            <img src={myImage} class="homeImage" alt="img"></img>
          </div>
        </div>
      </div>
      <div class="row align-items-md-stretch">
        <div class="parent">
          <div class="child">
            <div class="first">
              <h2>Report Lost Items Easily</h2>
              <p>
                Lost an item?? <br></br>Our platform allows you to quickly report lost
                items with a detailed description and location. This helps
                increase the chances of your items being found and returned.
              </p>
              <button type="button" class="button">
                <Link to="/Report">Report Lost Item</Link>
              </button>
            </div>
          </div>
          <div class="child">
            <div class="second">
              <h2>Report Found Items</h2>
              <p>
                Found an item lying around campus? <br></br> Report it here with a
                description of the item and the location.
              </p>
              <button type="button" class="button">
                <Link to="/Find">Report Found Item</Link>
              </button>
            </div>
          </div>
          <div class="child">
            <div class="third">
              <h2>Find Your Item</h2>
              <p>
                Not a user or haven't logged in yet? Click <Link to="/Login">here</Link> to sign up and login. </p> <p>Otherwise, click on button below and check if anyone has found your lost items.
              </p>
              <button type="button" class="button">
                <Link to="/History">Find your Lost Item</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Did you lose your item? Check the map for found items!</p>
      </div>
      <div class="mapContainer">
      <GoogleMap mapContainerClassName="mapContainer" center={center} zoom={12}>
      {locations.map(
            (location) =>
              location.lat &&
              location.lng && (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.location}
                />
              )
          )}
    </GoogleMap>
    </div>
    </div>
  );
}

export default Home;
