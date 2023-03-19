import MovieList from '../components/moiveList.js'
import MovieDetail from '../components/movieDetail.js'
import main from '../components/main.js'


export default new VueRouter({
    // mode : 'history',
    routes : [
        {
            path : '/',
            name : 'main',
            component : main
        },
        {
            path : '/movieList',
            name : 'movieList',
            component : MovieList
        },
        {
            path : '/movieDetail/:movieCd',
            name : 'movieDetail',
            component : MovieDetail,
            props : true
        }
    ]
})