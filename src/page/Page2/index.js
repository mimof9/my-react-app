import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    return {
        x: state.x,
        isFetching: state.isFetching ? '正在加载': '加载完成'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: () => {
            dispatch({ type: 'INCREMENT' })
        },
        decrement: () => {
            dispatch({ type: 'DECREMENT' })
        },
        incrementAsync: () => {
            dispatch({ type: 'INCREMENT_ASYNC' })
        },
        decrementAsync: () => {
            dispatch({ type: 'DECREMENT_ASYNC' })
        },
    }
}

class Page2 extends Component {
    render() {
        return (
            <div>
                <h2>Counter</h2>

                <p>
                    计数：<span>{this.props.x}</span>
                    <button onClick={() => {this.props.increment()}}>x+</button>
                    <button onClick={() => {this.props.decrement()}}>x-</button>
                    <button onClick={() => {this.props.incrementAsync()}}>异步x+</button>
                    <button onClick={() => {this.props.decrementAsync()}}>异步x-</button>
                    <span>{this.props.isFetching}</span>
                </p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page2)
