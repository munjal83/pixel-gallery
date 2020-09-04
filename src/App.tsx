import React from 'react';
import './App.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 6,
      currentPage: 0,
    };
  }

  componentDidMount = () => {
    this.fetchData()
  }

  fetchData = () => {
    const API_KEY = process.env.REACT_APP_CONSUMER_KEY;
    const API_URL = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=';
    axios.get(`${API_URL}${API_KEY}`)
      .then(res => {
        const data = res.data;
        const slice = data.photos.slice(this.state.offset, this.state.offset + this.state.perPage);

        const galleryData = slice.map(data =>
          <React.Fragment>
            <div onClick={this.handleImageClick}>
              <img src={data.image_url} alt="" />
            </div>
          </React.Fragment>)

        this.setState({
          pageCount: Math.ceil(data.photos.length / this.state.perPage),
          galleryData,
          data: data
        })
      });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.fetchData()
    });

  };

  handleImageClick = () => {

  }

  render() {
    console.log(this.state.data)
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
          <div className="container" >
            {this.state.galleryData}
          </div>
          <div className="justify">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"} />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
