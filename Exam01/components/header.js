export default{
    template : `
    <div>
        
                    <div>
                    <label>영화 검색 (오늘 날짜 : {{nowDate}})</label><br><br>
                    <input type="date" v-model="movie">
                    <button v-on:click="loadData" >검색</button>
                    </div>
    </div>
    `,
    props : ['parentData'],
    data : function(){
        return {
            movie : '',
        }
    },
    computed : {
        nowDate : function(){
            let date = new Date()
            let today = date.getFullYear() + ' 년 ' + (date.getMonth()+1) + ' 월 ' + date.getDate() + ' 일'
            return  today
        }
    },
    methods : { 
        getDate : function(){
        let date = new Date();
        date = new Date(Date.parse(date) + 1 * 1000 * 60 * 60 * 24);

        let year = date.getFullYear();
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        if (month.length == 1) month = "0" + month;
        if (day.length == 1) day = "0" + day;
        return year + month + day;
        
    },
        loadData: function () {
            let movieDate = this.movie;
            movieDate = movieDate.replace(/\-/g, '');

            if(movieDate > this.getDate()){
                alert('해당 날짜는 검색할 수 없습니다.')
                this.movie ='';
                return;
            }

            if(movieDate){
                fetch(`http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${movieDate}`)
                .then(res => res.json())
                .then(data =>{
                    console.log(data.boxOfficeResult.dailyBoxOfficeList)
                    this.parentData.movieArray = data.boxOfficeResult.dailyBoxOfficeList;

                    this.$emit('update:parentData', this.parentData)
        
                    this.$router.push({ name : 'movieList'})
          
                }).catch(err => console.log(err));
            }else {
                alert('날짜 입력 안됨')
            }
        }
    }
}