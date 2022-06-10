import gsap from 'gsap';
import moment from 'moment';
import { defineComponent, shallowRef, ref, Transition, TransitionGroup, watch, computed } from 'vue';
import Calendar from './Calendar';
import style from './Calendar.module.scss';
import { onMounted } from 'vue';
import { useSwipe, useThrottleFn } from '@vueuse/core';

const Calendars = defineComponent({
    setup() {
        const datalist = ref<any[]>([])
        const show = ref()

        const calendar = ref<HTMLElement | null>(null)

        const isZip = ref(false)

        const { isSwiping, direction } = useSwipe(calendar)

        const fadeName = computed(() => {
            if (direction.value === 'LEFT') {
                return 'fade-left'
            } else if (direction.value === 'RIGHT') {
                return 'fade-right'
            } else if (direction.value === 'UP') {
                isZip.value = true
                return 
            } else {
                isZip.value = false
            }
        })

        const throttledFn = useThrottleFn(() => {
            if (isSwiping.value) {
                if (direction.value === 'LEFT') {
                    const newDate = show.value.clone().add(1, 'month')
                    const result = datalist.value.find(item => item.format('YYYYMM') === newDate.format('YYYYMM'))
                    if (!result) {
                        datalist.value.push(newDate)
                    }
                    show.value = newDate
                } else if (direction.value === 'RIGHT') {
                    const newDate = show.value.clone().add(-1, 'month')
                    const result = datalist.value.find(item => item.format('YYYYMM') === newDate.format('YYYYMM'))
                    if (!result) {
                        datalist.value.push(newDate)
                    }
                    show.value = newDate
                } else {

                }
            }
        }, 200)

        watch(() => isSwiping.value, () => {
            throttledFn()
        }, { deep: true })

        onMounted(() => {
            datalist.value.push(moment())
            show.value = datalist.value[0]
        })

        return () => (
            <div class={[style.container,isZip.value ? '' :style.unzip]}>
                <div class={[style.main,isZip.value ? style.fade_up : style.fade_down]} ref={calendar} >
                    <TransitionGroup
                        name={fadeName.value}
                        appear
                    >
                        {datalist.value.filter((item) => item.format('YYYYMM') === (show.value.format('YYYYMM'))).map((item) => (
                            <Calendar currentTime={item} key={item.format('YYYYMM')} isZip={isZip.value}></Calendar>
                        ))}
                    </TransitionGroup>
                </div>

            </div >
        )
    }
})

export default Calendars