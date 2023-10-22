import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                language: 'en-US', // Idioma dos resultados (ajuste conforme necessário)
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

    return (
        <section id='home'>
            <div className='TextIntro'>
                <MDBContainer>
                    <h1>Bem-Vindo(a).</h1>
                    <h2>Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.</h2>
                </MDBContainer>
            </div>

            <div className='destaques'>
                <MDBContainer>
                    <h4>Novidades - Filme</h4>
                    <MDBRow className='flex-nowrap overflow-auto pb-5'>
                        {latestReleases.map(release => (
                            <MDBCol key={release.id}>
                                
                                    <img className='filmDestaque' src={`https://image.tmdb.org/t/p/w500${release.poster_path}`} position='top' alt={release.title} />
                                
                            </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
            </div>
        </section>
    );
}

export default Home;
