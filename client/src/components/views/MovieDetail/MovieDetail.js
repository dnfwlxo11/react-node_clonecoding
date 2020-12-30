import { resolveOnChange } from 'antd/lib/input/Input'
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import Favorite from './Sections/Favorite'
import { Row } from 'antd'

function MovieDetail(props) {
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCrews(response.cast)
            })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}

            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Favorite 
                    movieInfo={Movie}
                    movieId={movieId}
                    userFrom={localStorage.getItem('userId')}
                />
            </div>

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* Movie Info */}

                <MovieInfo
                    movie={Movie}
                />

                <br />
                { /* Action Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle actor view</button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Crews &&
                            Crews.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ?
                                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        actorName={cast.name}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </Row>
                }

            </div>

        </div>
    )
}

export default MovieDetail
