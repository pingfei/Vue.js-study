Vue.component('pane', {
  template: `
    <div class="pane" v-show="show">
      <slot></slot>
    </div>
  `,
  name: 'pane',
  data () {
    return {
      show: true
    }
  },
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    label () {
      this.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  }
})