import React from 'react';
import moviesData from '../data/movies.json'
import MovieCard from '../components/MovieCard'

const API_KEY = '1b4b4be565470a1bc52b46649f9b97d0';

class Home extends React.Component {
  state = {
    ...moviesData
  }

  deleteMovie = (movieId) => {
    this.setState((state) => {
      const movies = state.movies.filter((movie) => movie.id !== movieId)
      return  {
        movies
      }
    })
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.setState(() => {
        return {movies: data.results};
      });
    });
  }

    render() {
        const { movies } = this.state
        return <div>
        <h1 className='main-title'>Movie App</h1>
        <div className='content'>
          {movies.map((movie) => <MovieCard deleteMovie={this.deleteMovie} key={movie.id} {...movie} />)}
        </div>
      </div>
    }
}

export default Home