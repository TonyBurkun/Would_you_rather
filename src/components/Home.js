import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
    render () {
        return (
            <div>
                Home Component
            </div>
        )
    }
}

function mapStateToProps(store) {
    console.log(store);
    return {
        questions: store.questions
    }
}

export default connect(mapStateToProps)(Home)