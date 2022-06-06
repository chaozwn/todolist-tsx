
import { defineComponent } from 'vue';
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue';
import style from './Login.module.scss';
import { useRouter } from 'vue-router';

const Login = defineComponent({
    setup() {
        const router = useRouter()
        
        const handleOnClick = () => {
            router.replace('/schedule')
        }

        return () => (
            <div class={style.container}>
                <div class={style.title}>
                    <SvgIcon name='ontime' className='login-ontime'></SvgIcon>
                </div>
                <p class={style.description}>Make yourself more on time</p>
                <button class={style.start} onClick={handleOnClick}>START</button>
            </div>
        )
    }
})

export default Login;