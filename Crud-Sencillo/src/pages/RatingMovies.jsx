import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://ip172-18-0-14-clvg7qks9otg00adkgog-8080.direct.labs.play-with-docker.com/api/movies';

class RatingMovies extends Component {
  state = {
    moviesData: [],
  };

  componentDidMount() {
    this.obtenerDatosDePeliculas();
  }

  obtenerDatosDePeliculas = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ moviesData: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { moviesData } = this.state;

    return (
      <div className="App">
        <h2>Ratings de Películas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Película</th>
              <th>Ratings</th>
            </tr>
          </thead>
          <tbody>
            {moviesData.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.pelicula}</td>
                <td>
                  {/* Puedes mostrar los ratings directamente aquí o agregar un botón para verlos */}
                  {movie.ratings.map((rating, index) => (
                    <span key={index}>{rating} </span>
                  ))}
                </td>
              </tr>
            ))}
            {moviesData.length === 0 && (
              <tr>
                <td colSpan="2">No hay datos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RatingMovies;
