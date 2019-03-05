import Vue from 'vue'
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {

  const wrapper = mount(HelloWorld)

  // console.log(wrapper.html())
    // const Constructor = Vue.extend(HelloWorld)
    // const vm = new Constructor().$mount()
    it('renders the correct markup', () => {
      expect(wrapper.html()).toContain('<span class="count">0</span>')
    })
  
    // it's also easy to check for the existence of elements
    it('has a button', () => {
      expect(wrapper.contains('button')).toBe(true)
    })
  
    it('button should increment the count', () => {
      expect(wrapper.vm.count).toBe(0)
      const button = wrapper.find('button')
      button.trigger('click')
      expect(wrapper.vm.count).toBe(1)
    })
})
