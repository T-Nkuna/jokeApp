class Joke extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            display:this.props.elementIsVisible
        };
    }

    render(){
        let jokeEle = React.createElement("div",null,
        React.createElement("h1",{
            style:{
                textAlign:"center",
                disaplay:"block"
            }
        },this.props.joke.categories.length>0?this.props.joke.categories[0]:""),
        React.createElement(
            "img",{
                src:this.props.joke.icon_url
            }
           ),
        React.createElement(
         "div",null,
         this.props.joke.value
        )
        );
        return jokeEle;
    }
}

export {Joke as default};