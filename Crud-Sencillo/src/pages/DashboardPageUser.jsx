import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, FormGroup, Label, Input } from 'reactstrap'; // Importa los componentes necesarios

const moviesApiUrl = 'http://ip172-18-0-120-cm03sgqo7r5g00e6gefg-8080.direct.labs.play-with-docker.com/api/movies';
const ratingsApiUrl = 'http://ip172-18-0-120-cm03sgqo7r5g00e6gefg-8080.direct.labs.play-with-docker.com/api/ratings';

class DashboardPageUser extends Component {
  state = {
    movies: [],
    userRatings: [],
    showRatingModal: false,
    selectedMovieId: null,
    ratingValue: '',
  };

  componentDidMount() {
    this.fetchMovies();
    this.fetchUserRatings(); // Fetch user's ratings after fetching movies
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(moviesApiUrl);
      this.setState({ movies: response.data });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  fetchUserRatings = async () => {
    const userId = Cookies.get('userID');

    try {
      const response = await axios.get(ratingsApiUrl);
      const userRatings = response.data.filter((rating) => rating.userId === parseInt(userId, 10));
      this.setState({ userRatings });
    } catch (error) {
      console.error('Error fetching user ratings:', error);
    }
  };

  handleShowRatingModal = (movieId) => {
    this.setState({ showRatingModal: true, selectedMovieId: movieId });
  };

  handleCloseRatingModal = () => {
    this.setState({ showRatingModal: false, selectedMovieId: null, ratingValue: '' });
    window.location.reload(); 
  };

  handleRatingChange = (event) => {
    this.setState({ ratingValue: event.target.value });
  };

  handleRateMovie = async () => {
    const { selectedMovieId, ratingValue } = this.state;
    const userId = Cookies.get('userID');

    try {
      await axios.post(ratingsApiUrl, {
        userId: parseInt(userId, 10),
        movieId: selectedMovieId,
        ratingValue: parseInt(ratingValue, 10),
        timestamp: new Date().toISOString(),
        id: selectedMovieId,
      });
      
      this.fetchUserRatings();
      this.handleCloseRatingModal();
      
    } catch (error) {
      console.error('Error al calificar la película:', error);
    }
    window.location.reload(); 
  };


  render() {
    const { movies, userRatings, showRatingModal, selectedMovieId, ratingValue } = this.state;
    const userId = Cookies.get('userID');

    const ratedMovies = movies.filter((movie) => userRatings.some((rating) => rating.movieId === movie.movieId));
    const userRatingsMap = userRatings.reduce((map, rating) => {
      map[rating.movieId] = rating.ratingValue;
      return map;
    }, {});

    const unratedMovies = movies.filter((movie) => !userRatings.some((rating) => rating.movieId === movie.movieId));

    return (
      <div>
        <h2>Películas Calificadas por el Usuario ID: {userId}</h2>
        <table className="table table-bordered table-hover">
          {/* Tabla de películas calificadas por el usuario */}
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Género</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {ratedMovies.map((movie) => (
              <tr key={movie.movieId}>
                <td>{movie.movieId}</td>
                <td>{movie.title}</td>
                <td>{movie.genres}</td>
                <td>{userRatingsMap[movie.movieId]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Películas </h2>
        <table className="table table-bordered table-hover">
          {/* Tabla de películas no calificadas por el usuario */}
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Género</th>
              <th>Acciones</th>
              {/* Agregar más columnas si es necesario */}
            </tr>
          </thead>
          <tbody>
            {unratedMovies.map((movie) => (
              <tr key={movie.movieId}>
                <td>{movie.movieId}</td>
                <td>{movie.title}</td>
                <td>{movie.genres}</td>
                <td>
                  <button type="button" className="btn btn-outline-primary" onClick={() => this.handleShowRatingModal(movie.movieId)}>Calificar</button>
                </td>
                {/* Agregar más columnas si es necesario */}
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={showRatingModal} toggle={this.handleCloseRatingModal}>
          <ModalHeader toggle={this.handleCloseRatingModal}>Calificar Película</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="ratingValue">Calificación:</Label>
                <Input type="number" id="ratingValue" value={ratingValue} onChange={this.handleRatingChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleCloseRatingModal}>
              Cerrar
            </Button>
            <Button color="primary" onClick={this.handleRateMovie}>
              Calificar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DashboardPageUser;
