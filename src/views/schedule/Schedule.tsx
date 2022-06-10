
import { defineComponent, ref } from 'vue';
import PageHeader from '/@/components/PageHeader/PageHeader';
import style from './Schedule.module.scss';
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue';
import Tags, { Tag } from '/@/components/Tags/Tags';
import { useMouse } from '@vueuse/core';
import Calendars from '/@/components/Calendar/Calendars';
import JobList from '/@/components/JobsList/JobList';
import NoteCard, { NoteCardItem } from '/@/components/NoteCard/NoteCard';

const Schedule = defineComponent({
    setup() {
        const selected = ref<string>('Note')
        const noteCardItems = ref<NoteCardItem[]>([
            {
                content: `this morning's meeting, we have to improve the quality of office facilities and another...
                `,
                date: '28/10/2012',
                isNote: true
            },
            {
                content: `need for this month:\n-clothes\n-snack...`,
                date: '28/10/2012',
                isNote: false
            },
            {
                content: `Message from Liam: \nDon't forget to complete assignments on Tuesday
                `,
                date: '28/10/2012',
                isNote: false
            },
            {
                content: `this morning's meeting, we have to improve the quality of office facilities and another...
                `,
                date: '28/10/2012',
                isNote: true
            },
            {
                content: `need for this month:\n-clothes\n-snack...`,
                date: '28/10/2012',
                isNote: false
            },
            {
                content: `Message from Liam: \nDon't forget to complete assignments on Tuesday
                `,
                date: '28/10/2012',
                isNote: false
            },
            {
                content: `this morning's meeting, we have to improve the quality of office facilities and another...
                `,
                date: '28/10/2012',
                isNote: true
            },
            {
                content: `need for this month:\n-clothes\n-snack...`,
                date: '28/10/2012',
                isNote: false
            },
            {
                content: `Message from Liam: \nDon't forget to complete assignments on Tuesday
                `,
                date: '28/10/2012',
                isNote: false
            }
        ])

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
                            <div class={style.schedule_main}>
                                <div class={style.calendar}>
                                    <Calendars />
                                </div>
                                <h2 class={style.schedule}>Schedule</h2>
                                <JobList class={style.joblist}></JobList>
                            </div>
                        )
                    }}</Tag>
                    <Tag name='Note' key='Note'>{{
                        default: () => (
                            <div class={style.note__container}>
                               <div class={style.note__container__header}>
                                    <SvgIcon name='search' className={'note-search'}></SvgIcon>
                                    <input type="text" placeholder='Search Note' class={style.note__container__header__input}/>
                               </div>
                               <div class={style.note__container__section}>
                                  {
                                      noteCardItems.value.map(item => (
                                        <NoteCard noteCardItem={item}/>
                                      ))
                                  }
                               </div>
                            </div>
                        )
                    }}</Tag>
                </Tags>

            </div>
        )
    }
})

export default Schedule;