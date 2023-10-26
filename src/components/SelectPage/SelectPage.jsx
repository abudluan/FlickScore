import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SelectPage.scss';
import { MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

import { apiKey } from '../service/api';

const SelectPage = () => {
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Verificar se é uma rota de filme ou série com base no caminho da rota
        const isMovieRoute = window.location.pathname.startsWith('/filme');
        // Fazer uma chamada à API apropriada com base em isMovieRoute e id
        const apiEndpoint = isMovieRoute ? 'movie' : 'tv';
        axios.get(`https://api.themoviedb.org/3/${apiEndpoint}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'pt-br',
            }
        })
            .then(response => {
                setSelectedItem(response.data);
            })
            .catch(error => {
                console.error('Erro na requisição à API do TMDb: ' + error);
            });
    }, [id]);

    return (
        <section id="selected">
            <MDBContainer>
                {selectedItem && (
                    <MDBRow>
                        <MDBCol md={2}>
                            {selectedItem.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${selectedItem.poster_path}`} alt={selectedItem.title || selectedItem.name} />
                            ) : (
                                <p>Imagem não disponível</p>
                            )}
                        </MDBCol>

                        <MDBCol>
                            <h1>{selectedItem.title || selectedItem.name || 'Título não disponível'}</h1>
                            <p>{selectedItem.overview}</p>
                        </MDBCol>
                    </MDBRow>
                )}
            </MDBContainer>
        </section>
    );
}

export default SelectPage;