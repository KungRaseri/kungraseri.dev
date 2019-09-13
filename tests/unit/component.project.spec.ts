import Vuetify from 'vuetify';

import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';

import Project from '@/components/Project.vue';

const localVue = createLocalVue();
localVue.component('router-link', RouterLinkStub);
localVue.use(Vuetify);

const mountFunction = (options: any) => {
  return shallowMount(Project, {
    localVue,
    Vuetify,
    ...options,
  });
};

describe('Project.vue', () => {
  const project = {
    id: 0,
    title: 'Test Title',
    image: 'test.png',
    url: '#',
    description: 'Test Description',
  };

  const wrapper = mountFunction({ propsData: { project } });

  it('wrapper html matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('wrapper element text contains expected project title', () => {
    expect(wrapper.find('#project-0').text().toLowerCase()).toContain(`${project.title.toLowerCase()}`);
  });
});
