import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListPage.css';

const ListPage = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [editingListId, setEditingListId] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('https://doggypi-backend.onrender.com/api/lists');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleSelectList = async (id) => {
    try {
      const response = await axios.get(`https://doggypi-backend.onrender.com/api/lists/${id}`);
      setSelectedList(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error fetching list details:', error);
    }
  };

  const handleEditList = async (id) => {
    try {
      const updatedList = { ...selectedList, name: newListName };
      const response = await axios.put(`https://doggypi-backend.onrender.com/api/lists/${id}`, updatedList);
      setLists(lists.map(list => (list._id === response.data._id ? response.data : list)));
      setSelectedList(response.data);
      setEditMode(false);
      setEditingListId(null);
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await axios.delete(`https://doggypi-backend.onrender.com/api/lists/${id}`);
      setLists(lists.filter(list => list._id !== id));
      if (selectedList && selectedList._id === id) {
        setSelectedList(null);
      }
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return (
    <div className="">
   <video autoPlay loop muted className="background-video">
        <source src="https://videos.pexels.com/video-files/7684014/7684014-sd_640_360_25fps.mp4" type="video/mp4" />
      </video>
    <div className="list-page-container">
      <h1>Saved Lists</h1>
      <div className="list-wrapper">
        <div className="list-menu-section">
          <h2>Lists</h2>
          <ul>
            {lists.map((list) => (
              <li key={list._id}>
                <div onClick={() => handleSelectList(list._id)}>
                  {editingListId === list._id ? (
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder={list.name}
                    />
                  ) : (
                    list.name
                  )}
                </div>
                {editingListId === list._id ? (
                  <button onClick={() => handleEditList(list._id)} className='save-button'>Save</button>
                ) : (
                  <div className="action-buttons">
                    <hr className='horizontal-line'/>
                    <button onClick={() => {
                      setEditingListId(list._id);
                      setNewListName(list.name);
                      setEditMode(true);
                    }} className='edit-button'>Edit</button>
                    <button onClick={() => handleDeleteList(list._id)} className='delete-button'>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {selectedList && (
          <div className="details-section">
            <h2>{selectedList.name}</h2>
            <p>Created on: {new Date(selectedList.creationDate).toLocaleDateString()}</p>
            <div className="scrollable-image-container">
              <div className="image-grid">
                {selectedList.imageLinks.map((url, index) => (
                  <img key={index} src={url} alt={`HTTP ${selectedList.responseCodes[index]}`} className="image-item" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
</div>
  );
};

export default ListPage;
