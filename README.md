# Pixel-Gallery

This is a simple React Photo Gallery application that fetches the data through `500px` API. The data fetched is from the `popular` category. 

The Photos are presented in a grid format which then uses Pagination to display on different pages which users can click through.

When the image is clicked it opens in a fullscreen version along with some data like `name`, `description`, `photographer name` along with the number of `views` the image currently has. 

## Technologies and modules

The Application uses `React` and `TypeScript` on the front end while it fetches the data from an external `API` using `axios`. The `get` request requires certain fields like `feature`, `image_size`, `rpp` and `consumer_key` which can be passed through a `.env` file.

The pagination is implemented using `react-paginate`. The grid format is done using pure `css` while the styling of the `PhotoGrid`, `FullScreen` and `Photo` components is done using components from `Material-UI`. 

## To run the App

`npm run start`

Runs the app in the development mode.
You can find the app at http://localhost:3000 

## To build the App

`npm run build`

Builds and packages the app in the `build` folder

## To run the tests

`npm test`
