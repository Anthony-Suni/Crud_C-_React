import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = 'http://ip172-18-0-31-cltnc0ufml8g00b3jqhg-8080.direct.labs.play-with-docker.com/api/users';

class DashboardPage extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      name: '',
      genre: '',
      email: '',
      movie: '',
      rating: '',
      tipoModal: '',
    },
    search: '',
    filteredData: [],
  };

  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.id;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    axios
      .put(`${url}/${this.state.form.id}`, this.state.form)
      .then(() => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    axios
      .delete(`${url}/${this.state.form.id}`)
      .then(() => {
        this.setState({ modalEliminar: false });
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarEmpresa = (empresa) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: empresa.id,
        name: empresa.name,
        genre: empresa.genre,
        email: empresa.email,
        movie: empresa.movie,
        rating: empresa.rating,
      },
    });
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      // Update filteredData when search input changes
      this.filterData();
    });
  };

  filterData = () => {
    const { data, search } = this.state;
    console.log('Data before filter:', data);

    const filteredData = data.filter((empresa) => {
      const name = empresa.name || '';
      const email = empresa.email || '';
      const genre = empresa.genre || '';
      const movie = empresa.movie || '';
      const rating = empresa.rating || '';

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase()) ||
        genre.toLowerCase().includes(search.toLowerCase()) ||
        movie.toLowerCase().includes(search.toLowerCase()) ||
        rating.toLowerCase().includes(search.toLowerCase())
      );
    });

    console.log('Filtered Data:', filteredData);
    this.setState({ filteredData });
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form, filteredData } = this.state;
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: 'insertar' });
            this.modalInsertar();
          }}
        >
          Agregar Usuario
        </button>
        <br />
        <br />
        <input
          type="text"
          placeholder="Buscar por nombre, email, género, película o rating"
          className="form-control"
          onChange={this.handleSearchChange}
          value={this.state.search}
        />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Email</th>
              <th>Película</th>
              <th>Rating</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.name}</td>
                <td>{empresa.genre}</td>
                <td>{empresa.email}</td>
                <td>{empresa.movie}</td>
                <td>{empresa.rating}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.seleccionarEmpresa(empresa);
                      this.modalInsertar();
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {'   '}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.seleccionarEmpresa(empresa);
                      this.setState({ modalEliminar: true });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : this.state.data.length + 1}
              />
              <br />
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form ? form.name : ''}
              />
              <br />
              <label htmlFor="genre">Género</label>
              <input
                className="form-control"
                type="text"
                name="genre"
                id="genre"
                onChange={this.handleChange}
                value={form ? form.genre : ''}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={form ? form.email : ''}
              />
              <br />
              <label htmlFor="movie">Película</label>
              <input
                className="form-control"
                type="text"
                name="movie"
                id="movie"
                onChange={this.handleChange}
                value={form ? form.movie : ''}
              />
              <br />
              <label htmlFor="rating">Rating</label>
              <input
                className="form-control"
                type="text"
                name="rating"
                id="rating"
                onChange={this.handleChange}
                value={form ? form.rating : ''}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === 'insertar' ? (
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>Estás seguro que deseas eliminar a la empresa {form && form.name}</ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>
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

export default DashboardPage;
