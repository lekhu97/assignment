<template>
	<div>
		<Header/>
		<div class="container">
			<div class="row">
				<div class="col-md-10 offset-md-1">
					<router-view/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from './components/Header.vue'
export default {
	name: 'App',
	components:{
        Header,
    }
}
</script>

<style>
</style>
