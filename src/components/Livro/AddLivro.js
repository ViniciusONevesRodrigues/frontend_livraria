import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddLivro = () => {
    const [livro, setLivro] = useState({
        titulo: "",
        fk_editora: "",
        fk_categoria: "",
        fk_autor: ""
    });
    
    const [editoras, setEditoras] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [autores, setAutores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const editorasResponse = await axios.get("http://localhost:8081/editora");
                const categoriasResponse = await axios.get("http://localhost:8081/categoria");
                const autoresResponse = await axios.get("http://localhost:8081/autor");
                
                setEditoras(editorasResponse.data);
                setCategorias(categoriasResponse.data);
                setAutores(autoresResponse.data);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchData();
    }, []);

    const handleChange = (e) => {
        setLivro((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/livro", livro);
            navigate("/livro");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Adicionando Livro</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Livro</h3>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Título:</label>
                            <input type="text" className="form-control" id="titulo"
                                placeholder="Digite o Título do Livro" name="titulo"
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Editora:</label>
                            <select className="form-control" name="fk_editora" onChange={handleChange}>
                                <option value="">Selecione a Editora</option>
                                {editoras.map(editora => (
                                    <option key={editora.id} value={editora.id}>
                                        {editora.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Categoria:</label>
                            <select className="form-control" name="fk_categoria" onChange={handleChange}>
                                <option value="">Selecione a Categoria</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.descricao} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Autor:</label>
                            <select className="form-control" name="fk_autor" onChange={handleChange}>
                                <option value="">Selecione o Autor</option>
                                {autores.map(autor => (
                                    <option key={autor.id} value={autor.id}>
                                        {autor.nome} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary"
                            onClick={handleClick}>Cadastrar</button>
                        <br />
                        <Link to="/livro">Listar Livros</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddLivro;
