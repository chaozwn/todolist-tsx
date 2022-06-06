import { defineComponent, onMounted } from "vue";
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue'
import style from './OpenApp.module.scss'
import { useRouter } from "vue-router";

const OpenApp = defineComponent({
    setup() {
        const router = useRouter()
        onMounted(() => {
            setTimeout(() =>{ 
                router.replace('/login')
            }, 3000)
        })

        return () => (
            <div class={style.container}>
                <h2 class={style.title}>
                    <SvgIcon name="ontime" className='openapp-ontime'></SvgIcon>
                </h2>
            </div>
        )
    }
})

export default OpenApp;