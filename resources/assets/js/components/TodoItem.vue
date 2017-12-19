<template>
	<tr>
		<td class="is-fullwidth" style="cursor: pointer" :class="{ 'is-done': done }" @click="toggleDone(id)">
	        {{ text }}
	    </td>
	    <td class="is-narrow">
	        <a class="button is-danger is-small" @click="removeTodo(id)">Eliminar</a>
	    </td>
    </tr>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: {id: Number, text: String, done: Boolean},
    methods: {
    	removeTodo(id) {
            this.$emit('remove', id)
        },
        toggleDone(id) {
        	this.$emit('toggle', id)
        }
    }
  };
</script>