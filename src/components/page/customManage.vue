<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 客户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-lx-add"
                    class="handle-del mr10"
                    @click="addVisible = true"
                >添加客户</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="用户id"></el-table-column>
                <el-table-column prop="customerName" label="姓名"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-lx-location"
                            @click="checkPath(scope.row)"
                        >查看航班路径</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.row)"
                        >删除</el-button> 
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next, total"
                    :current-page="curPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加客户弹出框 -->
        <el-dialog title="添加客户" :visible.sync="addVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="姓名:">
                    <el-input v-model="name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 旅游路线弹出框 -->
        <el-dialog title="旅游路线" :visible.sync="showPath" width="30%">
            <template v-if="pathList.length == 0">
                暂无旅游路线
            </template>
            <template v-else>
                <div v-for="(item, index) in pathList" :key="index">
                    <el-steps simple>
                        <el-step :title="item.fromCity" icon="el-icon-location" status="process" width="100"></el-step>
                        <el-step :title="item.arriveCity" icon="el-icon-location" status="process" width="100"></el-step>
                    </el-steps>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { customList, addCustom, delCustom, travelList } from '../../api/index';
export default {
    name: 'customManage',
    data() {
        return {
            tableData: [],
            addVisible: false,
            showPath: false,
            name: '',
            curPage: 1,
            pageSize: 10,
            total: 0,
            pathList: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let query = {
                "pageNum": this.curPage,
                "pageSize": this.pageSize
            }
            customList(query).then(res => {
                console.log(res)
                this.tableData = res.records
                this.total = res.total
            });
        },
        checkPath(row) {
            travelList({"customerId": row.id}).then(res => {
                console.log(res)
                this.pathList = res
                this.showPath = true
            })
        },
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除该客户吗？', '提示', {
                type: 'warning'
            }).then(() => {
                delCustom({"id": row.id}).then((res) => {
                    console.log(res);
                    if(res.code == 201) {
                        this.$message.success("删除成功")
                        this.getData()
                    } else {
                        this.$message.fail(res.message)
                    }
                }).catch((error) => {
                    console.error(error)
                    this.$message.error("请求失败")
                });
            })
        },
        add() {
            addCustom({"customerName": this.name}).then(res => {
                console.log(res);
                if(res.code == 201) {
                    this.addVisible = false
                    this.$message.success("添加成功")
                    this.getData()
                } else {
                    this.$message.error(res.message)
                }
               // this.pageTotal = res.pageTotal || 50;
            }).catch((error) => {
                console.error(error)
                this.$message.error("请求失败")
            });;
        },
        // 分页导航
        handlePageChange(val) {
            this.curPage = val
            this.getData()
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
