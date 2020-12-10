// 全局混入，用来定义全局方法
import Vue from 'vue'
import { Message } from 'element-ui'

const mixin = {
  methods: {
    // 全局提示
    minxinTips() {
      Message('功能正在开发中')
    },
    // 跳转发布详情
    minxinGoDetail(item) {
      this.$releaseDetail().open(item)
    },
    // 预览图片
    minxinPreviewImg(index, arr) {
      // ImagePreview({
      //   startPosition: index,
      //   images: arr.map(item => filters.filterImg(item))
      // });
    },
  },
}

Vue.mixin(mixin)
