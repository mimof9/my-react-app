import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <button onClick={() => this.setState({ count: this.state.count+1})}>增加</button>
                计数：{this.state.count}
            </div>
        )
    }
}

export default Home
