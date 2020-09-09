import React from 'react'

class UserAnalytics extends React.Component {

    state = {
        analytics:null
    }

    componentDidMount () {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/users/${this.props.user.id}/analytics`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                     }
            })
              .then(response => response.json())
              .then(analyticData => {
                this.setState({analytics:analyticData}, () => console.log(this.state.analytics))
            })
    }

    renderAnalytics = () => {
        return( 
            this.state.analytics.map((analytic,index) => {
                return (
                    <div key={index}>
                        <strong>{Object.keys(analytic)[0]}: </strong>
                        {/* {Object.values(analytic)[0]}<br/> */}
                    </div>
                )
            })
        )
    }

    render () {
        return (
        <>
            {this.state.analytics !== null ? this.renderAnalytics() : ""}
        </>
        )
    }
}

export default UserAnalytics