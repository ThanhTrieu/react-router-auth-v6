import axios from 'axios';
import moment from 'moment';

export const getDataUpcomingMovies = async (page = 1) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const nextDate = moment().add(180, 'days').format('YYYY-MM-DD');

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&release_date.gte=${currentDate}&release_date.lte=${nextDate}&with_release_type=3|2`;

    const response = await axios.get(url);
    return response.status === 200 ? response.data : {};

}
export const getDetailMoviesById = async (id = 0) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=videos,images&include_image_language=en,null`;
    const response = await axios.get(url);
    return response.status === 200 ? response.data : {};
}