import Calendar from './components/Calendar/Calendar.vue'
import axios from 'axios'

export default {
    created() {
        const requestUrl = 'https://www.easy-mock.com/mock/591d317c9aba4141cf26a50b/example_1495085436160/api/getCalendar'
        axios.get(requestUrl).then((res) => {
            if (res.data.code === 0) {
                const calender_data = res.data.data.calender_data
                const expanded = res.data.data.expanded
                const specialsInfo = res.data.data.special_days
            }
        })
    },
    components: {
        Calendar
    }
}