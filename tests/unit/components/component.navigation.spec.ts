import Vuetify from 'vuetify';

import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';

import Navigation from '@/components/Navigation.vue';

const localVue = createLocalVue();
localVue.component('router-link', RouterLinkStub);
localVue.use(Vuetify);

describe('Navigation.vue', () => {
  const mountFunction = (options: any) => {
    return shallowMount(Navigation, {
      localVue,
      Vuetify,
      ...options,
    });
  };
  it('wrapper html matches snapshot', () => {
    const wrapper = mountFunction({
      propsData: { isAuthenticated: false },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
