import router from './router/router.js'
import myHeader from './components/header.js'

let template = `
<div>
    <h1>영화 검색 사이트</h1>
    <my-header v-bind:parentData.sync="this.$data"></my-header>
    <router-view></router-view>
</div>`

new Vue({
    el : '#app',
    template : template,
    data : {
       movieArray : {}
    },
    components : {
        myHeader
    },
    methods : {
        getParentData : function(){
            return this.movieArray;
        },
        setParentData : function(movieList){
            this.movieArray = movieList;
            console.log(this.movieArray)
        }
    },
    router  // router : router
})