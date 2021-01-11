import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

class App extends Component {
    // render() {
    //   const characters = [
    //       {name: 'Charlie', job: 'Janitor'},
    //       {name: 'Mac', job: 'Bouncer'},
    //       {name: 'Dee', job: 'Aspiring Actress'},
    //       {name: 'Dennis', job: 'Bartender'}
    //   ]
    state = {
      characters: [
        //These were deleted as information is now coming from the form
        // {name: 'Charlie', job: 'Janitor'},
        // {name: 'Mac', job: 'Bouncer'},
        // {name: 'Dee', job: 'Aspiring Actress'},
        // {name: 'Dennis', job: 'Bartender'}
      ]
    }

    removeCharacter = index => {
      const { characters } = this.state

      this.setState({
        characters: characters.filter((character, i) => {
          return i !== index
        })
      })
    }

    handleSubmit = character => {
      this.setState({ characters: [...this.state.characters, character]})
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

      // return (
      //   <div className="container">
      //     <Table characterData={characters} />
      //   </div>
      // )
  }

export default App