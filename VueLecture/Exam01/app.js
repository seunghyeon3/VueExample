import router from './router/router.js'
import todoHeader from './components/todoHeader.js'

let template = `
    <div>
        <todo-header></todo-header>
        <router-view></router-view>
    </div>`

new Vue({
    el : '#app',
    router,
    template : template,
    components : {
        todoHeader
    }
})