import {createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import PostDetail from '../components/PostDetail.vue';

const routes = [
	{
		path: '/list',
		name: 'BoardList',
		component: BoardList
	},
	{
		path: '/post/:postId',
		name: 'PostDetail',
		component: PostDetail
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
export default router;