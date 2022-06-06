import { defineComponent } from 'vue';
import style from './PageHeader.module.scss'

const PageHeader = defineComponent({
    setup(props, { slots, emit }) {
        return () => (
            <div class={style.container}>
                {slots.left && <div>
                    {slots.left?.()}
                </div>}
                {slots.right && <div>
                    {slots.right?.()}
                </div>}
            </div>
        )
    }
})

export default PageHeader