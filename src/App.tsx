import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FullScreen from './components/FullScreen';
import { withStyles } from '@material-ui/core/styles';

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

  const [data, setData] = useState({ data: [] });
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [galleryData, setGalleryData] = useState();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]); 
  const fetchData = async () => {
    const API_KEY = process.env.REACT_APP_CONSUMER_KEY;
    const feature = 'popular';
    const rpp = 100;
    const image_size = 600;
    const API_URL = `https://api.500px.com/v1/photos?feature=${feature}&rpp=${rpp}&image_size=${image_size}&consumer_key=`;
    const response = await axios.get(`${API_URL}${API_KEY}`);
    const photos = response.data.photos.slice(offset, offset + perPage);

    setData(response.data);
    paginate(photos, response.data);
  }

  const paginate = ((arr, data) => {
    const galleryData = arr.map(photo =>
      <React.Fragment>
        <div>
          <img src={photo.image_url} onClick={() => openFullScreen(photo)} alt={photo.name} />
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

  const openFullScreen = (photo) => {
    setOpen(true);
    setSelectedPhoto(photo);
  }

  const closeFullScreen = () => {
    setClose(true);
    setOpen(false);
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
        <FullScreen
          open={open}
          close={closeFullScreen}
          photo={selectedPhoto}
        />

      </div>
    </div>
  );
}

export default withStyles(styles)(App);
