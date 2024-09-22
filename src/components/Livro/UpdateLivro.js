import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateLivro() {
    const { id } = useParams();
    const [livro, setLivro] = useState({
        titulo: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLivro((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        axios.get("http://localhost:8081/livro/" + id)
            .then(res => {
                console.log(res);
                setLivro(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/livro/${id}`, livro);
            navigate("/livro");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h1>Formulário para Editar o Livro</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID:</label>
                    <input type="text" className="form-control" id="id"
                        placeholder="ID"
                        name="id" value={livro.id} disabled
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Titulo:</label>
                    <input type="text" className="form-control"
                        id="titulo" placeholder="Descrição do Livro"
                        name="titulo" value={livro.titulo}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">createdAt:</label>
                    <input type="text" className="form-control"
                        id="createdAt" placeholder="Data da criação"
                        name="createdAt"
                        value={livro.createdAt} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">updatedAt:</label>
                    <input type="text" className="form-control"
                        id="updatedAt" placeholder="Data de Alteração"
                        name="updatedAt" value={livro.updatedAt}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Editora:</label>
                    <input type="text" className="form-control"
                        id="fk_editora" placeholder="Data de Editora"
                        name="fk_editora" value={livro.fk_editora}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">updatedAt:</label>
                    <input type="text" className="form-control"
                        id="categoria" placeholder="Data de Categoria"
                        name="categoria" value={livro.fk_categoria}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">updatedAt:</label>
                    <input type="text" className="form-control"
                        id="autor" placeholder="Data de Autor"
                        name="autor" value={livro.fk_autor}
                        onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={handleClick}>Alterar</button>
            </form>
            <div className='container d-flex justify-content-center'>
                <Link to="/">Veja todos os livros</Link>
            </div>
        </div>
    );
}

export default UpdateLivro;
