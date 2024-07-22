import React, { useState } from 'react';
import axios from 'axios';
import './SearchPage.css';

const SearchPage = () => {
  const [responseCode, setResponseCode] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [listName, setListName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (!responseCode) {
      alert('Please enter a response code');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setImageUrls([]);

    let pattern = responseCode.replace(/x/g, '\\d');
    let regex = new RegExp(`^${pattern}`);
    const baseUrl = 'https://http.dog/';
    const urls = Array.from({ length: 500 }, (_, index) => index + 100)
      .filter((code) => regex.test(code.toString()))
      .map((code) => `${baseUrl}${code}.jpg`);

    const fetchedImages = [];
    for (const url of urls) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          fetchedImages.push(url);
        }
      } catch (error) {
        // if image is not found
        console.error(`Image ${url} not found`);
      }
    }

    setLoading(false);

    if (fetchedImages.length === 0) {
      setErrorMessage('No images found for the given response code.');
    }

    setImageUrls(fetchedImages);
  };

  const handleSave = async () => {
    if (!listName || imageUrls.length === 0) {
      alert('Please complete the list name and search results before saving');
      return;
    }

    const responseCodes = imageUrls.map(url => url.match(/(\d+)\.jpg$/)[1]);

    try {
      await axios.post('https://doggypi-backend.onrender.com/api/lists', {
        name: listName,
        responseCodes,
        imageLinks: imageUrls
      });
      alert('List saved successfully');
    } catch (error) {
      console.error('Error saving list:', error);
      alert('Error saving list');
    }
  };

  return (
 <div className="">
   <video autoPlay loop muted className="background-video">
        <source src="https://videos.pexels.com/video-files/7684014/7684014-sd_640_360_25fps.mp4" type="video/mp4" />
      </video>
<div className="search-page">
  <h1>Search Images</h1>
  <input
    type="text"
    value={responseCode}
    onChange={(e) => setResponseCode(e.target.value)}
    placeholder="Enter response code"
    className="input-box"
  />
  <input
    type="text"
    value={listName}
    onChange={(e) => setListName(e.target.value)}
    placeholder="Enter list name"
    className="input-box"
  />
  <div className="btn">
    <button onClick={handleSearch} className="search-button">Search</button>
    <button onClick={handleSave} className="search-button">Save</button>
  </div>
  {loading && <div className="loader"></div>}
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  <div className="image-container">
    <div className="image-grid">
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`HTTP ${url}`} className="dog-image" />
      ))}
    </div>
  </div>
</div>
</div>
  );
};

export default SearchPage;
