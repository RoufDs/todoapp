import React, { useState, useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import axios from 'axios';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get("/api/todos/")
      .then((res) => {
        setTodos(res.data)
      }).catch (() => {
        alert("Something went wrong")
      })
  }, [])

  return (
    <div>
      <Navbar bg="light" style={{
        marginBottom: '20px',
      }}>
        <Container>
          <Navbar.Brand href='#'>
            Todo App
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <TodoForm />
        <TodoList todos={todos} setTodos={setTodos}/>
      </Container>
    </div>
  );
}

export default App;
