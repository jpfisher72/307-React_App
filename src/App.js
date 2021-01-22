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

    removeCharacter = index => {
      const { characters } = this.state
      this.makeDeleteCall(characters[index]).then(response => {
        if (response === true) {
          this.setState({
            characters: characters.filter((character, i) => {
              return i !== index;
              }),
            })
          }
        });
      }

    handleSubmit = character => {
      this.makePostCall(character).then(callResult => {
        //QUESTION: why does if(callResult) work to update state but if(callResult === true) doesn't?
        if (callResult) {
          this.setState({ characters: [...this.state.characters, callResult] });
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
      return axios.delete('http://localhost:5000/users/' + character.id)
        .then(res => {
          if (res.status === 204) {
            return true;
          }
          return false;
        })
        .catch(function (error) {
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