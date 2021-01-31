import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'

class App extends Component {
    state = {
      characters: [
      ]
    }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const characters = res.data.users_list;
        this.setState({ characters });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  handleSubmit = character => {
    this.makePostCall(character).then(callResult => {
      //On success, callResult has the character that was posted, including ID.
      //We use the returned character data to update the state with the new character
      if (callResult) {
        this.setState({ characters: [...this.state.characters, callResult] });
        // --- DEMO Q --- how does the above syntax work? I know it's just adding the new character to the end of the list
      }
    });
  }

  removeCharacter = index => {
    const { characters } = this.state
    //What is the above syntax actually doing?
    //Is it setting the variable character to the dictionary contained in state? I understand we need to have some representation of the character dict to pull from
    this.makeDeleteCall(characters[index]).then(callResult => { //Make DELETE call with specific character at [index]
      if (callResult === true) { //Proceed with removing character if delete is sucessful
        //Do the given remove from Part II
        this.setState({
          characters: characters.filter((character, i) => {
            // -- DEMO Q -- What is the first argument character doing?
            return i !== index;
            }),
          })
        }
      });
    }

  makePostCall(character){
    return axios.post('http://localhost:5000/users', character)
      .then(res => {
        if (res.status === 201) {
          return res.data;
        }
        return false;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

  makeDeleteCall(character){
    return axios.delete('http://localhost:5000/users/' + character._id) //Extract ID from character passed
      .then(res => {
        if (res.status === 204) { //If code recieved is a 204 (good delete), return ture
          return true;
        }
        return false; //Else return false
      })
      .catch(function (error) { // -- DEMO Q -- What is this .catch actually doing? Log to console?
        console.log(error);
        return false;
      }); 
  }
      
  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
      )
    }
}

export default App