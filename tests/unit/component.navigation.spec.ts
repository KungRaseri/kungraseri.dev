import Vuetify from 'vuetify';

import { mount, createLocalVue } from '@vue/test-utils';

import Navigation from '@/components/Navigation.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Navigation.vue', () => {
  const mountFunction = (options: any) => {
    return mount(Navigation, {
      localVue,
      Vuetify,
      ...options,
    });
  };
  it('wrapper html matches snapshot', () => {
    const wrapper = mountFunction({});

    expect(wrapper.html()).toMatchSnapshot();
  });
});
