let template = `
    <div>
        <ul id="myUL">
            <template v-for="item in itemList" >
                <li  v-bind:key="item.no"
                     v-bind:class="{ checked : item.yn }"
                     v-on:click="checkedItem(item.no)">
                        {{ item.contents }}
                        <span class="close" v-on:click.self.stop="deleteItem(item.no)">x</span>
                </li>
            </template>
        </ul>
    </div>`


export default {
    template : template,
    data : function(){
        return {
            items : [],
            updateItem : {}
        }
    },
    computed : {
        itemList : function(){
            return $.map(this.items, function(item, index){
                item.yn = item.todoyn == 1 ? true : false;
                return item;
            })
        }
    },
    watch : {
        updateItem : function(){
            const component = this;
            $.ajax({
                url : 'http://192.168.0.2:8081/myserver/todoUpdate',
                data : component.updateItem,
                datatype : 'json',
                success : function(data){
                    if(data != null){
                        alert('todoList update');
                    }
                },
                error : function(reject){
                    console.log(reject);
                }
            })
        }
    },
    created : function(){
        this.loadData();
    },
    methods : {
        loadData : function(){
            const component = this;
             $.ajax({
                url : 'http://192.168.0.2:8081/myserver/todoSelect',
                datatype : 'json',
                success : function(data){
                    component.items = data;
                },
                error : function(reject){
                    console.log(reject);
                }
            })
        },
        checkedItem : function(no){
            const component = this;
            $(this.items).each(function(index, item){
                if(item.no == no){
                    item.todoyn = item.todoyn == 1 ? 0 : 1;
                    component.updateItem = item;
                }
            })
        },
        deleteItem : function(no){
            const component = this;
            $.ajax({
                url : 'http://192.168.0.2:8081/myserver/todoDelete',
                data : { no : no },
                datatype : 'json',
                success : function(data){
                    if(data != null){
                        alert('todoList Delete');
                        component.items = $.grep(component.items, function(item){
                            return !(item.no == no);
                        })
                    }
                },
                error : function(reject){
                    console.log(reject);
                }
            })
        }
    }
}