import EXIF from 'exif-js'; // 引入依赖插件

export function selectFileImage(file, callback, quality = 0.9) {
    //图片方向角 added by lzk
    let Orientation = null;
    if (file) {
        console.log("正在上传,请稍后...");
        const rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
        if (!rFilter.test(file.type)) return;

        /*
        * 用exif获取图片的在相机里的方向；
        * 有1-8个数值，具体代表什么角度，自行百度
        * */
        EXIF.getData(file, function () {
            // alert(EXIF.pretty(this));
            EXIF.getAllTags(this);
            //alert(EXIF.getTag(this, 'Orientation'));
            /*存储图片位置*/
            Orientation = EXIF.getTag(this, 'Orientation');
            console.log(file)
        });

        /*读取文件*/
        const oReader = new FileReader();
        oReader.onload = function (e) {

            const image = new Image();
            /* 这个是base64 */
            image.src = e.target.result;
            image.onload = function () {
                /*这个是原图宽高*/
                let expectWidth = this.naturalWidth;
                let expectHeight = this.naturalHeight;

                /*w=8,h=6*///  48/8=6
                /*canvas的大小是不能超过五百万像素的，不然画不出来*/
                /**/
                if (this.naturalWidth > 800) {
                    expectWidth = 800;
                    /*宽度超过800就重新计算一下高度*/
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    /*高度超过1200就重新计算一下宽度*/
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

                //alert(Orientation);
                if (Orientation !== "" && Orientation !== 1) {
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            alert('需要顺时针（向左）90度旋转');
                            rotateImg(this, 'left', canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            alert('需要顺时针（向右）90度旋转');
                            rotateImg(this, 'right', canvas);
                            break;
                        case 3://需要180度旋转
                            alert('需要180度旋转');
                            rotateImg(this, 'right', canvas);//转两次
                            rotateImg(this, 'right', canvas);
                            break;
                    }
                }

                const base64 = canvas.toDataURL("image/jpeg", quality);

                const rightFile = dataURLtoFile(base64, 'xf.jpg');
                callback({
                    base64,
                    rightFile
                })
            };
        };
        oReader.readAsDataURL(file)
    }
}

function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

//对图片旋转处理
function rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向  
    const min_step = 0;
    const max_step = 3;

    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
    const height = img.height;
    const width = img.width;

    let step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction === 'right') {
        step++;
        //旋转到原位置，即超过最大值  
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }

    //旋转角度以弧度值为参数  
    const degree = step * 90 * Math.PI / 180;
    const ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }

}