import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home/home.view.vue';
import Game from '@/views/game/game.view.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/game',
      component: Game,
    },
  ],
});

export default router;
