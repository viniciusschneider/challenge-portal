import { IState } from '@/interfaces/state.interface';
import { mount, Wrapper } from '@vue/test-utils';
import { Store } from 'vuex';
import flushPromises from 'flush-promises';
import Login from '@/views/Login.vue';
import loginService, { LoginService } from '@/services/login.service';
import specConfigs from './config';
import { EnumRouteNames } from '@/router';

describe('Login.vue', () => {
  let wrapper: Wrapper<any>;
  let store: Store<IState>;
  let _loginService: LoginService;

  beforeEach(() => {
    _loginService = {
      login: jest.fn(async () => ({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiVmluw61jaXVzIFNjaG5laWRlciIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2NjQyNDYyMjIsImV4cCI6MTY2NjgzODIyMn0.xSVH7g5U4AgJNi_woCJr90Qi8w_xqfco5WXsKGZUZ9k'
      }))
    };
    loginService.login = _loginService.login;
    const { localVue, router, store: _store } = specConfigs;
    store = _store;

    wrapper = mount(Login, {
      attachTo: document.body,
      store: _store,
      localVue,
      router
    });
  });

  it('expect form is invalid', async () => {
    wrapper.find('#email').setValue('admin@admin');
    wrapper.find('#password').setValue('12345678');
    await wrapper.find('#email').trigger('input');
    await wrapper.find('#password').trigger('input');
    await wrapper.find('#btn-submit').trigger('click');
    await flushPromises();
    expect(_loginService.login).not.toHaveBeenCalled();
    expect(store.state.user.user).toBeNull();
  });

  it('expect form is valid', async () => {
    console.log('path', wrapper.vm.$route.path);
    wrapper.find('#email').setValue('admin@admin.com');
    wrapper.find('#password').setValue('12345678');
    await wrapper.find('#email').trigger('input');
    await wrapper.find('#password').trigger('input');
    await wrapper.find('#btn-submit').trigger('click');
    await flushPromises();
    expect(_loginService.login).toHaveBeenCalled();
    expect(store.state.user.user.email).toContain('admin@admin.com');
    expect(wrapper.vm.$route.name).toEqual(EnumRouteNames.TEAMS_LIST);
  });
});
