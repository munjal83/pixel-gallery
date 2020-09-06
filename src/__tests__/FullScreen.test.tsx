import React from 'react';
import ReactDOM from 'react-dom';
import FullScreen from '../components/FullScreen';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";

const open = true;
const photo = {
    image_url: "",
    user: {
        fullname: "john doe"
    }
};

describe('FullScreen', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FullScreen open={open} photo={photo} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('matches the snapshot', () => {
        const tree = renderer.create(<FullScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("captures full screen clicks", async() => {

        const { getByTestId } = render(<FullScreen />);
        const node = getByTestId("dialog");
        await act(async () => {
            fireEvent.click(node);
        });
    });

    afterEach(cleanup);
});
