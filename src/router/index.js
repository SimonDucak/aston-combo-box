import Vue from 'vue';
import VueRouter from 'vue-router';
import Combo from '../views/Combo.vue';
import Datepicker from '../views/Datepicker.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/combo',
    name: 'Combo',
    component: Combo,
  },
  {
    path: '/datepicker',
    name: 'Datepicker',
    component: Datepicker,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
