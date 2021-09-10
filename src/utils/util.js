// 模块化(es6提供): esmodule
// 导入和导出
// 其余文件可以使用到该文件的变量和方法

// export default: 默认导出 导出变量 数组 对象 方法 只能导出一次
// export: 导出 导出变量 数组 对象 方法 但是要加let或者const 能导出多次

//导入路由
export default {
  //存储记录
  //书架 bookshelf
  //搜索历史 search
  //书籍分类小类 minro
  //key:存储的名字
  //item:根据什么属性名来去重
  saveHistory({ key, data,item }) {
    //拼接一个名字
    let name = key + 'History'
    let history = uni.getStorageSync(name)
    let arr = []
    if (history) {
      //已经存储过了 将以前的数据一起保存下来
      arr = history
    }
    arr.unshift(data)
    if (typeof (data) === "string") {
      //简单数据类型去重
      arr = Array.from(new Set(arr));
    } else {
      //复杂数据类型去重
      const res = new Map();
      arr = arr.filter(arr => !res.has(arr[item]) && res.set(arr[item], 1))
    }
    uni.setStorageSync(name, arr)
  },
  //获取存储记录
  getHistory(key) {
    let name = key + 'History'
    let arr = uni.getStorageSync(name)
    if (arr) return arr
    else return null
  },
  //删除存储记录
  //key:bookshelf(书架) search(搜索记录)
  //data:属性值
  //attr:根据什么属性名删除
  removeHistory(key, data,attr) {
    let name = key + 'History'
    let arr = this.getHistory(key)
    if (arr.length>0) {
      //传入的数据不为空 则做过滤操作
      if (data) {
        // 将以前存的数据转换成数组
        arr = arr.filter((item,index) => {
          return item[attr] !== data[attr];
        });
        uni.setStorageSync(name, arr);
      } else {
        //传入的数据为空 则清空该历史（用于清空搜索历史）
        uni.setStorageSync(name, []);
      }
    }
  },
  //跳转页面
  jumpDetail(gid) {
	  uni.navigateTo({
	  	url:`/pages/detail/detail?gid=${gid}`
	  })
  }
}