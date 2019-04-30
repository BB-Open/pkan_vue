import LandingPage from '../pages/LandingPage';
import Search from '../pages/Search';
import Impressum from '../pages/Impressum';
import StartPage from '../pages/StartPage';
import Router from 'vue-router';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/search', component: Search },
  { path: '/impressum', component: Impressum },
  { path: '/start', component: StartPage},
];

export const router = new Router({
  routes // short for `routes: routes`
});
