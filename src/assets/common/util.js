/**
 * Created by zhangbin on 2017/7/6.
 */
import axios from 'axios';
import common from './common';
import interfaces from './interfaces';

export default {
    /**
       * 格式化日期函数
       * @param date {Date|Date String} [需要格式化的日期]
       * @param frm {String} [格式(如：yyyy-MM-dd hh:mm:ss)]
       * @return 格式化后的日期
       */
    formatDate (date, fmt) {
        let theDate = new Date(date)
        var o = {
            'M+': theDate.getMonth() + 1, // 月份
            'd+': theDate.getDate(), // 日
            'h+': theDate.getHours(), // 小时
            'm+': theDate.getMinutes(), // 分
            's+': theDate.getSeconds(), // 秒
            'q+': Math.floor((theDate.getMonth() + 3) / 3), // 季度
            'S': theDate.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
    },
    formDataDate (str) {
        var dateStr = new Date(str)
        var year = dateStr.getFullYear()
        var monthStr = dateStr.getMonth() + 1
        var dayStr = dateStr.getDate()
        var month = monthStr < 10 ? '0' + monthStr : monthStr
        var day = dayStr < 10 ? '0' + dayStr : dayStr
        return year + '-' + month + '-' + day
    },
    range: function (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    request: (option) => {
        let method = option.method ? option.method : 'get';

        let putData = {
            url: interfaces.interfaces[option.interface],
            method: method,
            headers: {
                token: option.token ? option.token : ''
            }
        }
        if (method == 'get') {
            putData.params = option.data;
        } else if (method == 'post') {
            putData.data = option.data;
        }
        /**
         * 请求拦截：在请求之前执行 比如loading处理
         * */
        return new Promise((resolve, reject) => {
            axios.interceptors.request.use(function (config) {
                common.loading();
                return config;
            })
            /**
             * 请求完成后执行
             * */
            axios.interceptors.response.use(function (response) {

                    let status = response.data.success;
                    if(status == undefined){
                        status == 200
                    }
                    console.log("进入状态" + status);
                    if (status == 203) { //无认证状态
                        console.log("进入203状态")
                        window.location.href = "/login";
                        return;
                    }

                    common.removeLoading();
                    return response;
                }
            )

            axios(putData).then(res => {
                resolve({
                    status: 0,
                    result: res.data
                })
            }).catch((error) => {
                console.log(error);
                reject('error');
            });
        });

    },
    upFile: (e) => {
        return new Promise((resolve, reject) => {
            axios.interceptors.request.use(function (config) {
                common.loading();
                return config;
            })
            /**
             * 请求完成后执行
             * */
            axios.interceptors.response.use(function (response) {
                common.removeLoading();
                return response;
            })
            let file = e.target.files[0];

            var fileSize = file.size / 1024 / 1024
            if (fileSize > 10) {
                alert('文件大小不能超过10MB!')
                return false
            }

            let param = new FormData(); //创建form对象
            param.append('file', file, file.name);//通过append向form对象添加数据
            //param.append('chunk','0');//添加form表单中其他数据
            //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                timeout: 50000,
                headers: {'Content-Type': 'multipart/form-data'}
            };  //添加请求头
            axios.post(interfaces.interfaces.uploadArticleAreaImage, param, config)
                .then(response => {
                    common.removeLoading();
                    resolve({
                        status: 0,
                        result: response.data
                    });
                }).catch(() => {
                common.removeLoading();
                reject('error');
            });
        });
    },
    uploadFile: (option) => {
        return new Promise((resolve, reject) => {
            axios.interceptors.request.use(function (config) {
                common.loading();
                return config;
            })
            /**
             * 请求完成后执行
             * */
            axios.interceptors.response.use(function (response) {
                common.removeLoading();
                return response;
            })
            let file = option.event.target.files[0];

            var fileSize = file.size / 1024 / 1024
            if (fileSize > 10) {
                alert('文件大小不能超过10MB!')
                return false
            }
            
            let param = new FormData(); //创建form对象
            param.append('file', file, file.name);//通过append向form对象添加数据
            //param.append('chunk','0');//添加form表单中其他数据
            //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            if (option.data) {
                for (var key in option.data) {
                    param.append(key, option.data[key])
                }
            }
            let config = {
                timeout: 50000,
                headers: {'Content-Type': 'multipart/form-data'}
            };  //添加请求头
            axios.post(interfaces.interfaces[option.url], param, config)
                .then(response => {
                    common.removeLoading();
                    resolve({
                        status: 0,
                        result: response.data
                    });
                }).catch(() => {
                common.removeLoading();
                reject('error');
            });
        });
    }
};
