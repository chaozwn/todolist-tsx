
import { defineComponent, ref } from 'vue';
import PageHeader from '/@/components/PageHeader/PageHeader';
import style from './Schedule.module.scss';
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue';
import Tags, { Tag } from '/@/components/Tags/Tags';
import Calendar from '/@/components/Calendar/Calendar';
import { useMouse } from '@vueuse/core';

const Schedule = defineComponent({
    setup() {
        const selected = ref<string>('Schedule')
        const { x, y } = useMouse()
        console.log(x,y);
        
        return () => (
            <div class={style.container}>
                <PageHeader>
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
                            <Calendar />
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