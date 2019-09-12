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
  it('renders props when passed', () => {
    const project = {
      id: 0,
      title: 'Test Title',
      image: 'test.png',
      url: '#',
      description: 'Test Description',
    };
    const wrapper = mountFunction({ propsData: { project } });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('#project-0').text().toLowerCase()).toContain(`${project.title.toLowerCase()}`);
  });
});
