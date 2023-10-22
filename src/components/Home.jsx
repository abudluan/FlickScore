import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
} from 'mdb-react-ui-kit';
import './Home.scss';

import { apiKey } from './service/api';

const Home = () => {
    const [latestReleases, setLatestReleases] = useState([]);

    useEffect(() => {
        // Fazer uma chamada à API para obter os últimos lançamentos de filmes em cartaz
        axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: apiKey,
                language: 'pt-br', // Idioma dos resultados (ajuste conforme necessário)
                page: 1, // Página de resultados
            }
        })
            .then(response => {
                // Obter a lista dos últimos lançamentos de filmes
                const releases = response.data.results.slice(0, 7); // Pegar os 5 primeiros lançamentos
                setLatestReleases(releases);
            })
            .catch(error => {
                console.error('Erro na requisição à API do TMDb: ' + error);
            });
    }, []);

    function formatRating(rating) {
        if (rating === Math.floor(rating)) {
            return rating.toFixed(1); // Adiciona ".0" às notas inteiras
        }
        return rating.toString(); // Mantém as notas com dígitos decimais
    }

    return (
        <section id='home'>
            <div className='TextIntro'>
                <MDBContainer>
                    <h1>Bem-Vindo(a).</h1>
                    <h2>Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.</h2>
                </MDBContainer>
            </div>

            <div className='destaquesFilmes'>
                <MDBContainer>
                    <h4>Novidades - Filme</h4>
                    <MDBRow className='flex-nowrap overflow-auto'>
                        {latestReleases.map(release => (
                            <MDBCol key={release.id}>
                                <Link>
                                    <img src={`https://image.tmdb.org/t/p/w500${release.poster_path}`} position='top' alt={release.title} />
                                </Link>

                                <p className='ratingFilm'>
                                    <span className='TextNota'>Nota : </span>{formatRating(release.vote_average)}
                                </p>

                                <div className='infoFilm'>
                                    <Link>
                                        <p className='titleLink'>{release.title}</p>
                                    </Link>

                                    <p className='dateFilme'>{new Date(release.release_date).toLocaleDateString('pt-BR', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}</p>

                                </div>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
            </div>
        </section>
    );
}

export default Home;
