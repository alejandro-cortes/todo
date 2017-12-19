import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
    },
    mutations: {
        GET_TODOS(state){
        	axios.get("/todos")
            .then(response => {
            	state.todos = response.data
            })
            .catch(e => {
            	alert(e)
            })
        },
        ADD_TODO(state, text){
        	axios.post("/todos", {
         		 text: text, done: false
         	    })
         	    .then(response => {
         	    	state.todos.push({ id: response.data.id, text: response.data.text, done: response.data.done })
                     
         	    })
         	    .catch(e => {
         	      alert(e)
         	    })
        },
        REMOVE_TODO(state, todo){
        	let index = state.todos.findIndex(item => item.id === todo)
            axios.delete('/todos/'+todo)
                .then(response => {
                	state.todos.splice(index, 1)
        	    })
        	    .catch(e => {
        	    	alert(e)
        	    })
        },
        TOGGLE_DONE(state, id){
        	let index = state.todos.findIndex(item => item.id === id)
        	let todo = state.todos[index]
        	axios.put("/todos/"+todo.id, {
          		 done: !todo.done
          	    })
          	    .then(response => { todo.done = !todo.done; })
          	    .catch(e => {
          	    	alert(e)
          	    })
        },
    },
    actions: {
        getTodos({commit}){
            commit('GET_TODOS')
        },
        addTodo({commit}, todo){
            commit('ADD_TODO', todo)
        },
        removeTodo({commit}, todo){
            commit('REMOVE_TODO', todo)
        },
        toggleDone({commit}, id){
            commit('TOGGLE_DONE', id)
        },
    },
    getters: {
        todos: state => state.todos,
    }

})