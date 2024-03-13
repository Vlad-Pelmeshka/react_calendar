import React from 'react';

class AddUser extends React.Component {
    userAdd = {}
    constructor(props){
        super(props)
        // console.log(this.props.user)
        this.state = this.props.user ?? {
            firstName: "",
            lastName: "",
            bio: "",
            age: 18,
            isHappy: false
        }
    }
    render(){
        console.log(this.state);
        return(
            <form ref={(el) => this.myForm = el}>
                <input placeholder="Name" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})}/>
                <input placeholder="Surname" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}/>
                <textarea placeholder="Bio" value={this.state.bio} onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                <input placeholder="Age" value={this.state.age} type="number" onChange={(e) => this.setState({age: e.target.value})}/>
                <label htmlFor="isHappy">Are you happy?</label>
                <input type="checkbox" id="isHappy" onChange={(e) => this.setState({isHappy: e.target.checked})}/>
                <button type="button" onClick={() => {

                    this.userAdd = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        bio: this.state.bio,
                        age: this.state.age,
                        isHappy: this.state.isHappy
                    }
                    if(this.props.user){
                        this.userAdd.id = this.props.user.id
                    }
                    this.props.onAdd(this.userAdd)
                    this.myForm.reset()
                }}>{this.props.user ? "Save" : "Add"}</button>
            </form>
        )
    }

}

export default AddUser