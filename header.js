import React from 'react'
import './header.css'



class Header extends React.Component {
    state= {

    }
    render() {
        console.log(<div></div>)
        console.log(this.props.appState)
        return (
            <div className={"header"}>
                <div className="logo">
                    <div></div>
                </div>
                {
                    (function () {
                        if (this.props.appState.loading) {
                            console.log("still loading")
                            return (<div className="loader">
                            
                            </div>)
                        }
                        else {
                            console.log("done loading")
                            return (
                                <div className="header__metadata">
                                    <div className="header__metadata__item header__metadata__item--coordinates">
                                        <div></div>
                                        {`${this.props.appState.latitude}, ${this.props.appState.longitude}`}
                                    </div>
                                    <div className="header__metadata__item header__metadata__item--station">
                                        <div></div>
                                        {`${this.props.appState.stationCallSign}, ${this.props.appState.stationLocation}`}
                                    </div>
                                    <div className={"header__metadata__item header__metadata__item--time"}>
                                        <div></div>
                                        {(new Date).toLocaleString()}
                                    </div>
                                    <div className={"header__metadata__item header__metadata__item--location"}>
                                        <div></div>
                                        {`${this.props.appState.city}, ${this.props.appState.state}`}
                                    </div>
                                </div>)
                        }
                    }).bind(this)()
                }
                
                <div className="header__tab-row">
                    <div className={"header__tab"}>
                        <div></div>
                        {"Hourly"}
                    </div>
                    <div className={"header__tab"}>
                        <div></div>
                        {"Daily"}
                    </div>
                </div>
            </div>
        )
    }
    componentDidUpdate(){
        console.log("mounting the header")
        document.querySelectorAll(".header__metadata__item").forEach(function(item, index){ // this isn't pretty. but it is pretty than setting up references
            setTimeout(function(){
                item.style.opacity = "1"
            }, index * 200)
        })
    }
    componentDidMount(){

    }
}


export { Header }