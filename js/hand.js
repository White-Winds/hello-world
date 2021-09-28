function throttle(method, delay, duration) {
    var timer = null;
    var begin = new Date();
    return function () {
        var context = this, args = arguments;
        var current = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    }
}
//节流函数

function transform_num(img_box, e) {
    let x = img_box.offsetWidth / 2;
    y = img_box.offsetHeight / 2;
    //获取当前窗口的尺寸
    mx = e.screenX;
    my = e.screenY;
    //获取鼠标在显示器屏幕内的坐标
    array = [x, y, mx, my];
    return array;
    //返回数组
}

document.addEventListener('DOMContentLoaded', function ScrollBG() {
    var smLogo = document.getElementById('samsung_bg');
    //定义滚动背景容器变量
    var phoneLogos = smLogo.getElementsByTagName('img');

    const phoneLogo = function (event) {
        event = event || window.event;
        transform_num(smLogo, event);

        //执行函数，获取坐标和尺寸
        for (var i = 0; i < phoneLogos.length; i++) {
            let tx = -((array[0] - array[2]) / 90 * phoneLogos[i].style.zIndex);
            let ty = -((array[1] - array[3]) / 70 * phoneLogos[i].style.zIndex);

            //开始为每个要动的元素设置X轴偏移和Y轴偏移，以每个元素的不同zIndex值来区别移动量
            if (phoneLogos[i].style.zIndex < 0) {
                //当zIndex为负数，返回负数，保证偏移方向相同
                phoneLogos[i].style.transform = `translateX(${-tx}px) translateY(${-ty}px)`;
            }
            else {
                phoneLogos[i].style.transform = `translateX(${tx}px) translateY(${ty}px)`;
            }
        }
    };
    smLogo.onmousemove = throttle(phoneLogo, 10, 10);
})