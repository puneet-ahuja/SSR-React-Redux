import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers } from '../actions';


class UserList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }

    head() {
        return (
                <Helmet>
                    <title>`${this.props.users.length} Users Loaded` </title>
                    <meta property="og:title" content="Users App" />
                </Helmet>
        );
    }

    render(){
        return (
            <div>
                {this.head()}
                Here's a big list of users:
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

/***
 * Function to Load Data for SSR call.
 */
export function loadData(store) {
    /***
     * Some clearity on this is required.
     * How it returns a promise.
     */
    return store.dispatch(fetchUsers());
}

export default {
    component: connect(mapStateToProps, { fetchUsers })(UserList),
    loadData
};