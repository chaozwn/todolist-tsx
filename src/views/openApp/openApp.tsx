import { defineComponent } from "vue";
import style from './openApp.module.scss'

const openApp = defineComponent({
    setup() {
        return () => (
            <div class={style.container}>Hello</div>
        )
    }
})

export default openApp;