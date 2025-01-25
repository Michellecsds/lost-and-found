// src/components/Home.js
import React from "react";
import "./home.css";
import myImage from "../images/e7b2ce0dae12eb4726b83cee0d0009c5.jpg";

function Home() {
  return (
    <div class="container-fluid py-5 mt-5">
      <div class="jumbotron">
        <h1 class="display-5 fw-bold text-center">
          Lost & Found at Uni: Uniting Students with Their Belongings
        </h1>
        <div class="container">
          <div class="text">
            <p class="col-md-8 fs-4">
              "Lost & Found at Uni" is a dedicated platform for university
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
            <img src={myImage} class="homeImage" alt = "img"></img>
          </div>
        </div>
      </div>
      <div class="row align-items-md-stretch">
        <div class="parent">
          <div class="child">
            <div class="first">
              <h2>Report Lost Items Easily</h2>
              <p>
              Our platform allows you to quickly report lost items with a detailed description and location. This helps increase the chances of your items being found and returned.
              </p>
              <button type="button" class = "button">Report Lost Item</button>
            </div>
          </div>
          <div class="child">
            <div class="second">
              <h2>Find and Claim Found Items</h2>
              <p>
              Browse through the list of found items reported by others. If you find your item, you can easily claim it and arrange for its return.
              </p>
              <button type="button" class = "button">Find Found Item</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
