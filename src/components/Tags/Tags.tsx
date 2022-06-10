import { defineComponent } from 'vue';
import style from './Tags.module.scss';

const Tags = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required: true
        }
    },
    emits: ['update:selected'],
    setup(props, { emit, slots }) {
        return () => {
            const tags = slots.default?.()
        
            if (!tags) {
                return () => null
            }
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].type !== Tag) {
                    throw new Error('<Tags> only accepts <Tag> as children')
                }
            }

            return (
                <div class={style.container}>
                    <ol class={style.tags}>
                        {tags.map(tag => (
                            <li class={props.selected === tag.props?.name ? style.selected : ''}
                                onClick={() => {
                                    emit('update:selected', tag.props?.name)
                                }}
                                >{tag.props?.name}</li>
                        ))}
                    </ol>
                    <div class={style.tags_container}>
                        {tags.find(item => item.props?.name === props.selected)}
                    </div>
                </div>
            )
        }
    }
})

export const Tag = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props, { slots }) {
        return () => (
            <>
                {slots.default?.()}
            </>
        )
    }
})

export default Tags;