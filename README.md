# Pixel-Gallery

![Pixel Gallery](/public/images/image.gif)

This is a React Photo Gallery application that fetches the data through [500px](https://github.com/500px/legacy-api-documentation) API. The data fetched is from the `popular` category. 

The Photos are presented in a responsive `grid` format which uses `Pagination` to display page numbers which users can click through to see more photos in the category. Each page displays `9` photos.

When an image in the gallery is clicked it opens in a fullscreen version. It also display data like `name`, `description`, `photographer name` along with the number of `views` the image currently has.  

## Technologies and modules

The Application uses `React` and `TypeScript` on the front end while it fetches the data from an external `API` using [axios](https://www.npmjs.com/package/axios). The `get` request requires certain fields like `feature`, `image_size`, `rpp` and `consumer_key` which can be passed through a [.env](https://create-react-app.dev/docs/adding-custom-environment-variables/) file.

The pagination is implemented using [react-paginate](https://www.npmjs.com/package/react-paginate). The grid format is done using pure `css` while the styling of the `PhotoGrid`, `FullScreen` and `Photo` components is done using components from [Material-UI](https://material-ui.com/). 

## To run the App

Run `npm install` to install all the project dependencies.

`npm run start`

Runs the app in the development mode.
You can find the app at http://localhost:3000 

*If you encounter [CORS issues](https://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations) then follow [this](https://create-react-app.dev/docs/proxying-api-requests-in-development/) guide for proxing API requests*

## To build the App

`npm run build`

Builds and packages the app in the `build` folder

## To run the tests

`npm test`
