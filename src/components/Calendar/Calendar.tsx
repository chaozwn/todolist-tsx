import moment, { now } from 'moment';
import { computed, defineComponent, ref, Transition, watch, watchEffect } from 'vue';
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
    setup(props, { emit, slots }) {
        const week = ref(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])
        const currentTime = ref(moment())
        const now = ref()
        const isOutLineList = ref<string[]>(['22', '28'])
        const calendar = ref<HTMLElement | null>(null)
        const show = ref(true)

        const { isSwiping, direction } = useSwipe(calendar)

        const throttledFn = useThrottleFn(() => {
            if (isSwiping.value) {
                if (direction.value === 'LEFT') {
                    changeMonth('1')
                    show.value = false
                } else if (direction.value === 'RIGHT') {
                    changeMonth('-1')
                } else {

                }
            }
        }, 200)

        watch(() => isSwiping.value, () => {
            throttledFn()
        }, { deep: true })

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
            now.value = moment().format('YYYYMMDD')
        })

        return () => (
            <div class={style.main}>
                <Transition enterFromClass={style.slide_fade_enter_from}
                    enterActiveClass={style.slide_fade_enter_active}
                    leaveToClass={style.slide_fade_leave_to}
                    leaveActiveClass={style.slide_fade_leave_active}>
                    {show &&
                        <div class={style.container} ref={calendar}>
                            <header class={style.title}>{calenderTitle.value}</header>
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
                    }
                </Transition>
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
