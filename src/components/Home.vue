<template>
	<div class="row">
		<div class="col-xs-12">
			<div class="panel panel-default rssHeader">
				<div class="panel-header">
					<h1>RSS News</h1>
					<input type="text" v-model='newSubreddit' v-on:keyup.enter="addSubreddit(newSubreddit)">
					<button type="button" class="btn btn-danger" @click='addSubreddit(newSubreddit)'>Add Subreddit RSS</button>
				</div>
			</div>
		</div>

		<div v-for='subreddit in rssData' track-by="$index">
			<div class="col-xs-12 col-md-6">
				<div class="panel panel-default rssPanel" >
					<div class="panel-header">
						<h2>{{subreddit | splice}}</h2><span type="button" class="btn btn-danger" @click='removeSubreddit(subreddit[0])'>X</span>
					</div>
					<ul class="panel-body posts">
						<li v-for='post in subreddit'>
							<span class="tooltips">
								<span class="tooltipstext">{{post.title}}</span>
								<a :href="post.url">{{post.title | truncate 60}}</a>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script src='./Home/script.js'></script>
<style src='./Home/style.sass' lang='sass?indentedStyle'></style>
