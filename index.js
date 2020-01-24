import App from "./App.js";

let appEle = React.createElement(App,{
    jokeCategoryUrl:"https://api.chucknorris.io/jokes/categories",
    randomJokeUrl:"https://api.chucknorris.io/jokes/random?category="
});
ReactDOM.render(appEle,document.getElementById("joker-app"));


