import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Agregar el ícono de estrella
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = 'http://ip172-18-0-31-cltnc0ufml8g00b3jqhg-8080.direct.labs.play-with-docker.com/api/users';

class UsersPage extends Component {
  state = {
    data: [],
    modalInsertar: false,
    form: {
      id: '',
      name: '',
      email: '',
      rating: 0, // Agregado el campo rating
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
      this.filterData();
    });
  };

  filterData = () => {
    const { data, search } = this.state;

    const filteredData = data.filter((user) => {
      const name = user.name || '';
      const email = user.email || '';

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())
      );
    });

    console.log('Filtered Data:', filteredData);
    this.setState({ filteredData });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
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
            this.setState({ form: null });
            this.modalInsertar();
          }}
        >
          Agregar Usuario
        </button>
        <br />
        <br />
        <input
          type="text"
          placeholder="Buscar por nombre o email"
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
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {Array.from({ length: user.rating }, (_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} color="gold" />
                  ))}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="4">No se encontraron resultados.</td>
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
              <label htmlFor="rating">Rating</label>
              <input
                className="form-control"
                type="number"
                name="rating"
                id="rating"
                min="0"
                max="5"
                onChange={this.handleChange}
                value={form ? form.rating : 0}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-success" onClick={() => this.peticionPost()}>
              Insertar
            </button>
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UsersPage;
