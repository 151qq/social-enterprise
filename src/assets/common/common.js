import '../scss/common.scss';
export default {
    /**
     * loading效果
     * */
    loading: () => {
        let oLoading = document.getElementById('loadingAdd');
        if (!oLoading) {
            let oDiv = document.createElement('div');
            document.body.appendChild(oDiv);
            oDiv.innerHTML = '<span></span>';
            oDiv.id = 'loadingAdd';
        }
    },
    removeLoading: () => {
        let oDiv = document.getElementById('loadingAdd');
        if (oDiv) {
            document.body.removeChild(oDiv);
        }
    },
    /**
     * 弹出框（确定，取消）
     * 使用：common.showModal({
   *     title:'提示',
   *     content:'哈哈',
   *     showCancel:true,
   *     success:function () {
   *       console.log(1111)
   *     }
   *   })
     * */
    showModal: (options) => {
        let oShowModal = document.getElementById('showModal');
        if (!oShowModal) {
            let oDiv = document.createElement('div');
            document.body.appendChild(oDiv);
            oDiv.id = 'showModal';
            let title = '<h3>' + (options.title ? options.title : '') + '</h3>';
            let content = '<p>' + (options.content ? options.content : '') + '</p>';
            let btns = '<div class="btns"><a href="javascript:;" class="succ">确定</a>' + (options.showCancel ? '<a href="javascript:;" class="cancel">取消</a>' : '') + '</div>';
            oDiv.innerHTML = '<div class="cBox">' + title + content + btns + '</div>';
            oDiv.addEventListener('touchend', (ev) => {
                if (ev.target.className == 'succ') {
                    options.success && options.success();
                    this.a.hideModal();
                } else if (ev.target.className == 'cancel') {
                    this.a.hideModal();        //a:是默认的
                }
            }, false)
        }
    },
    hideModal: () => {
        let oShowModal = document.getElementById('showModal');
        if (oShowModal) {
            document.body.removeChild(oShowModal);
        }
    },
    getDateDiff: (dateStr) => {
        var publishTime = Date.parse(dateStr.replace(/-/gi,"/"))/1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = parseInt(new Date().getTime()/1000),
            d,
            date = new Date(publishTime*1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
            //小于10的在前面补0
            if (M < 10) {
                M = '0' + M;
            }
            if (D < 10) {
                D = '0' + D;
            }
            if (H < 10) {
                H = '0' + H;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }

            d = timeNow - publishTime;
            d_days = parseInt(d/86400);
            d_hours = parseInt(d/3600);
            d_minutes = parseInt(d/60);
            d_seconds = parseInt(d);

            if(d_days > 0 && d_days < 30){
                return d_days + '天前';
            }else if(d_days <= 0 && d_hours > 0){
                return d_hours + '小时前';
            }else if(d_hours <= 0 && d_minutes > 0){
                return d_minutes + '分钟前';
            }else if (d_seconds < 60) {
                if (d_seconds <= 0) {
                    return '刚刚发表';
                }else {
                    return d_seconds + '秒前';
                }
            }else if (d_days >= 30 && d_days < 365){
                return Math.floor(d_days/30) + '个月前';
            }else if (d_days >= 365) {
                return Math.floor(d_days/365) + '年前';
            }
        }    
}
