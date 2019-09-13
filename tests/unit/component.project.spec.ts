import Vuetify from 'vuetify';

import { mount, createLocalVue } from '@vue/test-utils';

import Project from '@/components/Project.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Project.vue', () => {
  const mountFunction = (options: any) => {
    return mount(Project, {
      localVue,
      Vuetify,
      ...options,
    });
  };

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
