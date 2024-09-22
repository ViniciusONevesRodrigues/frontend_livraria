import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListLivros = () => {
    const [livros, setLivros] = useState([]);

    // Listar Livros
    useEffect(() => {
        const fetchAllLivros = async () => {
            try {
                const res = await axios.get("http://localhost:8081/livro");
                setLivros(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllLivros();
    }, []);

    console.log(livros);

    // Deletar Livros
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/livro/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Listando Livros</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <p><Link to="/addLivro" className="btn btn-success">Adicionar novo Livro</Link></p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                                <th>Ações</th>
                                <th>Editora</th>
                                <th>Categoria</th>
                                <th>Autor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro) => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.id}</td>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.createdAt}</td>
                                        <td>{livro.updatedAt}</td>
                                        <td>{livro.fk_editora}</td>
                                        <td>{livro.fk_categoria}</td>
                                        <td>{livro.fk_autor}</td>
                                        <td>
                                            <Link to={`/readLivro/${livro.id}`} className="btn btn-success mx-2">Ler</Link>
                                            <Link to={`/updateLivro/${livro.id}`} className="btn btn-info mx-2">Editar</Link>
                                            <button onClick={() => handleDelete(livro.id)} className="btn btn-danger">Deletar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListLivros;
