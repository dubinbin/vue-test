import TipsBubble from '../TipsBubble.vue'

export default {
    props: {
        signCalendar: {
            tpye: Array
        },
        specials_days: {
            type: Array
        },
        getCurrentDayFormServer: {
            type: String
        },
        isFirstEnter: {
            type: Boolean
        }
    },
    data() {
        return {
             currentMonthDayNum: [],
             displayDateText: '',
             currentDaySelectIndex: '',
             currentYear: 0, 
             currentMonth: 0,
             trueCurrentYear: 0,
             trueCurrentMonth: 0,
             ifToggleCalendarArr: [],
             opacityHandle: false,
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
        'currentMonth'(oldVal, newVal) {
            if(newVal !== oldVal) {
               this.displayDateText = `${this.currentYear}年${this.currentMonth}月`
               this.currentMandY = `${this.currentYear}-${this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth}`
               this.handleNewCalendarData(this.currentYear, this.currentMonth)
               this.punchRecord.length = 0
            }
        },
        'signCalendar'(oldVal, newVal) {
            if (oldVal) {
                let emptySingle = '0'
                const index = this.currentMonthDayNum.indexOf(1)
                let CopyEmptyData = emptySingle.repeat(index)
                this.punchRecord = CopyEmptyData.split('').concat(oldVal)
            } else{
                this.punchRecord.length = 0
            }
        },
        'specials_days': function(newVal) {
             if (newVal) {
                newVal.map((v) => {
                    const property = {
                        money: v.money,
                        need_num: v.need_num
                    }
                    this.specialDaysProperty.push(property)
                    this.specialDays.push(v.days)
                })
             }
        },
        'isFirstEnter':function(newVal) {
            if (newVal === false ) {
                this.toggleCalendar(true)
            }
        }
    },
    methods: {

        initCalendar() {
            const dateNow = new Date()
            const yearsNow = dateNow.getFullYear()
            const monthNow = dateNow.getMonth() + 1  
            this.handleNewCalendarData(yearsNow, monthNow)
            this.currentYear = yearsNow
            this.currentMonth = monthNow
            this.trueCurrentYear = yearsNow
            this.trueCurrentMonth = monthNow
            this.displayDateText = `${this.currentYear}年${this.currentMonth}月`
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
            for (let i = 1; i <= getMonthAllNum; i++ ) {
                this.currentMonthDayNum.push(i)
            }
            let emptySingle = '0'
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

        touchGift() {
            this.$emit('touchGift', true)
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

        caclStyle(index) {
            if (this.punchRecord) {
                if (this.punchRecord[index] === 1) {
                     return 'isSign' 
                } else if (this.punchRecord[index] === 0){
                     return 'isUnSign'
                }
            } else {
                return ''
            }
        }
    },
    components: {
        TipsBubble
    }
}