/*
*
* FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
* ArrayBuffer中的内容对外是不可见的，若要查看其中的内容，就要引入另一个概念：类型化数组,而数组中每一个元素的值，为当前字节的十进制数值。
* readAsBinaryString函数会按字节读取文件内容,但是二进制数据不可见，显示出来需要一次编码，但是编码之后比原来的文件大了，不利于传输。
* Blob对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作File对象一样操作Blob对象.
* ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。
* TypedArray是为了能操作ArrayBuffer提供的视图，比如Uint8Array、Uint16Array，如果这两个操作的是同一个ArrayBuffer，任意一个操作都会影响另一个
* TypedArray可以接受普通数组作为参数直接分配内存生成ArrayBuffer。
* ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。
* TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。
* Uint8Array=》8位是每一项的数字转换成二进制长度不能超过8位，比如256转换成二进制是100000000，这样就溢出了，根据规则只保存后八位，
* uint8视图的解释规则是无符号的 8 位整数，所以00000000就是0。
*
* 正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去 1。
*/


class Form {
    static CRLF = "\r\n";
    /*分隔符*/
    static boundary = `----------FormData${Math.random()}`;

    constructor() {
        /*存储数据的键值对*/
        this.parts = [];
    }

    _transformBuffer(str) {
        /*使用UTF-8编码将JavaScript字符串编码为字节，然后返回Uint8Array这些字节的结果*/
        const utf8encoder = new TextEncoder();
        return utf8encoder.encode(str);
    }

    _transformString(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onload = function () {
                const utf8decoder = new TextDecoder();
                resolve(utf8decoder.decode(reader.result))
            }
        })
    }

    stringToData(key, value) {
        const lines = [];
        lines.push(Form.boundary + Form.CRLF);
        lines.push(`Content-Disposition: form-data; name=${key};${Form.CRLF.repeat(2)}`);
        lines.push(value + Form.CRLF);
        return Promise.resolve(lines.join(''))
    }

    blobToData(key, value, filename = 'blob') {
        const lines = [];
        lines.push(Form.boundary + Form.CRLF);
        lines.push(`Content-Disposition: form-data; name=${key}; filename=${filename};${Form.CRLF};`);
        lines.push("Content-Type: " + value.type + Form.CRLF.repeat(2));
        return this._transformString(value).then(res => {
            lines.push(res + Form.CRLF);
            return lines.join('');
        })
    }

    append(key, value) {
        if (value instanceof Blob) {
            this.parts.push(this.blobToData(key, value))
        } else {
            this.parts.push(this.stringToData(key, value))
        }
        return this;
    }

    toString() {
        return Promise.all(this.parts).then(res => {
            console.log(res)
            res.push("--" + Form.boundary + "--");
            console.log(res.join(''))
            return {
                boundary: Form.boundary,
                data: this._transformBuffer(res.join(''))
            }
        })
    }
}
