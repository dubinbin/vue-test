import { mount } from '@vue/test-utils'
import ParentComponent from '@/views/Calendar/Calendar.vue'

describe('ParentComponent', () => {
    it("test", () => {
        const wrapper = mount(ParentComponent)
        wrapper.find('.change').trigger('click')
        expect(wrapper.vm.date).toBe('3月9号')
    })
})