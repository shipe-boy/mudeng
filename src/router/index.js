import Vue from 'vue'
import Router from 'vue-router'


const Index = () => import('../views/index')
const About = () => import('../views/About')
const CoreWork = () => import('../views/CoreWork')
const Eg = () => import('../views/Eg')
const News = () => import('../views/News')
const Call = () => import('../views/Call')
const Search = () => import('../views/Search')
const Solution = () => import('../views/Solution')

const Views = () => import('../views/Views')
const CoreDetails = () => import('../views/CoreDetails')
const EgDetails = () => import('../views/EgDetails')
const NewsDetails = () => import('../views/NewsDetails')
const AboutViews = () => import('../views/AboutViews')
const NewsViews = () => import('../views/NewsViews')

const DViews = () => import('../components/DViews.vue')

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '/',
		name: 'Index',
		component: Index,
		meta: {
			isTop: true
		}
	}, {
		path: '/about',
		name: 'About',
		component: About,
		redirect: '/about/3',
		children: [{
			path: ':type',
			component: AboutViews
		}]
	}, {
		path: '/coreWork',
		name: 'CoreWork',
		component: CoreWork,
		redirect: '/coreWork/1',
		children: [{
				path: ':type',
				component: Views
			},
			{
				path: 'details/:id',
				component: CoreDetails,
				redirect: 'details/:id/1',
				children: [{
					path: ':nav',
					component: DViews
				}]
			},
			{
				path: 'solution/:id',
				name: 'Solution',
				component: Solution
			}
		]
	}, {
		path: '/eg',
		name: 'Eg',
		component: Eg,
		redirect: '/eg/1',
		children: [{
				path: ':type',
				component: Views
			},
			{
				path: 'details/:id',
				component: EgDetails,
				redirect: 'details/:id/1',
				children: [{
					path: ':nav',
					component: DViews
				}]
			}
		]
	}, {
		path: '/news',
		name: 'News',
		component: News,
		redirect: '/news/list',
		children: [{
				path: 'list',
				component: NewsViews
			},
			{
				path: 'details/:id',
				component: NewsDetails,
				meta: {
					isTop: true
				}
			}
		]
	}, {
		path: '/call',
		name: 'Call',
		component: Call,
		meta: {
			isTop: true
		}
	}, {
		path: '/search',
		name: 'Search',
		component: Search
	}, {
		path: '*',
		redirect: '/'
	}]
})
/* router.beforeEach((to, from, next) => {

  next()
}) */

router.afterEach((to, from) => {
	// console.log(to.path.split('/'))
	let reg = /\/details\/\w+\/1/;
	let path = to.path;
	if (to.meta.isTop || reg.test(path)) {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}


})
router.onError((error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = router.history.pending.fullPath;
	if (isChunkLoadFailed) {
		router.replace(targetPath);
	}
});


export default router
