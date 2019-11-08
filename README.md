>记录学习成长之路。逆水行舟，不进则退

###  upload

 > 移动端有些机型在上传图片的时候会有图片旋转的情况，但是在浏览器看图又是正常的，
 > 在img标签上看又是旋转的，由于设备拍摄的角度的不同，会导致图片到应用程序的时候图片会自动旋转，
 > 但是为什么在浏览器直接访问链接又是正常的？是因为浏览器自动帮你做了校正，其中可以用Orientation属性来获取
 > 图片的方位

 **Orientation对应的属性如下**

+ Orientation = 1（不翻转）
+ Orientation = 2 （左右翻转）
+ Orientation = 3 （180度翻转）
+ Orientation = 4 （上下翻转）
+ Orientation = 5 （顺时针翻转90度后，左右翻转）
+ Orientation = 6 （顺时针翻转90度）
+ Orientation = 7 （逆时针翻转90度后，左右翻转）
+ Orientation = 8 （逆时针翻转90度）

可以用exif-js获取图片的详细信息，也可以获取到Orientation属性，判断Orientation是多少然后纠正图片的角度就可以达到预期的效果了

***


###  前阵子刚学Python，这次用Python实现了一个双向列表，并且用这个双向列表实现了FIFO，LFU，LRU这三种缓存置换算法

**FIFO先进先出**

**LRU最近最少使用算法**

**LFU最不经常使用算法**

[实现代码](https://github.com/xfxhn/cache)
