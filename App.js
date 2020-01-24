import Joke from "./Joke.js";

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            jokeCategories:[],
            isLoading:true,
            categoryListIsVisible:true,
            jokeViewIsVisible:false
        };
        
        this.categoryClicked = this.categoryClicked.bind(this)
        this.backClicked = this.backClicked.bind(this);
    }

    componentDidMount(){
        //retrieve joke categories
        

        fetch(this.props.jokeCategoryUrl)
        .then(response=>response.status==200?response.json():response)
        .then(categories=>{

            this.setState((currentState)=>{
                currentState.isLoading =false;
                currentState.jokeCategories = categories;
                return currentState;
            });

            return categories;
        })
        .catch(err=>console.log(err));
    }

    categoryClicked(event)
    {
        let selectedCategory = event.currentTarget.getAttribute("name");
        let queriedUrl = this.props.randomJokeUrl+selectedCategory;
        this.setState(currentState=>{
            currentState.isLoading=true;
            return currentState;
        });

        //retrieve random joke
        fetch(queriedUrl)
        .then(response=>response.status==200?response.json():response)
        .then(joke=>{

            this.setState((currentState)=>{
                currentState.isLoading =false;
                currentState.jokeViewIsVisible = true;
                currentState.categoryListIsVisible=false;
                return currentState;
            });

            let jokeElement = React.createElement(Joke,{
                joke,
                elementIsVisible:this.state.jokeViewIsVisible
            });

            let jokeContainer = document.getElementById("joke-view");
            ReactDOM.render(jokeElement,jokeContainer);
            return joke;
        })
        .catch(err=>console.log(err));

        
    }

    backClicked(event){
        this.setState(currentState=>{
            currentState.categoryListIsVisible = true;
            currentState.jokeViewIsVisible =false;
            return currentState;
        });
    }
    render(){

        let ele = React.createElement("div",
        null,
        React.createElement("h3",{
            style:{
                textAlign:"center",
                padding:"0.5em"
            }
        },"Jokes",
        React.createElement("span",
        {style:{padding:"0.25em",textAlign:"center","display":"block",fontSize:"0.833em"}},
        "Click On A Category")),
        React.createElement("button",{style:{padding:"0.25em",display:this.state.categoryListIsVisible?"none":"initial"},onClick:this.backClicked},"Back"),
        React.createElement("span",{style:{padding:"0.25em",textAlign:"center","display":"block",fontSize:"1em",fontWeight:"bold"}},this.state.isLoading?"Loading....":""),
        React.createElement("div",{id:"joke-view",style:{display:this.state.jokeViewIsVisible?"block":"none",padding:"0.25em",textAlign:"center",border:"1px solid lightgray"}}),
        ...(this.state.jokeCategories.map((cat,index)=>{
            let listItemEle = React.createElement("div",{
                style:{
                    backgroundColor:index%2===0?"lightgray":"white",
                    padding:"1em",
                    borderBottom:"solid 1px lightgray",
                    cursor:"pointer",
                    textDecoration:"underline",
                    color:"blue",
                    display:this.state.categoryListIsVisible?"block":"none"
                },
                name:cat,
                onClick:this.categoryClicked
            },`${cat}`);
           
            return listItemEle;
        })));
        return (ele);
    }

  
}

export {App as default}