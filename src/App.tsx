import styles from './App.module.scss'
import MovieList from './components/movie-list/MovieList'

function App() {
	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<a href='/' className={styles.header__title}>
					FilmsCatalog
				</a>

				<input
					type='text'
					placeholder='Search'
					className={styles.header__search}
				/>
			</header>
			<main className={styles.main}>
				<MovieList />
			</main>
		</div>
	)
}

export default App
