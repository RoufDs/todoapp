import axios from 'axios'
import React from 'react'
import { ListGroup, Button, Modal, FormControl } from 'react-bootstrap'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from 'react-icons/md'

function TodoList({ todos = [], setTodos }) {

    const handleUpdate = async (id, value) => {
        return axios.patch(`/api/todos/${id}/`, value)
            .then((res) => {
                const { data } = res;
                const newTodos = todos.map(t => {
                    if(t.id === id) {
                        return data
                    }
                    return t
                })
                setTodos(newTodos)
            }).catch(() => {
                alert("Something went wrong")
            })
    }

    const renderListGroupItem = (t) => {
        return <ListGroup.Item key={t.id}
        className="d=flex justify-content-betwween align-items-center">
            <div className="d-flex justify-content-center">
                <span style={{
                    marginRight: '12px',
                    cursor: 'pointer',
                }} onClick={()=> {
                    handleUpdate(t.id, {
                        completed: !t.completed
                    })
                }}>
                    {t.completed === true ? <MdCheckBox />
                    : <MdCheckBoxOutlineBlank />}
                </span>
                <span>
                    {t.name}
                </span>
            </div>
            <div>
                <MdEdit style={{
                    cursor: 'pointer',
                    marginRight: '12px',
                }} />
                <MdDelete style={{
                    cursor: 'pointer',
                }} />
            </div>
        </ListGroup.Item>
    }

    return (
        <div>
            <ListGroup>
                {todos.map(renderListGroupItem)}            
            </ListGroup>
            <Modal show={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl value={""} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'
                        onClick={null}
                    >
                        Close
                    </Button>
                    <Button variant='primary'
                        onClick={null}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TodoList