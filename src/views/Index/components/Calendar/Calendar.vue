<template>
    <div class="Calendar">
        <div class="Calendar-info">

            <span class="arrow leftArrow" @click="clickCalendar('prev')">
                <img src="../../assets/images/leftArrow.png" alt="">
            </span>
            <p class="monthNow">{{displayDateText}}</p>

            <span class="arrow rightArrow" @click="clickCalendar('next')">
                <img src="../../assets/images/rightArrow.png" alt="">
            </span>

        </div>
        <div class="CalendarArea">
            <div class="Calendarweek">
                <span class="week_index" v-for="item in week_Index" :key="item">{{item}}</span>
            </div>
            <div class="calendar-controller" :style="{'height' : isToggleCalendar ? '32px' : allDaysRow === 4 ? '165px' : '200px'}">
                <div class="calendar-controller-area" :style="{'transform': isToggleCalendar ? `translateY(${toggeleCalendarOffsetY}px)` : `translateY(0px)`}">                   
                    <div 
                        v-for="(item, index) in currentMonthDayNum" 
                        :key="index" 
                        class="CalendarNumItem" 
                        :data-index="item"
                        :class="{isSpecialMoneyIndex: specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item)) > -1}"
                        :style="{'opacity': isShowHideTheNum(index, item)}"
                        >

                        <div class="TipsBubble-wrap" v-if="specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item)) === 0">
                            <TipsBubble :num="specialDaysProperty[specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item))].need_num"/>
                        </div>

                        <div 
                            class="CalendarNumItem-wrap" 
                            :style="{ color: item === 0 ? '#fff' : '#666666'}" 
                            :data-date="currentMandY + '-'+ (item < 10 ? '0' + item : item)"
                            :class="[
                            caclStyle(index),
                            { isAwardDays : specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item)) > -1}
                            ]"
                            >
                            <span class="special" v-if="specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item)) > -1 && (specialDaysProperty[specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item))].money !== 0)">
                                <img src="../../assets/images/coin.png" alt="">    
                                <p>+{{ (specialDaysProperty[specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item))].money) / 100}}</p>
                            </span>  
                            <i v-else>
                                <span v-if="getCurrentDayFormServer === currentMandY + '-'+ (item < 10 ? '0' + item : item)">今</span>
                                <span v-else-if="(specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item)) > -1) && (specialDaysProperty[specialDays.indexOf(currentMandY + '-'+ (item < 10 ? '0' + item : item))].money === 0)">
                                     <img @click="touchGift" style="position: relative;top: 1px;width: 16px;" src="../../assets/images/box-small-normal.png" alt="">
                                </span>

                                <span v-else>{{item}}</span>                                
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="calendar-operation-area">
            <div class="calendar-operation-left">
                <div class="hasSign"><i></i>已签到</div>
                <div class="unSign"><i></i>未签到</div>
            </div>
            <div class="operation-calendar-btn" @click="toggleCalendar(true)" v-if="!isToggleCalendar">收起日历</div>
            <div class="operation-calendar-btn" @click="toggleCalendar(false)" v-else>展开日历</div>
        </div>
    </div>
</template>

<script>
import Calendar from './Calendar.js'
export default {
    ...Calendar
}
</script>


<style scoped>
@import url('./Calendar.css');
</style>



