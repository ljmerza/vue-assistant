export default {
		data () {
			return {
				showRSS: false,
				rssSubreddits: ['news', 'worldnews'],
				rssData: [],
				newSubreddit: ''
			}
		},
		filters: {
			truncate: function(initVal, value) {
				if(typeof initVal != 'undefined'){
					return initVal.substring(0, value)
				}
			},
			splice: function(array) {
				return array[0]
			}
		},
		methods: {
			addSubreddit (sub) {
				if (sub == '') return

				if (this.rssSubreddits.indexOf(sub) == -1){
					this.rssSubreddits.push(sub)
					this.getRedditRSS()
				}	
			},
			removeSubreddit (subName) {
				this.rssSubreddits.splice(this.rssSubreddits.indexOf(subName), 1)
				this.getRedditRSS()
			},
			getRedditRSS () {
				this.newSubreddit = ''

				// save component instance
				var that = this
				var index = 0
				this.rssData = []
				this.rssSubreddits.forEach( (rssSub) => {
					this.$http.post('api/redditRSS', {rssReddits: rssSub})
					.then( (data) => {
						// clear old data
						
						let xml = $.parseXML(data.data)
						this.rssData.push([$(xml).find('category').attr('term')])
						// for each reddit entry in xml
						$(xml).find('entry').each( function () {
							let data = {
								title: $(this).find('title').text(),
								url: $(this).find('link').attr('href')
							}
							// store data to subreddit's array
							that.rssData[index].push(data)
						})
						++index
					})
					
				})
				this.showRSS = true
			}
		},
		ready () {
			this.getRedditRSS()
		}
	}