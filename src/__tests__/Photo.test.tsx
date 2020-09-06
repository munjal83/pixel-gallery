import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Photo from '../components/Photo';

const photo = {
  image_url: "",
  times_viewed: 999,
  user: {
    fullname: "john doe"
  }
}

describe('Photo', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Photo selectedPhoto={photo} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches the snapshot', () => {
    const tree = renderer.create(<Photo selectedPhoto={photo}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

  it('renders Photo component', () => {
    render(<Photo selectedPhoto={photo} />);

    expect(screen.getByText(/by/)).toBeInTheDocument();
  });

  it('renders with props', () => {
    render(<Photo selectedPhoto={photo} />);

    expect(screen.getByText("Views: 999")).toBeInTheDocument();
  })
});
