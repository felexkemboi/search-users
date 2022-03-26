import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';
import NavBar from '../../src/components/NavBar.vue';
import Users from '../../src/views/Users.vue';
import router from '../../src/router/index';

describe('App.vue', () => {
  it('Navbar component\'s exist', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findComponent(NavBar).exists()).toBe(true);
  });
});

describe('Users.vue', () => {
  it('Renders the title when created!', () => {
    const wrapper = shallowMount(Users);
    expect(wrapper.text()).toMatch('Search Github users');
  });
});
