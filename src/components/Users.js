import React from 'react';
import User from './User';

class Users extends React.Component {

    render(){
        if( this.props.users.length > 0)
            return(
            <div className="userlist">
                {this.props.users.map((user) => (
                    <User key={user.id} user={user} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>
                ))}
            </div>
            )
        else
            return(<div className='userlist'>
                <h3 className='user'>User list empty! </h3>
            </div>)
    }

}


export default Users