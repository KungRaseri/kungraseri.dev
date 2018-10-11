import Vue from 'vue';
import Vuex from 'vuex';
import {
  UPDATE_ACCOUNT,
  UPDATE_IS_AUTHENTICATED,
  ADD_EDIT_HERO_CLASS,
  ADD_EDIT_HERO_SKILL,
  ADD_EDIT_HERO_RACE,
  UPDATE_HEROES
} from './store/mutation-types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    account: {},
    token: {},
    heroes: {
      classes: [],
      skills: [],
      races: []
    },
    mythicDrops: {},
    mythicMobs: {}
  },
  mutations: {
    [UPDATE_ACCOUNT](state, account) {
      state.account = account;
    },
    [UPDATE_IS_AUTHENTICATED](state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    [ADD_EDIT_HERO_CLASS](state, heroClass) {
      state.heroes.classes.push(heroClass);
    },
    [ADD_EDIT_HERO_SKILL](state, heroSkill) {
      state.heroes.skills.push(heroSkill);
    },
    [ADD_EDIT_HERO_RACE](state, heroRace) {
      state.heroes.races.push(heroRace);
    },
    [UPDATE_HEROES](state, heroes) {
      state.heroes = heroes;
    }
  },
  actions: {
    updateAccount({
      commit
    }, payload) {
      commit(UPDATE_ACCOUNT, payload);
    },
    updateIsAuthenticated({
      commit
    }, payload) {
      commit(UPDATE_IS_AUTHENTICATED, payload);
    },
    addEditHeroClass({
      commit
    }, payload) {
      commit(ADD_EDIT_HERO_CLASS, payload);
    },
    addEditHeroSkill({
      commit
    }, payload) {
      commit(ADD_EDIT_HERO_SKILL, payload);
    },
    addEditHeroRace({
      commit
    }, payload) {
      commit(ADD_EDIT_HERO_RACE, payload);
    },
    updateHeroes({
      commit
    }, payload) {
      commit(UPDATE_HEROES, payload);
    }
  },
  getters: {
    getAccount: (state) => {
      return state.account;
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    getHeroClasses: (state) => {
      return state.heroes.classes;
    },
    getHeroSkills: (state) => {
      return state.heroes.skills;
    },
    getHeroRaces: (state) => {
      return state.heroes.races
    },
    getHeroes: (state) => {
      return state.heroes;
    }
  }
});