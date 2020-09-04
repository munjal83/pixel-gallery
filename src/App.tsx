import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
//import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '0 auto',
    padding: 20,
  }
};

function App() {

  const [data, setData] = useState({ data: []});
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [galleryData, setGalleryData] = useState();

  
  useEffect(() => {
    fetchData();
  }, [offset]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const API_KEY = process.env.REACT_APP_CONSUMER_KEY;
    const API_URL = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=';  
    const response =  await axios.get(`${API_URL}${API_KEY}`);
    const photos = response.data.photos.slice(offset, offset + perPage);
    
    setData(response.data);
    paginate(photos, response.data);
  }

  const paginate = ((arr, data) => {
    const galleryData = arr.map(photo =>
              <React.Fragment>
                <div>
                  <img src={photo.image_url} onClick={() => handleImageClick(photo.image_url)} alt={photo.name} />
                </div>
              </React.Fragment>)
            
            const pageCount = Math.ceil(data.photos.length / perPage);

            setPageCount(pageCount);
            setGalleryData(galleryData);

  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset);

  };

  const handleImageClick = (url) => {
    console.log(url)
  }

    return (
      <div className="App">
        <div>
          <div style={styles.root}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  Five Hundred Pixels
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <Paper style={styles.paper} elevation={3}>
          <div className="container" >
            {galleryData}
          </div>
          </Paper>
          <div className="justify">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={'pages pagination'}
              activeClassName={"active"} />
          </div>
        </div>
      </div>
    );
  }

export default App;
