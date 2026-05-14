import { useEffect, useState } from "react";
import Card from "../../components/card";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useDispatch, useSelector } from "react-redux";
import { FetchMovies, MoviesSelector, MoviesStatus } from "./components/movieSlice";
import { uselanguage } from "../../context/languageContext";

function Home({ search }) {
    const [currentPage, setCurrentPage] = useState(1);
    const mytheme = useSelector((state) => state.RthemeReducer.theme);
    const movies = useSelector((state) => state.RMoviesReducer.movies);
    const status = useSelector((state) => state.RMoviesReducer.status);
    const { language } = uselanguage();
    const dispatch = useDispatch();

    const translations = {
        en: {
            title: "Movie's List",
            loading: "loading",
            prev: "Prev",
            next: "Next",
            page: "Page"
        },
        ar: {
            title: "قائمة الأفلام",
            loading: "جاري التحميل",
            prev: "السابق",
            next: "التالي",
            page: "صفحة"
        }
    };

    const t = translations[language] || translations.en;

    useEffect(() => {
        setCurrentPage(1);
    }, [search.query]);

    useEffect(() => {
        dispatch(FetchMovies({ query: search.query, page: currentPage, language }));
    }, [search.query, currentPage, language, dispatch]);

    
    const handlePagination = (e) => {
        const direction = e.target.name;
        setCurrentPage(prev => 
            direction === 'increase' ? prev + 1 : Math.max(1, prev - 1)
        );
    };

    return (
        <div className={`flex gap-9 flex-wrap justify-center pt-4
            ${mytheme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
        `} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <AcUnitIcon />
            <h1 className="text-5xl font-semibold">{t.title}</h1>
            <AcUnitIcon />
            <hr className="w-full border-t border-black" />

            {status === 'pending' ? (
                <h1 className="text-3xl font-bold w-full text-center">{t.loading}</h1>
            ) : (
                movies.map(movie => (
                    <Card
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        rating={movie.vote_average}
                        overview={movie.overview}
                        date={movie.release_date}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                ))
            )}

            <hr className="w-full" />
            <div className="flex gap-3 pb-6">
                <button 
                    className="btn bg-slate-600 p-5" 
                    name="decrease" 
                    onClick={handlePagination}
                    disabled={currentPage === 1}
                >{t.prev}</button>

                <span className="flex items-center px-4">{t.page} {currentPage}</span>

                <button 
                    className="btn bg-blue-600 p-5" 
                    name="increase" 
                    onClick={handlePagination}
                >{t.next}</button>
            </div>
        </div>
    );
}

export default Home;