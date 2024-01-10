import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const apiUrl = 'http://ip172-18-0-17-cmfamdss9otg00859d4g-8080.direct.labs.play-with-docker.com/api/users';

class CrudExample extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      gender: '',
      age: '',
      occupation: '',
      zipcode: '',
      tipoModal: '',
    },
    search: '',
    filteredData: [],
    isZipcodeEmpty: false, // Flag to track if zipcode is empty
  };

  peticionGet = () => {
    axios
      .get(apiUrl)
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
      .post(apiUrl, this.state.form)
      .then(() => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    axios
      .put(`${apiUrl}/${this.state.form.id}`, this.state.form)
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
      .delete(`${apiUrl}/${this.state.form.id}`)
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

  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: usuario.id,
        gender: usuario.gender || '',
        age: usuario.age || '',
        occupation: usuario.occupation || '',
        zipcode: usuario.zipcode || '',
      },
      isZipcodeEmpty: false, // Reset the flag
    });
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });

    // Check if the zipcode is empty when changed
    if (e.target.name === 'zipcode') {
      this.setState({ isZipcodeEmpty: e.target.value === '' });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.filterData();
    });
  };

  filterData = () => {
    const { data, search } = this.state;

    const filteredData = data.filter((usuario) => {
      const gender = usuario.gender || '';
      const age = usuario.age || '';
      const occupation = usuario.occupation || '';
      const zipcode = usuario.zipcode || '';

      return (
        gender.toLowerCase().includes(search.toLowerCase()) ||
        age.toString().includes(search) ||
        occupation.toLowerCase().includes(search.toLowerCase()) ||
        zipcode.toString().includes(search)
      );
    });

    this.setState({ filteredData });
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form, filteredData, isZipcodeEmpty } = this.state;
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <Link to="/agregar-pelicula" className="btn btn-success link-blue">
          Agregar Película
        </Link>

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
          placeholder="Buscar por género, edad, ocupación o código postal"
          className="form-control"
          onChange={this.handleSearchChange}
          value={this.state.search}
        />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Ocupación</th>
              <th>Código Postal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.gender}</td>
                <td>{usuario.age}</td>
                <td>{usuario.occupation}</td>
                <td>
                  {isZipcodeEmpty ? (
                    <span className="text-danger">NULL</span>
                  ) : (
                    usuario.zipcode
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.seleccionarUsuario(usuario);
                      this.modalInsertar();
                    }}
                  >
                    Editar
                  </button>
                  {'   '}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.seleccionarUsuario(usuario);
                      this.setState({ modalEliminar: true });
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="6">No se encontraron resultados.</td>
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
                value={form && form.id !== undefined ? form.id : this.state.data.length + 1}
              />
              <br />
              <label htmlFor="gender">Género</label>
              <input
                className="form-control"
                type="text"
                name="gender"
                id="gender"
                onChange={this.handleChange}
                value={form && form.gender !== undefined ? form.gender : ''}
              />
              <br />
              <label htmlFor="age">Edad</label>
              <input
                className="form-control"
                type="text"
                name="age"
                id="age"
                onChange={this.handleChange}
                value={form && form.age !== undefined ? form.age : ''}
              />
              <br />
              <label htmlFor="occupation">Ocupación</label>
              <input
                className="form-control"
                type="text"
                name="occupation"
                id="occupation"
                onChange={this.handleChange}
                value={form && form.occupation !== undefined ? form.occupation : ''}
              />
              <br />
              <label htmlFor="zipcode">Código Postal</label>
              <input
                className={`form-control ${isZipcodeEmpty ? 'is-invalid' : ''}`}
                type="text"
                name="zipcode"
                id="zipcode"
                onChange={this.handleChange}
                value={form && form.zipcode !== undefined ? form.zipcode : ''}
              />
              {isZipcodeEmpty && (
                <div className="invalid-feedback">El campo "Código Postal" no puede estar vacío.</div>
              )}
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
          <ModalBody>¿Estás seguro de que deseas eliminar al usuario {form && form.gender}?</ModalBody>
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

export default CrudExample;
