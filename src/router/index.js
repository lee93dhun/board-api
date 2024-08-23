import {createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';


const routes = [
	{
		path: '/board-api/list',
		name: 'BoardList',
		component: BoardList,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;