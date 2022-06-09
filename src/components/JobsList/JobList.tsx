
import { defineComponent } from 'vue';
import style from './JobList.module.scss'
import SvgIcon from '/@/components/SvgIcon/SvgIcon.vue';

interface JobItem {
    day: string;
    jobDetails: JobDetail[]
}

interface JobDetail {
    Title: string;
    Time: string;
    Place: string;
    Notes: string;
    Done: boolean;
}

const JobList = defineComponent({
    setup() {
        const jobItems: JobItem[] = [{
            day: '22',
            jobDetails: [
                {
                    Title: 'Meeting with Anomali Team',
                    Time: '07.00 am - 10.00 am',
                    Place: 'Anomali Office',
                    Notes: 'Nothing',
                    Done: true
                },
                {
                    Title: 'Meeting with Anomali Team',
                    Time: '07.00 am - 10.00 am',
                    Place: 'Anomali Office',
                    Notes: 'Nothing',
                    Done: false
                }
            ]
        }, {
            day: '21',
            jobDetails: [
                {
                    Title: 'Meeting with Anomali Team',
                    Time: '07.00 am - 10.00 am',
                    Place: 'Anomali Office',
                    Notes: 'Nothing',
                    Done: true
                },
                {
                    Title: 'Meeting with Anomali Team',
                    Time: '07.00 am - 10.00 am',
                    Place: 'Anomali Office',
                    Notes: 'Nothing',
                    Done: false
                }
            ]
        }]
        return () => (
            <div class={style.jobcontainer}>
                {jobItems.map(jobItem => (
                    <Job jobItem={jobItem} key={jobItem.day}/>
                ))}
            </div>
        )
    }
})


const Job = defineComponent({
    props: {
        jobItem: {
            type: Object as PropType<JobItem>
        }
    },
    setup(props, { emit, slots }) {
        return () => (
            <div class={style.container}>
                <div class={style.left}>
                    <div class={style.day}>{props.jobItem?.day}</div>
                    <div class={style.line}></div>
                </div>
                <div class={style.right}>
                    {props.jobItem?.jobDetails.map(item => (
                        <div class={style.main}>
                            <div class={style.header}>
                                <div class={style.title}>
                                    {item.Title}
                                </div>
                                <div class={style.icon}>
                                    <SvgIcon name="gou" className='gou'></SvgIcon>
                                </div>
                            </div>
                            <div class={style.section}>
                                <div><span>Time</span><span>{item.Time}</span></div>
                                <div><span>Place</span><span>{item.Place}</span></div>
                                <div><span>Notes</span><span>{item.Notes}</span></div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
})

export default JobList;