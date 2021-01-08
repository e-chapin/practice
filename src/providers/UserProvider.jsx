import React, { Component, createContext } from 'react'
import { auth } from '../services/firebase'

import { Collection, Document } from 'firestorter'


export const UserContext = createContext({ user: null})

// const users = new Collection('users');

class UserProvider extends Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        auth.onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth })
            const usr = new Document('users/' + userAuth.uid)
            usr.set({
                uid: userAuth.uid,
                email: userAuth.email,
                fullname: userAuth.displayName,
            }, {merge: true});
            console.log(usr)
        })
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider