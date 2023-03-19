let template = `
<div id="myDIV" class="header">
    <h2 style="margin:5px">My To Do List</h2>
    <input type="text" v-model="title" placeholder="Title...">
    <span v-on:click="addItem" class="addBtn">Add</span>
</div>
`

export default {
    template : template,
    data : function(){
        return {
            title : ''
        }
    },
    methods : {
        addItem : function(){
            const component = this;
            $.ajax({
                url : 'http://192.168.0.2:8081/myserver/todoInsert',
                data : {
                    contents : component.title
                },
                datatype : 'json',
                success : function(data){
                    if(data != null){
                        alert("TodoList add!!"); 
                        component.$router.go(0);                      
                    }
                },
                error : function(reject){
                    console.log(reject);
                }
                
            })
        }
    }

}