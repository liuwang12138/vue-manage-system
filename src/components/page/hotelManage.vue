<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-shop"></i> 宾馆管理
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
                >添加宾馆</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="name" label="宾馆名"></el-table-column>
                <el-table-column prop="location" label="地址"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="roomNum" label="房间总数"></el-table-column>
                <el-table-column prop="availableNum" label="可用房间数"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
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

        <!-- 添加弹出框 -->
        <el-dialog title="添加宾馆" :visible.sync="addVisible" width="50%">
            <el-form label-width="100px">
                <el-form-item label="宾馆名:">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="地址:">
                    <el-input v-model="location"></el-input>
                </el-form-item>
                <el-form-item label="价格:">
                    <el-input v-model="price"></el-input>
                </el-form-item>
                <el-form-item label="房间总数:">
                    <el-input v-model="roomNum"></el-input>
                </el-form-item>
                <el-form-item label="可用房间数:">
                    <el-input v-model="availableNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { hotelList, addHotel, delHotel } from '../../api/index';
export default {
    name: 'hotelManage',
    data() {
        return {
            tableData: [],
            addVisible: false,
            curPage: 1,
            pageSize: 10,
            total: 0,
            name: '',
            location: '',
            price: '',
            roomNum: '',
            availableNum: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                "pageNum": this.curPage,
                "pageSize": this.pageSize
            }
            hotelList(params).then(res => {
                console.log(res);
                this.tableData = res.records;
                this.total = res.total
            });
        },
        // 删除操作
        handleDelete(row) {
            this.$confirm('确定要删除该宾馆吗？', '提示', {
                type: 'warning'
            }).then(() => {
                delHotel({"id": row.id}).then((res) => {
                    console.log(res);
                    if(res.code == 201) {
                        this.$message.success("删除成功")
                        if(this.tableData.length == 0) {
                            this.curPage = val - 1
                            this.getData()
                        } else {
                            this.getData()
                        }
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
            let params = {
                "name": this.name,
                "location": this.location,
                "price": this.price,
                "roomNum": this.roomNum,
                "availableNum": this.availableNum
            }
            addHotel(params).then(res => {
                console.log(res);
                if(res.code == 201) {
                    this.addVisible = false
                    this.$message.success("添加成功")
                    this.getData()
                } else {
                    this.$message.error(res.message)
                }
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
