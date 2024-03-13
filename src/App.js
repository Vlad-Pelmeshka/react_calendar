import React from 'react';
import Header from './components/Header';
import Users from './components/Users';
import AddUser from './components/AddUser';

class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users: [
                {
                    id: 1,
                    firstName: 'Alan',
                    lastName: 'Neozi',
                    bio: "Test BIO",
                    age: 30,
                    isHappy: true
                },
                {
                    id: 2,
                    firstName: 'Bob',
                    lastName: 'Neozi',
                    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex corporis, pariatur libero nobis quos animi modi quis? Commodi iste mollitia, dignissimos culpa molestias quod labore aliquid repellendus cum dolores aut.",
                    age: 32,
                    isHappy: false
                },
            ]
        }

        this.addUser    = this.addUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    render(){
        return(
            <div>
                <Header title="User List"/>
                <main className="container">
                    <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser}/>
                </main>
                <aside>
                    <AddUser onAdd={this.addUser}/> 
                </aside>
            </div>

        )
    }

    deleteUser(id){
        this.setState({
            users: this.state.users.filter((el) => el.id !== id)
        })
    }

    editUser(user){
        let allUsers = this.state.users
        allUsers[user.id - 1] = user
        this.setState({ users: []}, () => {
            this.setState({ users: [...allUsers] })
        })
    }

    addUser(user){
        const id = this.state.users.length + 1

        this.setState({ users: [...this.state.users, {id, ...user}]})
    }

}

export default App