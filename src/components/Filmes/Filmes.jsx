import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Filmes.scss';
import { Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
import { apiKey } from "../service/api";


const Filmes = () => {
    const [filmes, setFilmes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        setLoading(true);

        // Fazer uma chamada à API do TMDb para obter os filmes da página atual
        axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: apiKey,
                language: 'pt-BR',
                page: currentPage,
            }
        })
            .then(response => {
                const { results, total_pages } = response.data;
                setFilmes([...filmes, ...results]);
                setTotalPages(total_pages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro na requisição à API do TMDb: ' + error);
                setLoading(false);
            });
    }, [currentPage]);

    const loadMoreFilmes = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <section id="filmes">
            <MDBContainer>
                <h2>Filmes</h2>
                <MDBRow>
                    {filmes.map((filme, index) => (
                        <MDBCol md={2} key={filme.id}>
                            <Link to={`/filme/${filme.id}`}>
                                <MDBCardImage src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} fluid alt={filme.title} />
                            </Link>
                            <p>{filme.title}</p>
                        </MDBCol>
                    ))}
                </MDBRow>

                {loading && <p>Carregando...</p>}
                {!loading && currentPage < totalPages && (
                    <MDBBtn onClick={loadMoreFilmes}>
                        Carregar Mais
                    </MDBBtn>
                )}
            </MDBContainer>

        </section >
    );
}

export default Filmes;
