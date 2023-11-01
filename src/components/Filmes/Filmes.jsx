import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Filmes.scss';
import { Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
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
                    <MDBCol className="colPesquisa" md={3}>
                        <p>pesquisa</p>
                        <MDBBtn className="btnSearch">Pesquisar</MDBBtn>
                    </MDBCol>

                    <MDBCol className="colFilmes" md={9}>
                        <MDBRow>
                            {filmes.map((filme, index) => (
                                <MDBCol key={filme.id} md={3}>
                                    <Link to={`/filme/${filme.id}`}>
                                        <MDBCard className="cardFilme">
                                            <MDBCardImage src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} fluid alt={filme.title} />

                                            <div className="filmeInfo">
                                                <p className="filmTitle">{filme.title}</p>
                                                <p className='dateRelease'>{filme.release_date ? new Date(filme.release_date).toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }) : 'Informação não disponível'}</p>
                                               
                                            </div>
                                        </MDBCard>
                                    </Link>
                                </MDBCol>
                            ))}
                        </MDBRow>
                        {loading && <p>Carregando...</p>}
                        {!loading && currentPage < totalPages && (
                            <MDBBtn onClick={loadMoreFilmes}>
                                Carregar Mais
                            </MDBBtn>
                        )}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>

    );
}

export default Filmes;
