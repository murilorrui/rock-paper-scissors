import Vue from 'vue';
import Router from 'vue-router';

import Game from '@/views/game/game.view.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Game,
    },
  ],
});

export default router;
