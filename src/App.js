import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

import Input from './components/Input'
import Card from './components/Card'

class App extends Component {
    state = {
        datas: [],
        colors: {
            fire: '#FDDFDF',
            grass: '#DEFDE0',
            electric: '#FCF7DE',
            water: '#DEF3FD',
            ground: '#f4e7da',
            rock: '#d5d5d4',
            fairy: '#fceaff',
            poison: '#98d7a5',
            bug: '#f8d5a3',
            dragon: '#97b3e6',
            psychic: '#eaeda1',
            flying: '#F5F5F5',
            fighting: '#E6E0D4',
            normal: '#F5F5F5'
        },
        filterText: '',
        pokemonsCount: 150,
        isLoading: true
    }

    componentDidMount() {
        this.fetchPokemons()
    }

    fetchPokemons = async () => {
        var datas = []
        for (let i = 1; i <= this.state.pokemonsCount; i++) {
            await axios
                .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((res) => {
                    datas.push({
                        id: i,
                        name: res.data.name,
                        photo: res.data['sprites']['front_default'],
                        type: res.data['types'][0]['type']['name']
                    })
                })
        }
        this.setState({
            datas: [...datas],
            isLoading: false
        })
    }

    onSearchChange = (e) => {
        this.setState({ filterText: e.target.value })
    }

    render() {
        const { isLoading } = this.state

        const filteredPokemons = this.state.datas.filter((pokemon) => {
            return (
                pokemon.name
                    .toLowerCase()
                    .indexOf(this.state.filterText.toLowerCase()) !== -1
            )
        })

        return (
            <div>
                <Input onChange={this.onSearchChange} />
                {isLoading && <div className="cmd-loader">Loading</div>}
                <div className="poke-container">
                    {filteredPokemons.map((pokemon) => {
                        const type = Object.keys(this.state.colors).find(
                            (type) => pokemon.type.indexOf(type) > -1
                        )
                        const color = this.state.colors[type]

                        return (
                            <div key={pokemon.id}>
                                <Card
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.photo}
                                    type={pokemon.type}
                                    color={color}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default App
