import React from "react";
import '../../Styles/movie.css';

const Movie = (props) => {
    const { name, year, categorys, urlImage } = props;

    return (
        <div className='movie'>
            <div className="container-img-movie">
                <img alt={name} src={urlImage} className='img-movie'/>
            </div>
            <div className='data-movie'>
                <div className='categorys-data' >
                    { categorys.map((element, index) => {
                        return (
                            <span key={index} className="categorys">{`${element}, `}</span>
                        )
                    })}
                    <span className='categorys'>{year}</span>
                </div >
                <span className='title-movie'>
                    {name}
                </span>
            </div>
        </div>
    )
}

export default Movie;