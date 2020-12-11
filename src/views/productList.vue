<template>
  <div>
    <!-- 过滤条件 -->
    <filterInput :input="inputName" placeholder="客户名称或账单编号" @search="searchList">
      <div slot="popover">
        <div class="body-popover">
          <el-form :model="form" label-width="80px" label-position="right">
            <el-form-item label="客户名称：">
              <el-input v-model.trim="form.cust" size="mini" clearable placeholder="请输入客户名称" style="width:220px;" />
            </el-form-item>
            <!-- <el-form-item label="日期范围：" class="mtn15">
              <el-date-picker v-model="form.date" size="mini" style="width:100%" type="monthrange" range-separator="-" start-placeholder="开始月份" end-placeholder="结束月份"/>
            </el-form-item>
            <el-form-item label="合同金额范围：" class="mtn15">
              <el-input v-model.trim="form.amount" oninput="value=value.replace(/[^\d]/g,'')" size="mini" clearable placeholder="请输入合同金额范围"/>
            </el-form-item> -->
            <el-form-item label="支付状态：" class="mtn15">
              <el-select v-model="form.status" placeholder="请选择支付状态" class="w220" size="mini" filterable>
                <el-option v-for="item in optionsPayStatus" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式：" class="mtn15">
              <el-select v-model="form.way" placeholder="请选择支付方式" class="w220" size="mini" filterable>
                <el-option v-for="item in optionsPayWay" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="footr-popover">
          <el-button size="mini" class="button-com" @click="searchReset">重置</el-button>
          <el-button type="primary" size="mini" @click="searchFilter">查询</el-button>
        </div>
      </div>
    </filterInput>
    <el-button size="mini" type="primary" style="float:right;margin-right:15px;">+ 添加</el-button>

    <el-table v-loading="loading" :data="tableData" :height="tableHeight" stripe size="mini" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column label="账单编号">
        <template slot-scope="scope">
          <el-button type="text" @click="openBillDetail(scope.row)">{{ scope.row.bill_code }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="费用期间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.start_date }} 至 {{ scope.row.end_date }}
        </template>
      </el-table-column>
      <el-table-column prop="cust_name" label="金额" align="center" width="100">
        <template slot-scope="scope">
          {{ fee_formatter(scope.row.amount) }}
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" show-overflow-tooltip />
      <el-table-column prop="cust_name" label="客户名称" show-overflow-tooltip />
      <el-table-column label="支付状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.payment_status === "N" ? '未支付' : '已支付' }}
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          {{ ['微信支付','支付宝支付','银联支付','虚拟账户扣除','现金支付'][[10, 11, 12, 20, 21].indexOf(scope.row.payment_way)] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openBillDetail(scope.row)">查看</el-button>
          <template v-if="scope.row.bill_type===3">
            <span>|</span>
            <el-button type="text" @click="deleteBill(scope.row)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 30, 50]" :page-size="pagesize" :total="pageTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <!-- <billDetail ref="billDetail" /> -->
  </div>
</template>

<script>
import filterInput from "@/components/filterInput.vue";

export default {
  name: "BillList",
  components: {
    // billDetail,
    // billAdd,
    filterInput
  },
  data() {
    return {
      loading: false,
      inputName: "",
      form: {
        // 筛选框数据
        cust: "",
        amount: "",
        date: "",
        status: "",
        way: ""
      },
      optionsPayStatus: [
        { value: "", label: "全部" },
        { value: "N", label: "未支付" },
        { value: "Y", label: "已支付" }
      ],
      optionsPayWay: [
        { value: "", label: "全部" },
        { value: "10", label: "微信支付" },
        { value: "11", label: "支付宝支付" },
        { value: "12", label: "银联支付" },
        { value: "20", label: "虚拟账户扣除" },
        { value: "21", label: "现金支付" }
      ],
      tableData: [],
      // 表格实时计算高度
      tableHeight: this.$store.getters.tableHeight,
      pagesize: 15, // 每页条数
      currentPage: 1, // 当前页
      pageTotal: null
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 格式化金额
    fee_formatter(row) {
      return row;
    },
    // 搜索名字
    searchList(val) {
      this.pagesize = 15;
      this.currentPage = 1;
      this.inputName = val;
      this.loadData();
    },
    // 重置搜索条件
    searchReset() {
      const form = this.form;
      Object.keys(form).forEach((item, index) => {
        form[item] = "";
      });
      this.inputName = "";
      this.currentPage = 1;
      this.loadData();
    },
    // 过滤查询
    searchFilter() {
      this.inputName = "";
      this.currentPage = 1;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      const form = this.form;
      const getDate = data => {
        return !data ? "" : this.$day(data).format("YYYY-MM-DD");
      };
      let par = {
        agency_id: "",
        login_user_id: "",
        cust_name: form.cust,
        bill_code: this.inputName || null,
        period_start: getDate(form.date[0]),
        period_end: getDate(form.date[1]),
        payment_status: form.status,
        payment_way: form.way,
        amount_gt: form.amount,
        pageQueryVO: {
          currentPage: this.currentPage,
          pageSize: this.pagesize,
          orderName: "cb.bill_id desc"
        }
      };

      const data = {
        page: 2,
        pageSize: 10,
        cityCode: 0,
        isEnabled: false,
        isClean: true
      };
      this.$http.get("/witkey/v1/page", data).then(res => {
        console.log(res);
        this.tableData = res.content;
        this.pageTotal = res.totalPages;
        this.loading = false;
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    },
    openBillDetail(row) {
      this.$refs.billDetail.open(row);
    },
    // 删除
    deleteBill(row) {
      this.$confirm("是否删除该账单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const user_id = JSON.parse(localStorage.umUser).user_id;
          // apiBillDel(row.bill_id, user_id).then(res => {
          //   const resData = res.data;
          //   const message = resData.code === "0" ? "删除成功" : resData.message;
          //   const type = resData.code === "0" ? "success" : "error";
          //   this.$message({
          //     message,
          //     type
          //   });

          //   if (res.data.code === "0") {
          //     this.tableData.splice(this.tableData.indexOf(this.tableData), 1);
          //     this.pageTotal -= 1;
          //   }
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消退回'
          // })
        });
    }
  }
};
</script>

<style scoped>
.w220 {
  width: 220px;
}
</style>
