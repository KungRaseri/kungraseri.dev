import Vue from 'vue';
import Vuetify from 'vuetify';

import { mount, createLocalVue } from '@vue/test-utils';

import Project from '@/components/Project.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Project.vue', () => {
  test('renders props when passed', () => {
    const project = {
      id: 0,
      title: 'Test Title',
      image: 'test.png',
      url: '#',
    };
    const wrapper = mount(Project, {
      propsData: { project },
    });

    expect(wrapper.props).toHaveProperty(project.title);
  });
});
