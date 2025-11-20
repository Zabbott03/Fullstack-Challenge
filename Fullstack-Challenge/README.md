# Usage

In order to use this app and view the website, you first need to install the dependencies by running `npm install` in the main folder. Then you can start the development server by running `npm run dev`. The terminal will show the local host URL that the server is being run on, typically http://localhost:5173/ . You also need to have `npm` and `node.js` installed on your system. 

You can then play the game by selected your desired difficulty and category of questions, and then clicking the "Start!" button.

## Tools Used

This project was created using Vite, a service that bundles and deploys the code to a development server. 

The Open Trivia DB API is used to obtain the questions and answers that are used in the game. 

Features from the React library were used such as `useState`, `useEffect`, and `useRef`.

## Future Features

With more time I would have loved to add in the optional features suggested in the prompt, such as a timer for each question and a persistent leaderboard. I would also have liked to make the overall visuals of the app a bit more interesting and captivating. I also would have added in more categories, as well as an option to select the amount of questions the player has to answer. I think it would be cool to have an image of some sort associated with each of the questions, which would require the use of another API to get the images.