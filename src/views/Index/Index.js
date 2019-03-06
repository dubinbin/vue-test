import Calendar from './components/Calendar/Calendar.vue'
import axios from 'axios'

export default {
    data() {
        return {
            signCalendarInfo: []
        }
    },
    created() {
        this.requestData()
    },
    methods: {
        requestData() {
            const requestUrl = 'https://www.easy-mock.com/mock/591d317c9aba4141cf26a50b/example_1495085436160/api/getCalendar'
            axios.get(requestUrl).then((res) => {
                if (res.data.code === 0) {
                    const calender_data = res.data.data.calender_data
                    const special_days = res.data.data.special_days
                    this.signCalendarInfo = {
                        'calender_data': calender_data,
                        'special_days': special_days
                    }
                }
            })
        },
        changeDate(val) {
            if (val.Year === 2019 && val.Month === 3) {
                this.requestData()
            } else {
                this.signCalendarInfo = {}
            }
        }
    },
    components: {
        Calendar
    }
}