import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import './SerieSelect.scss';
import { MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
import { apiKey } from '../service/api';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { ImStarFull } from 'react-icons/im';

const SerieSelect = () => {
    const { id } = useParams();
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [relatedSeries, setRelatedSeries] = useState([]);
    const [seriesToShow, setSeriesToShow] = useState(4);
    const [totalSeries, setTotalSeries] = useState(0);
    const [loadedSeriesCount, setLoadedSeriesCount] = useState(4);

    useEffect(() => {
        // Certifique-se de que é uma rota de série de TV
        if (window.location.pathname.startsWith('/serie')) {
            // Fazer uma chamada à API apenas para séries com base no ID
            axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                params: {
                    api_key: apiKey,
                    language: 'pt-br',
                }
            })
                .then(response => {
                    setSelectedSeries(response.data);
                })
                .catch(error => {
                    console.error('Erro na requisição à API do TMDb para séries de TV: ' + error);
                });
        }
    }, [id]);

    useEffect(() => {
        // Fazer uma chamada à API para obter séries de TV relacionadas
        if (selectedSeries) {
            axios.get(`https://api.themoviedb.org/3/tv/${id}/similar`, {
                params: {
                    api_key: apiKey,
                    language: 'pt-br',
                }
            })
                .then(response => {
                    const relatedSeries = response.data.results;
                    setRelatedSeries(relatedSeries);
                    setTotalSeries(relatedSeries.length);
                })
                .catch(error => {
                    console.error('Erro na requisição à API do TMDb para séries de TV relacionadas: ' + error);
                });
        }
    }, [selectedSeries]);

    const loadMoreSeries = () => {
        if (loadedSeriesCount + 4 <= totalSeries) {
            setLoadedSeriesCount(loadedSeriesCount + 4);
        } else {
            setLoadedSeriesCount(totalSeries);
        }
    };

    return (
        <section id="selected">
            <div>
                <MDBContainer>
                    {selectedSeries && (
                        <MDBRow>
                            <MDBCol md={3}>
                                {selectedSeries.poster_path ? (
                                    <MDBCardImage src={`https://image.tmdb.org/t/p/w500${selectedSeries.poster_path}`} alt={selectedSeries.name} fluid />
                                ) : (
                                    <p>Imagem não disponível</p>
                                )}

                                <p className="ratingSerie"><ImStarFull className="icon" size={20} /> {selectedSeries.vote_average ? selectedSeries.vote_average.toFixed(1) : 'Informação não disponível'}</p>
                            </MDBCol>

                            <MDBCol>
                                <MDBContainer>
                                    <h1>{selectedSeries.name || 'Nome não disponível'}</h1>

                                    <p className="seriesDesc">{selectedSeries.overview}</p>

                                    <div className="infoDatas">
                                        <h5> <RiCalendarTodoFill className="icon" size={20} /> Lançamento :</h5>
                                        <p className='dateRelease'>{selectedSeries.first_air_date ? new Date(selectedSeries.first_air_date).toLocaleDateString('pt-BR', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        }) : 'Informação não disponível'}</p>
                                    </div>

                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    )}
                </MDBContainer>
            </div>

            <div className="seeToo">
                <MDBContainer>
                    <h2>Séries de TV Relacionadas</h2>
                    <MDBRow>
                        {relatedSeries.slice(0, loadedSeriesCount).map(serie => (
                            <MDBCol md={3} key={serie.id}>
                                {serie.poster_path ? (
                                    <Link to={`/serie/${serie.id}`}>
                                        <MDBCardImage src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} fluid />
                                    </Link>
                                ) : (
                                    <p>Imagem não disponível</p>
                                )}
                                <h5>{serie.name || 'Nome não disponível'}</h5>
                            </MDBCol>
                        ))}
                    </MDBRow>
                    {loadedSeriesCount < totalSeries && (
                        <MDBRow>
                            <MDBCol md={12}>
                                <MDBBtn onClick={loadMoreSeries} className="btnShowMore">
                                    Carregar Mais
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    )}
                </MDBContainer>
            </div>
        </section>
    );
}

export default SerieSelect;
