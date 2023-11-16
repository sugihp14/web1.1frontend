import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalEdit from "../component/ModaEdit";
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
const Register = () => {
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [nomortelepon, setnomortelepon] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState("");
  const [dataedit, setDataEdit] = useState([]);

  const [errorMsg, setErrorMsg] = useState([]);
  const [user, setuser] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    Register();
  }, [msg]);
  const Register = async () => {
    const dataU = await axios.get("http://localhost:3000/user");
    setuser(dataU.data.data);
  };

  const handleClose = () => {
    setShow(false);
    setMsg("");
  };

  const handleShow = (ids) => {
    showeditdata(ids);
    setShow(true);
  };
  const showeditdata = async (ids) => {
    const dataU = await axios.post("http://localhost:3000/user/check", {
      id: ids,
    });
    setDataEdit(dataU.data.hasil);
  };
  const handleNamaChange = (nama) => {
    setnama(nama);
  };

  const handleAlamatChange = (alamat) => {
    setalamat(alamat);
  };
  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  const handleNotelChange = (notel) => {
    if (isNumber(notel)) {
      setnomortelepon(notel);
    } else {
      alert("no telepon harus number");
    }
  };
  const handleJK = (jk) => {
    setjenisKelamin(jk);
  };
  const handleFormAdd = async (e) => {
    e.preventDefault();
    add().then((res) => {
      alert(res.data.msg);
      setMsg("berhasil");
    });
  };

  const handleDelete = async (id) => {
    console.log(id);
    deleteUser(id);
  };

  const deleteUser = async (ids) => {
    const dataU = await axios.post("http://localhost:3000/user/delete", {
      id: ids,
    });
    setMsg(dataU.data.msg);
    alert(dataU.data.msg);
    return dataU;
  };

  const add = async () => {
    const dataU = await axios.post("http://localhost:3000/user", {
      nama: nama,
      alamat: alamat,
      nomor_telepon: nomortelepon,
      jenis_kelamin: jenisKelamin,
    });
    return dataU;
  };
  return (
    <div>
      <Card className="card-body w-100 mt-4">
        <Col>
          <Col>
            <Row>
              <Col>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextText"
                  >
                    <Form.Label column sm="2">
                      nama
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        placeholder="text"
                        value={nama}
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
                        value={alamat}
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
                        defaultValue={0}
                        type="text"
                        value={nomortelepon}
                        onChange={(e) => handleNotelChange(e.target.value)}
                        placeholder="085773112508"
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
                        value={jenisKelamin}
                        onChange={(e) => handleJK(e.target.value)}
                      >
                        <option>select Jenis Kelamin</option>
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                      </Form.Select>{" "}
                    </Col>
                  </Form.Group>
                  <Button
                    onClick={(e) => {
                      handleFormAdd(e);
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
            <Table
              striped
              bordered
              hover
              style={{ marginTop: "10px" }}
              responsive="sm"
            >
              <thead className="text-center">
                <tr>
                  <th>id</th>
                  <th> Name</th>
                  <th>Alamat</th>
                  <th>No telepon</th>
                  <th>Jenis Kelamin</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }} className="text-center">
                {user?.map((ca, index) => (
                  <tr key={ca.id}>
                    <td>{ca.id}</td>
                    <td>{ca.nama}</td>
                    <td>{ca.alamat}</td>
                    <td>{ca.nomor_telepon}</td>
                    <td>{ca.jenis_kelamin}</td>
                    <td style={{ width: "110px" }} className="px-3">
                      <Row xs={1} md={2} lg={3}>
                        <Button
                          variant=" btn rounded-circle btn-warning"
                          className="btn-sm"
                          data-toggle="tooltip"
                          title="Edit"
                          onClick={() => handleShow(ca.id)}
                        >
                          <FaPencilAlt />
                        </Button>
                        <Col className="px-1 ">
                          <Button
                            variant=" btn rounded-circle btn-danger"
                            className="btn-sm"
                            data-toggle="tooltip"
                            title="delete"
                            onClick={() => handleDelete(ca.id)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Col>
      </Card>

      <ModalEdit
        data={dataedit}
        show={show}
        msg={msg}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Register;
