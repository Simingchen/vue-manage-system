// 引导操作组件
<template>
  <div></div>
</template>

<script>
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
const steps = [
  {
    element: "#hamburger-container",
    popover: {
      title: "汉堡包",
      description: "点击收缩和展开菜单导航",
      position: "bottom"
    }
  },
  {
    element: "#breadcrumb-container",
    popover: {
      title: "面包屑导航",
      description: "用于显示当前导航菜单的位置",
      position: "bottom"
    }
  },
  {
    element: "#header-search",
    popover: {
      title: "查找页面",
      description: "查找页面，快速定位",
      position: "left"
    }
  },
  {
    element: "#screenfull",
    popover: {
      title: "全屏",
      description: "设置页面全屏模式",
      position: "left"
    }
  },
  {
    element: "#tags-view-container",
    popover: {
      title: "最近打开任务",
      description: "最近打开任务菜单，点击可快速切换",
      position: "bottom"
    },
    padding: 0
  }
];

export default {
  name: "Guide",
  data() {
    return {
      driver: null
    };
  },
  methods: {
    open() {
      const isFirstLogin = localStorage.isFirstLogin || "";
      if (!isFirstLogin) {
        this.driver = new Driver({
          allowClose: false, //禁止点击外部关闭
          doneBtnText: "完成", // 完成按钮标题
          closeBtnText: "关闭", // 关闭按钮标题
          stageBackground: "#fff", // 引导对话的背景色
          nextBtnText: "下一步", // 下一步按钮标题
          prevBtnText: "上一步", // 上一步按钮标题
          onClose: () => {
            console.log("asdfgh");
          }
        });
        this.driver.defineSteps(steps);
        this.driver.start();
      }

      localStorage.isFirstLogin = 1;
    }
  }
};
</script>
