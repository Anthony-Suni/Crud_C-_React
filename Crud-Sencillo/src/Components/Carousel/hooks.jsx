import Movie from "../Movie";

const moviesDataToday = [
    {
        name: 'Interestellar',
        urlImage: '/interestellar.jpg',
        categorys: ['Ciencia ficción', 'Drama'],
        year: 2014
    },
    {
        name: 'Cars',
        urlImage: '/cars.jpeg',
        categorys: ['Animación', 'Comedia'],
        year: 2006
    },
    {
        name: 'Avengers: End game', 
        categorys: ['Acción', '	Superhéroes', 'Ciencia Ficción'],
        year: 2019,
        urlImage: '/avengers.jpeg'
    },
    {
        name: 'Interestellar',
        urlImage: '/interestellar.jpg',
        categorys: ['Ciencia ficción', 'Drama'],
        year: 2014
    },
    {
        name: 'Cars',
        urlImage: '/cars.jpeg',
        categorys: ['Animación', 'Comedia'],
        year: 2006
    },
    {
        name: 'Avengers: End game', 
        categorys: ['Acción', '	Superhéroes', 'Ciencia Ficción'],
        year: 2019,
        urlImage: '/avengers.jpeg'
    },
    {
        name: 'Interestellar',
        urlImage: '/interestellar.jpg',
        categorys: ['Ciencia ficción', 'Drama'],
        year: 2014
    },
    {
        name: 'Cars',
        urlImage: '/cars.jpeg',
        categorys: ['Animación', 'Comedia'],
        year: 2006
    },
    {
        name: 'Avengers: End game', 
        categorys: ['Acción', '	Superhéroes', 'Ciencia Ficción'],
        year: 2019,
        urlImage: '/avengers.jpeg'
    },
];

const moviesDataWeek = [
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
];

const moviesDataMonth = [
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
    {
        name: 'Avengers: End game', 
        categorys: ['Acción', '	Superhéroes', 'Ciencia Ficción'],
        year: 2019,
        urlImage: '/avengers.jpeg'
    },
    {
        name: 'Interestellar',
        urlImage: '/interestellar.jpg',
        categorys: ['Ciencia ficción', 'Drama'],
        year: 2014
    },
    {
        name: 'Cars',
        urlImage: '/cars.jpeg',
        categorys: ['Animación', 'Comedia'],
        year: 2006
    },
    {
        name: 'Avengers: End game', 
        categorys: ['Acción', '	Superhéroes', 'Ciencia Ficción'],
        year: 2019,
        urlImage: '/avengers.jpeg'
    },
    {
        name: 'Avatar',
        urlImage: '/avatar.jpeg',
        categorys: ['Acción', 'Ciencia ficción'],
        year: 2009
    },
    {
        name: 'Toy story',
        urlImage: '/toy.jpeg',
        categorys: ['Animación', 'Aventura', 'Comedia'],
        year: 1995
    },
]

const nextMovie = (container, numberCards) => {
    container.current.scrollBy({
        left: (164 + 14) * numberCards,
        behavior: 'smooth'
    });
}

const backMovie = (container, numberCards) => {
    container.current.scrollBy({
        left: (-164 - 14) * numberCards,
        behavior: 'smooth'
    });
}

const currentMovies = (section, container) => {
    
    if (container.current) {
        container.current.scrollTo({
            left: 0
        });
    };

    if (section === 'today') {
        return (
            moviesDataToday.map((element, index) => <Movie key={index} name={element.name} year={element.year} categorys={element.categorys} urlImage={element.urlImage} />)
        )
    }
    if (section === 'week') {
        return (
            moviesDataWeek.map((element, index) => <Movie key={index} name={element.name} year={element.year} categorys={element.categorys} urlImage={element.urlImage} />)
        )
    }
    if (section === 'month') {
        return (
            moviesDataMonth.map((element, index) => <Movie key={index} name={element.name} year={element.year} categorys={element.categorys} urlImage={element.urlImage} />)
        )
    }
}

export {
    moviesDataToday,
    moviesDataWeek,
    nextMovie,
    backMovie,
    currentMovies
}