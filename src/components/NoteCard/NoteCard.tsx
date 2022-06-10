
import { defineComponent, reactive } from 'vue';
import style from './NoteCard.module.scss'
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue';


export interface NoteCardItem {
    content: string;
    date: string;
    isNote: boolean;
}

const NoteCard = defineComponent({
    props: {
        noteCardItem: {
            type: Object as PropType<NoteCardItem>,
            required: true
        }
    },
    setup(props, context) {
        return () => (
            <div class={style.notecard__container}>
                <p class={style.notecard__container__content}>{props.noteCardItem.content}</p>
                <div class={style.notecard__container__footer}>
                    <div class={style.notecard__container__footer__left}>{props.noteCardItem.date}</div>
                    {props.noteCardItem.isNote && (
                        <SvgIcon name='note' className={'note-note'}></SvgIcon>
                    )}
                </div>
            </div>
        )
    }
})

export default NoteCard;