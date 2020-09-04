import React from 'react';
import './App.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate'


class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 9,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const API_KEY = process.env.REACT_APP_CONSUMER_KEY;
    const API_URL = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=';
    axios.get(`${API_URL}${API_KEY}`)
      .then(res => {
        const data = res.data;
        console.log(data);
        const slice = data.photos.slice(this.state.offset, this.state.offset + this.state.perPage);

        const galleryData = slice.map(data => 
        <React.Fragment>
          <div>
            <img src={data.image_url} alt="" />
          </div>
        </React.Fragment>)

        this.setState({
          pageCount: Math.ceil(data.total_items / this.state.perPage),
          galleryData
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

  render() {
    return (
      <div className="App">
        <div>
          <div className="container">
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
