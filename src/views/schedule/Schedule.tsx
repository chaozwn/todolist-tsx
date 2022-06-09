
import { defineComponent, ref } from 'vue';
import PageHeader from '/@/components/PageHeader/PageHeader';
import style from './Schedule.module.scss';
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue';
import Tags, { Tag } from '/@/components/Tags/Tags';
import { useMouse } from '@vueuse/core';
import Calendars from '/@/components/Calendar/Calendars';
import JobList from '/@/components/JobsList/JobList';

const Schedule = defineComponent({
    setup() {
        const selected = ref<string>('Schedule')
        const { x, y } = useMouse()
        console.log(x, y);

        return () => (
            <div class={style.container} onTouchmove={(e) => e.preventDefault()}>
                <PageHeader class={style.pageHeader}>
                    {{
                        left: () => (
                            <div>
                                <SvgIcon name='ontime' className={'schedule-ontime'}></SvgIcon>
                            </div>
                        ),
                        right: () => (
                            <div>
                                <SvgIcon name='notifydata' className={'schedule-notifydata'}></SvgIcon>
                                <SvgIcon name='more' className={'schedule-more'}></SvgIcon>
                            </div>
                        )
                    }}
                </PageHeader>
                <Tags class={style.tags} v-model:selected={selected.value}>
                    <Tag name='Schedule' key="Schedule">{{
                        default: () => (
                            <>
                                <div class={style.calendar}>
                                     <Calendars />
                                </div>
                                <h2 class={style.schedule}>Schedule</h2>
                                <JobList></JobList>
                            </>
                        )
                    }}</Tag>
                    <Tag name='Note' key='Note'>{{
                        default: () => (
                            <div>
                                <div>x: {x.value}</div>
                                <div>y: {y.value}</div>
                            </div>
                        )
                    }}</Tag>
                </Tags>

            </div>
        )
    }
})

export default Schedule;