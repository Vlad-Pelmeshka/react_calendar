import React from 'react';
import {IoCloseCircleSharp, IoHammerSharp} from 'react-icons/io5';
import AddUser from './AddUser';

class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editForm: false
        }
    }
    user = this.props.user
    render(){
        return(
            <div className='user'>
                <IoCloseCircleSharp className="delete-icon" onClick={() => { this.props.onDelete(this.user.id) }}/>
                <IoHammerSharp className="edit-icon" onClick={() => {
                    this.setState({
                        editForm: !this.state.editForm
                    })
                }} />
                <h3>{this.user.firstName} {this.user.lastName}</h3>
                <p>{this.user.bio}</p>
                <b>{this.user.isHappy ? 'I`m happy! ;)' : 'I`m sad :('}</b>

                {this.state.editForm && <AddUser user={this.user} onAdd={this.props.onEdit} />}
            </div>
        )
    }

}

export default User