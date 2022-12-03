<template>
  <div class="history-page">
    <el-table height="800px" v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="convert_datetime" label="Date" width="180"></el-table-column>
      <el-table-column prop="product_name" label="Product" width="200">
        <template slot-scope="scope">
          <el-link :href="scope.row.product_permalink" target="_blank" :underline="false">{{scope.row.product_name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="origin_image_link" label="Original main image" width="180" align="center">
        <template slot-scope="scope">
          <el-link :href="scope.row.origin_image_link" target="_blank" :underline="false">
              <el-image :src="scope.row.origin_image_link">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="origin_image_size" label="Original size" width="180"></el-table-column>
      <el-table-column prop="is_removed_background" label="Background Removed" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.is_removed_background" disabled></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="is_webp_converted" label="Webp Converted" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.is_webp_converted" disabled></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="converted_image_link" label="Converted image name" width="180" align="center">
        <template slot-scope="scope">
          <el-link :href="scope.row.converted_image_link" target="_blank" :underline="false">
            <el-image :src="scope.row.converted_image_link">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="image_optimised_size" label="Optimised size" width="180"></el-table-column>
      <el-table-column label="Gain" width="200">
        <template slot-scope="scope">
          <el-progress
            type="circle"
            style="top:5px;"
            :percentage="scope.row.converted_image_percentage"
            width="20"
            stroke-width="3"
            :show-text="false"
          ></el-progress>
          <span style="color:#409EFF">{{scope.row.converted_image_percentage}}%</span>-
          <span style="color:#409EFF">({{scope.row.converted_image_size}})</span>
        </template>
      </el-table-column>
      <el-table-column prop="Actions" label="Actions" width="100">
        <template>
          <i class="el-icon-view"></i>
          <i class="el-icon-download"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :page-sizes="[20, 40, 60, 80, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="pageChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>

export default {
  name: "ProductsHandleHistoryPage",
  mounted() {
    this.query()
  },
  data(){
    return {
      loading:false,
      tableData: [],
      pageSize:20,
      total:0,
      pageNo:1
    }
  },
  methods:{
    query(){
      const me = this
      this.loading = true
      window.api.post("GET_WOO_PRODUCT_HANDLE_HISTORY",{page_no:this.pageNo,page_size:this.pageSize},function(data){
        me.loading = false
          if(data.status){
            me.tableData = data.data
            me.total = data.total_rows
          }
      });
    },
    pageChange(page){
      this.pageNo = page
      this.query()
    },
    sizeChange(size){
      this.pageSize = size;
      this.query()
    }
  }
}
</script>

<style scoped>
  .history-page{
    background-color: #FFFFFF;
  }
  .history-page /deep/ .el-table__cell img{
    width: 50px;
  }
</style>