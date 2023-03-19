export default {
    template: `   

    <div>
  
        <h1> 제목 : {{detail.movieNm}} </h1>
        <div style="border: 1px solid gray; margin-bottom:10px;">
        <ul style="list-style-type: disc;">            
            <li> 배우 : 
            <span v-for="act in detail.actors">{{act.peopleNm}}</span>
            </li>
            <li> 감독 : <span v-for="item in detail.directors">한글 - {{item.peopleNm}} / 영문 - {{item.peopleNmEn}}</span></li>
            <li> 장르 : <span v-for="item in detail.genres">{{item.genreNm}}</span> </li>
            <li> 상영 시간 : {{detail.showTm}}분 </li>
        </ul>
        </div>
            <router-link tag="button" v-bind:to="{ name : 'movieList'}"  style="float:right;" >목록</router-link>
    </div>

`,
    props: ['movieCd'],
    data: function () {
        return {
            detail: {}
        }
    },
    created: function () {
        console.log(this.movieCd)
        fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=${this.movieCd}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.detail = data.movieInfoResult.movieInfo
            }).catch(err => console.log(err))
    }
}