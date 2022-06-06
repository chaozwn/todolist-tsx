<template>
  <svg aria-hidden="true" :class="iconClass">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#333',
      },
      className: {
        type: String,
      },
    },
    setup(props) {
      const iconClass = computed(() => {
        if (props.className) {
          return 'svg-icon-' + props.className;
        } else {
          return 'svg-icon';
        }
      });
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);
      return { symbolId, iconClass };
    },
  });
</script>
