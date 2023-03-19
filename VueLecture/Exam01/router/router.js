import selectItems from '../components/selectItems.js'

export default new VueRouter({
    routes : [
        {
            path : '/',
            name : 'todoList',
            component : selectItems            
        },
        {
            path : '*',
            redirect : '/'
        }
    ]
})