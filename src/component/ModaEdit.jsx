import { useState } from "react";

import {
  Table,
  Container,
  Col,
  Button,
  Row,
  Modal,
  Spinner,
  Alert,
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";
function ModalEdit(props) {
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [nomortelepon, setnomortelepon] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState("");

  const [errorMsg, setErrorMsg] = useState([]);
  const [user, setuser] = useState([]);

  const handleNamaChange = (nama) => {
    setnama(nama);
  };

  const handleAlamatChange = (alamat) => {
    setalamat(alamat);
  };
  const handleNotelChange = (notel) => {
    setnomortelepon(notel);
  };
  const handleJK = (jk) => {
    setjenisKelamin(jk);
  };
  const handleFormAdd = async (e) => {
    e.preventDefault();
    edit(props.data?.id, nama, alamat, nomortelepon, jenisKelamin).then(
      (res) => {
        alert("Berhasil");
        props.handleClose();
      }
    );
    props.handleClose();
  };

  const edit = async (id, nama, alamat, nomor_telepon, jenisKelamin) => {
    const dataU = await axios.put("http://localhost:3000/user", {
      id: id,
      nama: nama,
      alamat: alamat,
      nomor_telepon: nomortelepon,
      jenis_kelamin: jenisKelamin,
    });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextText">
              <Form.Label column sm="2">
                nama
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="text"
                  value={props.data.nama}
                  onChange={(e) => handleNamaChange(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Alamat
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="text"
                  value={props.data?.alamat}
                  onChange={(e) => handleAlamatChange(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextNoTelepon"
            >
              <Form.Label column sm="2">
                No Telepon
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={props.data.nomor_telepon}
                  onChange={(e) => handleNotelChange(e.target.value)}
                  placeholder="text"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextNoTelepon"
            >
              <Form.Label column sm="2">
                Jenis Kelamin
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="Default select example"
                  value={props.data.jenis_kelamin}
                  onChange={(e) => handleJK(e.target.value)}
                >
                  <option>select Jenis Kelamin</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </Form.Select>{" "}
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;
