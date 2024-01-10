import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const apiUrl = 'http://ip172-18-0-17-cmfamdss9otg00859d4g-8080.direct.labs.play-with-docker.com/api/movies';

class AgregarPelicula extends Component {
  state = {
    movieData: [],
    modalInsertar: false,
    modalEliminar: false,
    formMovie: {
      movieId: '',
      title: '',
      genres: '',
      tipoModal: '',
    },
    search: '',
    filteredMovieData: [],
  };

  getMovieData = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ movieData: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  postMovie = async () => {
    delete this.state.formMovie.movieId;
    await axios
      .post(apiUrl, this.state.formMovie)
      .then(() => {
        this.modalInsertarMovie();
        this.getMovieData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  putMovie = () => {
    axios
      .put(`${apiUrl}/${this.state.formMovie.movieId}`, this.state.formMovie)
      .then(() => {
        this.modalInsertarMovie();
        this.getMovieData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  deleteMovie = () => {
    axios
      .delete(`${apiUrl}/${this.state.formMovie.movieId}`)
      .then(() => {
        this.setState({ modalEliminar: false });
        this.getMovieData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  modalInsertarMovie = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  selectMovie = (movie) => {
    this.setState({
      tipoModal: 'actualizar',
      formMovie: {
        movieId: movie.movieId,
        title: movie.title || '',
        genres: movie.genres || '',
      },
    });
  };

  handleChange = async (e) => {
    await this.setState({
      formMovie: {
        ...this.state.formMovie,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.filterData();
    });
  };

  filterData = () => {
    const { movieData, search } = this.state;

    const filteredMovieData = movieData.filter((movie) => {
      const title = movie.title || '';
      const genres = movie.genres || '';

      return title.toLowerCase().includes(search.toLowerCase()) || genres.toLowerCase().includes(search.toLowerCase());
    });

    this.setState({ filteredMovieData });
  };

  componentDidMount() {
    this.getMovieData();
  }

  getNextMovieId = () => {
    const { movieData } = this.state;
    const lastMovie = movieData[movieData.length - 1];
    const nextMovieId = lastMovie ? lastMovie.movieId + 1 : 1;
    return nextMovieId;
  };

  renderMovieList = () => {
    const { filteredMovieData } = this.state;

    return (
      <div>
        <h2>Listado de Películas</h2>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Movie ID</th>
              <th>Título</th>
              <th>Géneros</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovieData.map((movie) => (
              <tr key={movie.movieId}>
                <td>{movie.movieId}</td>
                <td>{movie.title}</td>
                <td>{movie.genres}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.selectMovie(movie);
                      this.modalInsertarMovie();
                    }}
                  >
                    Editar
                  </button>
                  {'   '}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.selectMovie(movie);
                      this.setState({ modalEliminar: true });
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    const { formMovie, filteredMovieData } = this.state;
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <button
          className="btn btn-info"
          onClick={() => {
            this.setState({ formMovie: null, tipoModal: 'insertar' });
            this.modalInsertarMovie();
          }}
        >
          Agregar Película
        </button>
        <br />
        <br />
        <input
          type="text"
          placeholder="Buscar por título o géneros"
          className="form-control"
          onChange={this.handleSearchChange}
          value={this.state.search}
        />
        <br />
        {this.renderMovieList()}

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertarMovie()}>
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="movieId">Movie ID</label>
              <input
                className="form-control"
                type="text"
                name="movieId"
                id="movieId"
                readOnly
                onChange={this.handleChange}
                value={formMovie && formMovie.movieId !== undefined ? formMovie.movieId : this.getNextMovieId()}
              />
              <br />
              <label htmlFor="title">Título</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                value={formMovie && formMovie.title !== undefined ? formMovie.title : ''}
              />
              <br />
              <label htmlFor="genres">Géneros</label>
              <input
                className="form-control"
                type="text"
                name="genres"
                id="genres"
                onChange={this.handleChange}
                value={formMovie && formMovie.genres !== undefined ? formMovie.genres : ''}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === 'insertar' ? (
              <button className="btn btn-success" onClick={() => this.postMovie()}>
                Insertar
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.putMovie()}>
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.modalInsertarMovie()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>¿Estás seguro de que deseas eliminar la película {formMovie && formMovie.title}?</ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.deleteMovie()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={() => this.setState({ modalEliminar: false })}>
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AgregarPelicula;
