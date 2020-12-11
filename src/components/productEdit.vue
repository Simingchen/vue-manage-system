/* *
 名称：添加账单组件
 引用：
*/
<template>
  <el-dialog v-el-drag-dialog :visible.sync="mutableShow" :close-on-click-modal="false" :before-close="close" class="bill-add" title="添加产品" width="800px" append-to-body>
    <el-form v-if="mutableShow" ref="ruleForm" :model="ruleForm" :rules="rules" inline label-position="right" label-width="90px">
      <el-form-item label="产品名称:" size="mini" prop="customer">
        <el-input v-model="ruleForm.customer" placeholder="请输入客户名称" class="w235" size="mini" clearable />
      </el-form-item>
      <el-form-item label="商品名称:" size="mini" class="dpb" prop="commodity">
        <el-input v-model="ruleForm.commodity" placeholder="请输入商品名称" class="w235" size="mini" clearable />
      </el-form-item>
      <el-form-item label="费用期间:" size="mini" prop="period">
        <el-date-picker v-model="ruleForm.period" type="daterange" class="w235" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="支付期限:" size="mini" prop="endDate">
        <el-date-picker v-model="ruleForm.endDate" type="date" class="w235" range-separator="至" placeholder="请选择支付期限" />
      </el-form-item>
      <el-form-item label="优惠折扣:" size="mini">
        <el-input v-model="ruleForm.discount" placeholder="请输入优惠折扣 (单位：%)" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2" class="w235" size="mini" clearable />
      </el-form-item>
      <el-form-item label="抵减:" size="mini">
        <el-input v-model="ruleForm.deduction" placeholder="请输入抵减" class="w235" oninput="value=value.replace(/[^\d]/g,'')" size="mini" clearable />
      </el-form-item>
      <el-form-item label="实际支付:" size="mini">
        <el-input v-model="ruleForm.amount" placeholder="请输入实际支付" oninput="value=value.replace(/[^\d]/g,'')" class="w235" size="mini" clearable />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="save('ruleForm')">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  directives: { elDragDialog },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mutableShow: this.show,
      ruleForm: {
        order: "",
        customer: null,
        commodity: "",
        period: "",
        endDate: "",
        discount: "",
        deduction: "",
        amount: ""
      },
      payList: [],
      pay: {
        name: "",
        amount: ""
      },
      rules: {
        order: [{ required: true, message: "请输入订单", trigger: "blur" }],
        customer: [{ required: true, message: "请输入客户", trigger: "blur" }],
        commodity: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        period: [
          { required: true, message: "请选择费用期间", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择支付期限", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open() {
      this.mutableShow = true;
      this.$emit("open", this);
    },
    close() {
      this.mutableShow = false;
      this.$emit("close", this);
    },
    addPayCol() {
      const pay = this.pay;
      if (pay.name === "" || !pay.amount) {
        return false;
      }
      const tempItem = {
        name: pay.name,
        amount: pay.amount
      };
      this.payList.push(tempItem);
      // 清空
      Object.keys(pay).forEach(item => {
        pay[item] = "";
      });
    },
    // 删除费用
    deletePay(row) {
      this.$confirm("是否删除该费用项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.payList.splice(this.payList.indexOf(row), 1);
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消退回'
          // })
        });
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const par = {
            cust_id: 0,
            agency_id: 0,
            customer_linkname: this.ruleForm.customer_linkname,
            legal_person_phone: this.ruleForm.customer_phone,
            cust_name: this.ruleForm.customer_name
          };
          this.$emit("save", par);

          // apiBillAdd(par).then(res => {
          //   const response = res.data;
          //   const resData = response;
          //   if (response.code === "0") {
          //     this.bill = resData.data;
          //   }
          // });
          // apiBillAdd
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.w235 {
  width: 235px !important;
}
</style>
