<template>
    <div class="container">
        <div class="box">
            <TodoInput @update="addTodo"></TodoInput>
        </div>
        <table class="table is-bordered">
        	<TodoItem v-for="(todo, index) in items" :key="index" :id="todo.id" :text="todo.text" :done="todo.done" 
        		@remove="removeTodo"
        		@toggle="toggleDone"></TodoItem>
        </table>
    </div>
</template>

<script>
    /**
     * Tips:
     * - En mounted pueden obtener el listado del backend de todos y dentro de la promesa de axios asirnarlo
     *   al arreglo que debe tener una estructura similar a los datos de ejemplo.
     * - En addTodo, removeTodo y toggleTodo deben hacer los cambios pertinentes para que las modificaciones,
     *   addiciones o elimicaiones tomen efecto en el backend asi como la base de datos.
     */
     import axios from 'axios';
     import TodoInput from './TodoInput'
     import TodoItem from './TodoItem'
     
    export default {
        data () {
            return {
                todoItemText: '',
                items: []
            }
        },
        components : {
            'TodoInput': TodoInput,
            'TodoItem': TodoItem 
        },
        
        mounted () {
            /*this.items = [
                { text: 'Primer recordatorio', done: true },
                { text: 'Segundo recordatorio', done: false },
                { text: 'Tercero recordatorio', done: false },
                { text: 'Cuarto recordatorio', done: true },
                { text: 'Quinto recordatorio', done: false },
            ]*/
        },
        created() {
            axios.get("/todos")
            .then(response => {
              this.items = response.data
            })
            .catch(e => {
            	alert(e)
            })
          },
        methods: {
            addTodo (text) {
                
              	 axios.post("/todos", {
              		 text: text, done: false
              	    })
              	    .then(response => {
              	    	this.items.push({ id: response.data.id, text: response.data.text, done: response.data.done })
                          
              	    })
              	    .catch(e => {
              	      alert(e)
              	    })
                
            },
            removeTodo (todo) {
                axios.delete('/todos/'+todo)
                .then(response => {
                	this.items = this.items.filter(item => item.id !== todo)
        	    })
        	    .catch(e => {
        	    	alert(e)
        	    })
            },
            toggleDone (id) {
            	let index = this.items.findIndex(item => item.id === id)
            	let todo = this.items[index]
                axios.put("/todos/"+id, {
           		 done: !todo.done
           	    })
           	    .then(response => { todo.done = !todo.done; })
           	    .catch(e => {
           	    	alert(e)
           	    })
            }
        }
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
