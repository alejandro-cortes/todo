<template>
    <div class="container">
        <div class="box">
            <TodoInput></TodoInput>
        </div>
        <table class="table is-bordered">
        	<TodoItem v-for="(todo, index) in items" :key="index" :id="todo.id" :text="todo.text" :done="todo.done"></TodoItem>
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
     import TodoInput from './TodoInput'
     import TodoItem from './TodoItem'
     
    export default {
        data () {
            return {
            }
        },
        components : {
            'TodoInput': TodoInput,
            'TodoItem': TodoItem 
        },
        created() {
        	this.$store.dispatch('getTodos')
        },
        computed: {
            items(){
                return this.$store.getters.todos
            }
        },
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
