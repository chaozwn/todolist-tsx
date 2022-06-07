import moment, { now } from 'moment';
import { computed, defineComponent, reactive, ref, Transition, TransitionGroup, watch, watchEffect, toRefs } from 'vue';
import { onMounted } from 'vue';
import { getDateListByTime } from "/@/utils/DateUtils";
import style from './Calendar.module.scss';
import { useDebounce, useDebounceFn, useSwipe, useThrottleFn } from '@vueuse/core';

interface CalenderListItem {
    day: string,
    month: string,
    isCurrentMonth: boolean,
    year: string,
    timeStr: string
}

const Calendar = defineComponent({
    props: {
        currentTime: {
            type: Object as PropType<any>,
            required: true
        }
    },
    setup(props, { emit, slots }) {
        const { currentTime } = toRefs(props)

        const week = ref(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])

        const now = ref()
        const isOutLineList = ref<string[]>(['22', '28'])

        const getColor = (index, isCurrentMonth) => {
            if (!isCurrentMonth) {
                return 'gray'
            }
            if (index % 7 === 0) {
                return 'red'
            }
            return 'white'
        }

        const calenderList = computed(() => {
            return getDateListByTime(currentTime.value.format('YYYY-MM') + `-01`)
        })

        const calenderTitle = computed(() => {
            return currentTime.value.format('MMMM') + ' ' + currentTime.value.format('YYYY')
        })

        const changeMonth = (num: string) => {
            currentTime.value = currentTime.value.add(num, 'month').clone()
        }

        onMounted(() => {
            // calendarList.value = timeList.value.map(item => {
            //     const time_item = moment(item)
            //     const calenderList = getDateListByTime(item + `-01`)
            //     const calenderTitle = time_item.format('MMMM') + ' ' + time_item.format('YYYY')
            //     return {
            //         calenderList,
            //         calenderTitle
            //     }
            // })
            now.value = moment().format('YYYYMMDD')
        })

        return () => (
            <div class={style.container}>
                <div class={style.title}>{calenderTitle.value}</div>
                <div class={style.item}>
                    {
                        week.value.map((item, index) => (
                            <CalendarItem key={item + index} name={item}
                                color={index === 0 ? 'red' : 'white'}></CalendarItem>
                        ))
                    }
                    {
                        calenderList.value.map((item, index) => (
                            <CalendarItem key={item.day + index}
                                name={item.day} color={getColor(index, item.isCurrentMonth)}
                                isCurrentDay={item.timeStr === now.value && item.isCurrentMonth}
                                isOutLine={isOutLineList.value.includes(item.day)}
                            ></CalendarItem>
                        ))
                    }
                </div>
            </div>
        )
    }
})

const CalendarItem = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
        color: {
            type: String as PropType<'red' | 'gray' | 'white'>,
            default: 'white',
        },
        isCurrentDay: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        isOutLine: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup(props, context) {
        return () => (
            <div class={[style[props.color]]}>
                <span class={[props.isCurrentDay ? style.currentDay : '',
                props.isOutLine ? style.isOutLine : '']}>{props.name}</span>
            </div>
        )
    }
})

export default Calendar;
