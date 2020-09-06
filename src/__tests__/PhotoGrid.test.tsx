import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import PhotoGrid from '../components/PhotoGrid';

const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock("axios", () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                photos: [{
                    image_url: 'some url',
                    images: {
                        name: 'some name',
                        image_size: 22,
                    }
                }
                ]
            }
        })),
    };
});

afterEach(cleanup);

describe('PhotoGrid', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PhotoGrid />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('matches the snapshot', () => {
        const tree = renderer.create(<PhotoGrid />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders PhotoGrid component', () => {
        render(<PhotoGrid/>);

        expect(screen.getByText(/Five Hundred/)).toBeInTheDocument();
    });

    it("captures image clicks",  async() => {

        const { getByTestId } = render(<PhotoGrid/>);
        const node = getByTestId("photo");
        await act(async () => {
            fireEvent.click(node);
        });
    });

    it("fetches data from api", () => {
        
        mockedAxios.get.mockImplementation(() => Promise.resolve({ data: {} }));
        expect(axios.get).toHaveBeenCalled();

    });

    it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Network Error';
     
        mockedAxios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
        );
      });
});
