import './styles.css'
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card'
function App() {

  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' })
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent]);
    //pegando os valores anteriores 
  }

  useEffect(() => {
    //açoes a executar, executado assim que os componentes são redenrizados 
    // fetch('https://api.github.com/users/AleexGarcia')
    //   .then(response => response.json())
    //   .then(data => {
    //     setUser({
    //       name: data.name,
    //       avatar: data.avatar_url
    //     })
    //   })
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/AleexGarcia')
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData();


  }, []); //quando o array de dependencias vazio é executado apenas uma vez

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder='Digite o nome...'
        onChange={e => setStudentName(e.target.value)}
      />
      <button
        onClick={handleAddStudent}
        type='button'
      >Adicionar</button>
      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))


      }
    </div>
  )
}

export default App
