# Consul Homepage:
Web UI for Consul! 

**Note: In progress**

## Homepage
- Edit .env file and change the url and port of the consul leader
- ```yarn```
- ```yarn start```

### Create Consul Service

- ```docker exec -it consul-agent sh```
- ```cd consul/config```
- ```vi web.json``` : 'i' for insert
- Paste:
  ```
  {
  "service": {
    "id": "nginx",
    "name": "nginx",
    "port": 80,
    "tags": ["secure=false","homepage=true"]
    }
  }
  ```
- NB: Set secure=true if service requires https
- esc -> :wq!
- ```consul reload```


# REACT STUFF
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.