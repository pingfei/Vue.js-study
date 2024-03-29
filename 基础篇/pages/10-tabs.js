Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <!-- 标签页标题，这里要用v-for -->
        <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">{{item.label}}</div>
      </div>
      <div class="tabs-content">
        <!-- // 这里的slot就是嵌套pane -->
        <slot></slot>
      </div>
    </div>
  `,
  props: {
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return ['tabs-tab', {'tabs-tab-active': item.name === this.currentValue}]
    },
    getTabs () {
      return this.$children.filter((item) => {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) {pane.name = index}
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus () {
      var tabs = this.getTabs()
      tabs.forEach((tab) => {
        return tab.show = tab.name === this.currentValue
      })
    },
    handleChange (index) {
      var nav = this.navList[index]
      var name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('on-click', name)
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue () {
      this.updateStatus()
    }
  }
})