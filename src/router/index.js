import {createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import PostDetail from '../components/PostDetail.vue';

const routes = [
	{
		path: '/board-api/list',
		name: 'BoardList',
		component: BoardList
	},
	{
		path: '/board-api/post/:postId',
		name: 'PostDetail',
		component: PostDetail
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;