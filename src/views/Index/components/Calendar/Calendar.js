import TipsBubble from '../TipsBubble.vue'

export default {
    props: {
        signCalendarInfo: {
            tpye: Object
        },
        getCurrentDayFormServer: {
            type: String
        }
    },
    data() {
        return {
             currentMonthDayNum: [],
             currentNewObjArr: [],
             thisMonthFirstDay: 0,
             displayDateText: '',
             currentDaySelectIndex: '',
             currentYear: 0, 
             currentMonth: 0,
             
             trueCurrentYear: 0,
             trueCurrentMonth: 0,

             ifToggleCalendarArr: [],
             isToggleCalendar: false,
             currentMandY: '',
             specialDays: [],
             specialDaysProperty: [],
             week_Index: ['日', '一', '二', '三', '四', '五', '六'],
             toggeleCalendarOffsetY: 0,
             punchToday: false,
             allDaysRow: 0,
             punchRecord: []
        }

    },
    created() {
        this.initCalendar()
    },
    watch: {
        'signCalendarInfo'(oldVal, newVal) {
            this.currentNewObjArr = this.currentMonthDayNum.concat();
            if (Object.getOwnPropertyNames(oldVal).length > 1) {
                const special_daysToArr = Object.entries(oldVal.special_days)
                const calender_dataToArr = Object.entries(oldVal.calender_data)
 
                if (special_daysToArr.length > 0) {
                    for (let i = 0; i<special_daysToArr.length; i++) {
                        const index = this.currentMonthDayNum[(new Date(special_daysToArr[i][0]).getDate() + this.thisMonthFirstDay)]
                        this.currentNewObjArr[index - 2 + this.thisMonthFirstDay] = {
                            type: 'special',
                            day: this.currentNewObjArr[index - 2 + this.thisMonthFirstDay],
                            info: special_daysToArr[i][1]
                        }
                    }
                }

                if (calender_dataToArr.length > 0) {
                    for (let j = 0; j < calender_dataToArr.length; j++) {
                        const index = this.currentMonthDayNum[(new Date(calender_dataToArr[j][0]).getDate() + this.thisMonthFirstDay)]
                        this.currentNewObjArr[(index - 2 + this.thisMonthFirstDay)] = {
                            type: 'hasRecord',
                            day: this.currentNewObjArr[index - 2 + this.thisMonthFirstDay],
                            isSign: calender_dataToArr[j][1]
                        }
                    }
                }
            }
        },
        'currentMonth'(oldVal, newVal) {
            if(newVal !== oldVal) {
               this.displayDateText = `${this.currentYear}年${this.currentMonth}月`
               this.currentMandY = `${this.currentYear}-${this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth}`
               this.handleNewCalendarData(this.currentYear, this.currentMonth)
               this.punchRecord.length = 0
            }
        }
    },
    methods: {

        initCalendar() {
            const dateNow = new Date()
            const yearsNow = dateNow.getFullYear()
            const monthNow = dateNow.getMonth() + 1  
            this.currentYear = yearsNow
            this.currentMonth = monthNow
            this.trueCurrentYear = yearsNow
            this.trueCurrentMonth = monthNow
            this.displayDateText = `${this.currentYear}年${this.currentMonth}月`
            this.handleNewCalendarData(yearsNow, monthNow)
        },

        calcMonthFirstDay(year, month) {
            const firstDay = new Date(year, month - 1, 1)
            return firstDay.getDay()
        },
        
        calcCurrentMonth(year, month) {
            const date = new Date(year, month, 0)
            const days = date.getDate()
            return days
        },

        handleNewCalendarData(year, month) {
            this.currentMonthDayNum.length = 0
            const getMonthAllNum = this.calcCurrentMonth(2019, month)
            const getFirstDay = this.calcMonthFirstDay(year, month)
            this.thisMonthFirstDay = getFirstDay
            for (let i = 1; i <= getMonthAllNum; i++ ) {
                this.currentMonthDayNum.push(i)
            }
            let emptySingle = 'x'
            let CopyEmptyData = emptySingle.repeat(getFirstDay)
            this.currentMonthDayNum = CopyEmptyData.split('').concat(this.currentMonthDayNum)
            this.allDaysRow = this.currentMonthDayNum.length / 7 > parseInt(this.currentMonthDayNum.length / 7) ? parseInt(this.currentMonthDayNum.length / 7) : parseInt(this.currentMonthDayNum.length / 7) -  1
            this.calcCalendarShowArea()
        },

        calcCalendarShowArea() {
            const dateNow = new Date()
            const getTodayToNum = dateNow.getDate()
            const TodayNumIndexOfThisMonth = this.currentMonthDayNum.indexOf(getTodayToNum)
            const DayRow = parseInt(TodayNumIndexOfThisMonth / 7)
            this.toggeleCalendarOffsetY = -35 * DayRow
            this.ifToggleCalendarArr = [(DayRow * 7) , (DayRow * 7) + 6]
            if (this.trueCurrentYear === this.currentYear && this.trueCurrentMonth === this.currentMonth) {
                 this.currentDaySelectIndex = TodayNumIndexOfThisMonth
            }
        },

        toggleCalendar(val) {
            if (val === true) {
               this.isToggleCalendar = true
            } else {
                this.isToggleCalendar = false
            }
        },

        isShowHideTheNum(index, item) {
            const distance = this.ifToggleCalendarArr
            if (index >= distance[0] && index <= distance[1] && this.isToggleCalendar && item !== '0') {
                return 1
            } else if (!this.isToggleCalendar && item !== '0') {
                return 1
            } else {
                return 0
            }
        },
        
        clickCalendar(val) {
            if (val === 'prev') {
                if (this.currentMonth === 1) {
                    this.currentYear -= 1
                    this.currentMonth = 12
                } else {
                    this.currentMonth -= 1
                }
            } else {
                if (this.currentMonth === 12) {
                    this.currentYear += 1
                    this.currentMonth = 1
                } else {
                    this.currentMonth += 1
                }
            }
            const changeDate = {
                Month: this.currentMonth,
                Year: this.currentYear
            }
            this.$emit('changeDate', changeDate)
        },
    },
    components: {
        TipsBubble
    }
}