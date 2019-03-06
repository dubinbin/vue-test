import { mount } from '@vue/test-utils'
import Calendar from '@/views/Index/components/Calendar/Calendar.vue'

describe('Calendar', () => { 
    const wrapper = mount(Calendar)
    it('click the close calendar', () => {
       wrapper.find('.operation-calendar-close').trigger('click')
       expect(wrapper.vm.isToggleCalendar).toBe(true)
       expect(wrapper.find('.calendar-controller').html()).toBe('<div class="calendar-controller" style="height: 40px;"><div class="calendar-controller-area" style="transform: translateY(-35px);"></div></div>')
    })
    it('click the open calendar', () => {
        wrapper.find('.operation-calendar-open').trigger('click')
        expect(wrapper.vm.isToggleCalendar).toBe(false)
        expect(wrapper.find('.calendar-controller').html()).toBe('<div class="calendar-controller" style="height: 212px;"><div class="calendar-controller-area" style="transform: translateY(0px);"></div></div>')
     })
     it('click the next mouth', () => {
         wrapper.setData({ currentMonth: 3})
         wrapper.find('.rightArrow').trigger('click')
         expect(wrapper.vm.currentMonth).toBe(4)
     })
     it('click the next mouth', () => {
        wrapper.setData({ currentMonth: 12, currentYear: 2018})
        wrapper.find('.rightArrow').trigger('click')
        expect(wrapper.vm.currentMonth).toBe(1)
        expect(wrapper.vm.currentYear).toBe(2019)
        expect(wrapper.find('.monthNow').text('2019年1月'))
    })
    it('click the prev mouth', () => {
        wrapper.setData({ currentMonth: 1, currentYear: 2019})
        wrapper.find('.leftArrow').trigger('click')
        expect(wrapper.vm.currentMonth).toBe(12)
        expect(wrapper.vm.currentYear).toBe(2018)
        expect(wrapper.find('.monthNow').text('2018年12月'))
    })
})