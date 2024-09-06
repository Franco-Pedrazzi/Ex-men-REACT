import { useState, useEffect } from 'react'
import axios from 'axios'
function UserList() {
    const [usuarios, SetUsuarios] = useState([])
    const [filtro, setFiltro] = useState("")
    const [NewUser, SetNewUser] = useState({
        name: "",
        email: ""
    })
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then(response => response)
            .then(data => SetUsuarios([...usuarios, data.data]))
    }, usuarios == [])
    const handleValue = (event) => {
        let nombre = event.target.name
        let value = event.target.value
        SetNewUser({
            ...NewUser, [nombre]: value
        })
    }
    function PutUser(usuario) {
        if (NewUser.name && NewUser.email) {
            let id = usuario.id
            axios.put("http://localhost:3000/posts/" + id, {
                name: NewUser.name,
                email: NewUser.email
            })
            axios.get("http://localhost:3000/posts")
                .then(response => response)
                .then(data => SetUsuarios([data.data]))
        }


    }

    function DeleteUser(usuario) {
        let id = usuario.id
        axios.delete("http://localhost:3000/posts/" + id, {
            name: NewUser.name,
            email: NewUser.email
        })
        axios.get("http://localhost:3000/posts")
            .then(response => response)
            .then(data => SetUsuarios([data.data]))

    }
    const submit = (event) => {
        axios.post("http://localhost:3000/posts", {
            name: NewUser.name,
            email: NewUser.email
        })
        axios.get("http://localhost:3000/posts")
            .then(response => response)
            .then(data => SetUsuarios([...usuarios, data.data]))
        SetUsuarios(usuarios)
    }
    const handleFiltro=(event)=>{
        setFiltro(event.target.value)
    }
    return (
        <div className='div'>
            <input type='text'  onChange={handleFiltro}></input>
            <form onSubmit={submit}>
                <h3>Name: <input type='text' name='name' onChange={handleValue} required minLength={1}></input></h3>
                <h3>Email: <input type='text' name='email' onChange={handleValue} minLength={1}></input></h3>
                <button type='submit'>add</button>
            </form>
            {usuarios[0] &&
                <table>
                    <h3>
                        <thead>Name
                            {usuarios[0].filter((usuario)=>usuario.name==filtro || filtro=="").map((usuario) => <h4>{usuario.name}</h4>)}
                        </thead>

                        <thead>email
                            {usuarios[0].map((usuario) => <h4>{usuario.email}</h4>)}
                        </thead>


                        <thead>
                            {usuarios[0].map((usuario) => <button onClick={() => PutUser(usuario)}>Editar</button>)}
                        </thead>

                        <thead>
                            {usuarios[0].map((usuario) => <button onClick={() => DeleteUser(usuario)}>eliminar</button>)}
                        </thead>
                    </h3>
                </table>}
        </div>
    )
}

export default UserList
