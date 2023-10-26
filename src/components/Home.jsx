import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ImStarFull } from 'react-icons/im';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCarousel,
    MDBCarouselItem,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBCardFooter,
} from 'mdb-react-ui-kit';
import './Home.scss';

import HomeCapa1 from './img/homeCapa1.webp';
import HomeCapa2 from './img/homeCapa2.webp';
import HomeCapa3 from './img/homeCapa3.webp';
import HomeCapa4 from './img/homeCapa4.webp';

import { apiKey } from './service/api';

const Home = () => {
    const [latestReleasesMovies, setLatestReleasesMovies] = useState([]);
    const [latestReleasesSeries, setLatestReleasesSeries] = useState([]);
    const [forYouMovie, setForYouMovie] = useState(null);
    const [forYouSerie, setForYouSerie] = useState(null);

    useEffect(() => {
        // Fazer uma chamada à API para obter os últimos lançamentos de filmes em cartaz
        axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: apiKey,
                language: 'pt-br',
                page: 1,
            }
        })
            .then(response => {
                const releases = response.data.results.slice(0, 7);
                releases.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                setLatestReleasesMovies(releases);
            })
            .catch(error => {
                console.error('Erro na requisição à API do TMDb: ' + error);
            });

        // Fazer uma chamada à API para obter os últimos lançamentos de séries
        axios.get(`https://api.themoviedb.org/3/tv/on_the_air`, {
            params: {
                api_key: apiKey,
                language: 'pt-br',
                page: 1,
            }
        })
            .then(response => {
                const releases = response.data.results.slice(0, 7);
                setLatestReleasesSeries(releases);
            })
            .catch(error => {
                console.error('Erro na requisição à API do TMDb: ' + error);
            });
    }, []);

    function formatRating(rating) {
        if (rating === Math.floor(rating)) {
            return rating.toFixed(1);
        }
        return rating.toString();
    }


    return (
        <section id='home'>

            <MDBContainer>
                <div className='TextIntro'>
                    <MDBContainer>
                        <h1>Milhões de Filmes e Séries para Descobrir. Explore já!</h1>
                    </MDBContainer>
                </div>
            </MDBContainer>

            <div className='container imgCapa'>
                <MDBCarousel showIndicators fade>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={1}
                        src={HomeCapa1}
                        alt='...'
                    >
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={HomeCapa2}
                        alt='...'
                    >
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={HomeCapa3}
                        alt='...'
                    >
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={HomeCapa4}
                        alt='...'
                    >
                    </MDBCarouselItem>
                </MDBCarousel>
            </div>

            <div className='destaqueDiv'>
                <MDBContainer>
                    <h4>Novidades - Filmes</h4>
                    <MDBRow className='flex-nowrap overflow-auto'>
                        {latestReleasesMovies.map(release => (
                            <MDBCol key={release.id}>
                                <Link to={`/filme/${release.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${release.poster_path}`} alt={release.title} />
                                </Link>

                                <p className='ratingScore'>
                                    <ImStarFull className='icon' size={20} /> {formatRating(release.vote_average)}
                                </p>

                                <Link to={`/filme/${release.id}`}>
                                    <p className='titleLink'>{release.title}</p>
                                </Link>

                                <p className='dateRelease'>{new Date(release.release_date).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}</p>

                            </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
            </div>

            <div className='destaqueDiv mt-5 mb-5'>
                <MDBContainer>
                    <h4>Popular - Séries</h4>
                    <MDBRow className='flex-nowrap overflow-auto'>
                        {latestReleasesSeries.map(release => (
                            <MDBCol key={release.id}>
                                <Link to={`/serie/${release.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${release.poster_path}`} position='top' alt={release.title} />
                                </Link>

                                <p className='ratingScore'>
                                    <ImStarFull className='icon' size={20} /> {formatRating(release.vote_average)}
                                </p>

                                <Link to={`/serie/${release.id}`}>
                                    <p className='titleLink'>{release.name}</p>
                                </Link>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </MDBContainer>
            </div>

           
        </section>
    );
}

export default Home;
