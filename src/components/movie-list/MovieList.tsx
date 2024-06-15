import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import styles from './MovieList.module.scss'

const BASE_URL: string = 'https://api.kinopoisk.dev/v1.4'
const API_KEY: string = 'MD0SWF1-57ZMA77-PW9VVX9-RA8ZZGQ'

type Movie = {
	id: number
	name: string
	year: string
	rating: {
		imdb: number
	}
	poster: {
		url: string
	}
}

const MovieList: FC = () => {
	const [movies, setMovies] = useState<Movie[]>([])
	/* const [currentPage, setCurrentPage] = useState<number>(1) */
	/* const [totalPages, setTotalPages] = useState<number>(1) */

	useEffect(() => {
		getMovies()
	}, [])

	const getMovies = async () => {
		try {
			const response = await axios({
				url: '/movie?limit=50&notNullFields=name&notNullFields=poster.url&notNullFields=description&notNullFields=rating.imdb',
				method: 'get',
				baseURL: BASE_URL,
				headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
			})
			console.log(response)

			setMovies(response.data.docs)
			/* setTotalPages(Math.ceil(response.data.total / 50)) */
		} catch (err: any) {
			throw new Error(err)
		}
	}

	/* const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	} */

	return (
		<>
			{movies.map(movie => (
				<div key={movie.id} className={styles.form}>
					<img src={movie.poster.url} alt='' />
					<div>
						<div className={styles.title}>{movie.name}</div>
						<div className={styles.descr}>
							<div className={styles.year}>Год выпуска: {movie.year}</div>
						</div>
					</div>
					<div className={styles.rating}>{movie.rating.imdb}</div>
					<button>Add to favorite</button>
				</div>
			))}
			{/* <div className='pagination'>
				<button
					onClick={() => handlePageChange(1)}
					disabled={currentPage === 1}
				>
					Первая
				</button>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Предыдущая
				</button>
				{[...Array(totalPages)].map((_, index) => (
					<button
						key={index + 1}
						className={index + 1 === currentPage ? 'active' : ''}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Следующая
				</button>
				<button
					onClick={() => handlePageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					Последняя
				</button>
			</div> */}
		</>
	)
}

export default MovieList
