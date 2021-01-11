import React, { Component } from 'react'
import Table from './Table'

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
        {name: 'Charlie', job: 'Janitor'},
        {name: 'Mac', job: 'Bouncer'},
        {name: 'Dee', job: 'Aspiring Actress'},
        {name: 'Dennis', job: 'Bartender'}
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
      
    render() {
      const { characters } = this.state;
      
      return (
        <div className="container">
          <Table characterData={characters} removeCharacter={this.removeCharacter} />
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