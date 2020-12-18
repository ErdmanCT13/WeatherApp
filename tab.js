import React from 'react'


class Tab extends React.Component{
    state = {
        selected: false
    }
    render(){
        return (
            <div className="tab">
                {this.props.name}
            </div>
        )
    }
}

export default Tab