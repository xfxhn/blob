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

******
###  使用generator实现的杨辉三角
>如果直接通过列表生成生成一个列表，如果列表很大，但是又不知道哪些是自己需要的，如果列表很大，我们只需要访问前面几个，就会浪费存储空间，所以可以通过
>所以列表元素可以通过上个元素推导出来，就可以使用generator，这样就不用创建完整的list，就节省了大量的空间，达到我们想要的效果比如斐波拉契数列，除第一个和第二个数外，任意一个数都可由前两个数相加得到，这样也能通过generator函数实现

******

###  一个简单的http服务器
[实现代码](https://github.com/xfxhn/httpServer)


******

###  一个简易MVC的架构

[实现代码](https://github.com/xfxhn/MVC)

******

###  用children_process实现的单机集群

> 因为node是单进程应用，不能利用多核CPU，虽然异步IO大大提高了node的并发量，减少线程上下文切换带来的性能开销，但是
对于计算密集型不擅长，并且错误会引起整个应用退出，大计算量会占用CPU导致无法继续调用异步IO
已完成的回调函数也会得不到及时调用，所以利用了children_process模块实现了node的单机集群，将计算分发到各个子进程
将计算分解，通过master-worker的方式提高应用的健壮性。node提供了cluster帮助我们更好的构建单机集群
这里只是针对单机集群实现的细节做了下整理，帮助理解cluster模块的原理

[实现代码](https://github.com/xfxhn/blob/tree/master/process)
