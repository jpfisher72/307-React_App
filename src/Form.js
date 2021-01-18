import React, { Component } from 'react';

class Form extends Component {
    initialState = {
        name: " ",
        job: " ",
    }

    state = this.initialState;

    handleChange = event => { //When called this changes the name/job strings above
        const { name, value } = event.target

        this.setState({
            //why is there no job added here? Why was there a comma in the provided code?
            [name]: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state) //Calls handleSubmit in App
        this.setState(this.initialState)
    }

    render() {
        const { name, job } = this.state;

        return (
            <form>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange} /> //anytime a change is made, call this .handleChange
                <label htmlFor="job">Job</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={job}
                    onChange={this.handleChange} />
                <input
                    type = "button"
                    value = "Submit"
                    onClick={this.submitForm} /> //Calls submit form
            </form>
        )
    }
}

export default Form