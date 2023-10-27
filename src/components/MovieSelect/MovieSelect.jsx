import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieSelect.scss';
import { MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBCardFooter } from "mdb-react-ui-kit";
import { apiKey } from '../service/api';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { ImStarFull } from 'react-icons/im';
import { GiSandsOfTime } from 'react-icons/gi';

const MovieSelect = () => {
    const { id } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // Certifique-se de que é uma rota de filme (você não deseja informações de séries)
        if (window.location.pathname.startsWith('/filme')) {
            // Fazer uma chamada à API apenas para filmes com base no ID
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: apiKey,
                    language: 'pt-br',
                }
            })
                .then(response => {
                    setSelectedMovie(response.data);
                })
                .catch(error => {
                    console.error('Erro na requisição à API do TMDb para filmes: ' + error);
                });
        }
    }, [id]);

    const formatBudget = (budget) => {
        return budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <section id="selected">
            <MDBContainer>
                {selectedMovie && (
                    <MDBRow>
                        <MDBCol md={3}>
                            {selectedMovie.poster_path ? (
                                <MDBCardImage src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} fluid />
                            ) : (
                                <p>Imagem não disponível</p>
                            )}

                            <p className="ratingMovie"><ImStarFull className="icon" size={20} /> {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : 'Informação não disponível'}</p>

                        </MDBCol>

                        <MDBCol>
                            <MDBContainer>
                                <h1>{selectedMovie.title || 'Título não disponível'}</h1>

                                <p className="movieDesc">{selectedMovie.overview}</p>

                                <div className="infoDatas">
                                    <h5> <RiCalendarTodoFill className="icon" size={20} /> Lançamento :</h5>
                                    <p className='dateRelease'>{selectedMovie.release_date ? new Date(selectedMovie.release_date).toLocaleDateString('pt-BR', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    }) : 'Informação não disponível'}</p>
                                </div>

                                <div className="infoDatas">
                                    <h5><MdOutlineAttachMoney className="icon" size={20} />Orçamento:</h5>
                                    <p>{selectedMovie.budget ? formatBudget(selectedMovie.budget) : 'Informação não disponível'}</p>
                                </div>

                                <div className="infoDatas">
                                    <h5><FaMoneyBillWave className="icon" size={20} /> Receita:</h5>
                                    <p>{selectedMovie.revenue ? formatBudget(selectedMovie.revenue) : 'Informação não disponível'}</p>
                                </div>

                                <div className="infoDatas">
                                    <h5>< GiSandsOfTime className="icon" size={20} />Duração: </h5>
                                    <p>{selectedMovie.runtime ? `${selectedMovie.runtime} minutos` : 'Informação não disponível'}</p>
                                </div>

                                <div className="atores">

                                </div>
                            </MDBContainer>
                        </MDBCol>
                    </MDBRow>
                )}
            </MDBContainer>
        </section>
    );
}

export default MovieSelect;
