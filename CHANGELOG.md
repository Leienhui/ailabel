# 注意事项：

## 1.可以对页面进行标注(对页面进行标注时将渲染的图片的src设为空就行)，注意设置页面的尺寸，最好设置成页面的最大宽度高度，这样就能进行很好的渲染了

## 2.对于重新渲染一个画布时，需要new一个对象，重新将新的事件都重新添加到新的画布上，对于老画布，先销毁

# 5.1.x

`近期迭代需求计划`
1. 双击选中图形，支持多个命中元素返回，前端可进行面积大小或者其他逻辑决定指定feature选中
2. 支持矢量标注图形的旋转（图片旋转待后续支持-本次迭代不支持）

# 5.1.15
`2022-05-24`
1. resize过程cursorLayer未伴随resize问题修复

# 5.1.14
`2022-05-16`
1. 鼠标移出容器编辑自动平移bug修复

# 5.1.13
`2022-03-18`
1. 外放Graphic

# 5.1.11
`2022-01-17`
1. 修复右键删除节点bug
2. 修复绘制过程中十字丝设置受drawingTip干扰问题

# 5.1.10
`2022-01-17`
1. 重复发版

# 5.1.9
`2022-01-15`
1. draging增加回掉参数activefeature（contributor: https://github.com/luchuanqi）

# 5.1.8
`2022-01-11`
1. 绘制过程中支持十字丝 （坐标显示待后续支持）

# 5.1.7
`2021-10-25`
1. 对选中feature可通过快捷键up/down/left/right进行feature位置微调

# 5.1.6
`2021-09-29`
1. 绘制线段支持箭头，IFeatureStyle增加arrow?:boolean配置（目前只针对线段）

# 5.1.5
`2021-09-27`
1. Map导出图片支持跨域导出图片
2. Map导出图片关于涂抹层擦除透明问题修复

# 5.1.4
`2021-09-24`
1. OverlayLayer/EventLayer对外开放
2. Map: MapOption增加zoomWheelRatio设置鼠标滑轮缩放速率

# 5.1.3
`2021-09-24`
1. OverlayLayer绘制文本样式修改为实例属性配置，用户可gMap.tipLayer.defaultTextStyle={新样式}进行设置
2. Map: MapOption增加withHotKeys快捷键开关功能

# 5.1.2
`2021-09-22`
1. AILabel.Text增加updateText方法

# 5.1.1
`2021-09-18`
1. imageLayer-globalAlpha修复

# 5.1.0
`2021-09-18`
1. Layer.Image新增events事件监听（loadStart/loadEnd/loadError）
2. Map对象增加exportLayersToImage【图片不要跨域】
3. Map实例option增加featureCaptureWhenMove配置（‘双击选中’tip）

# 5.0.22
`2021-09-16`
1. Map增加slots插槽事件拦截器（新增'drawActivePoint' | 'drawActiveMiddlePoint'两处拦截位置）

# 5.0.20
`2021-09-15`
1. overlayLayer的defaultActiveFeatureStyle改回非静态属性方式

# 5.0.19
`2021-09-15`
1. 屏幕放大缩小关于text对象展示问题修复

# 5.0.18
`2021-09-15`
1. gMap增加setEditingColor()改变编辑时拖拽feature颜色

# 5.0.17
`2021-09-14`
1. 绘制过程中mouseOut遇到marker自动平移bug修复

# 5.0.16
`2021-09-07`
1. Map增加绘制过程中提示文案开关功能

# 5.0.15
`2021-09-02`
1. 屏幕圆编辑时缩放bug修复

# 5.0.14
`2021-09-01`
1. 涂抹样式修改

# 5.0.13
`2021-08-31`
1. Map增加destroy方法

# 5.0.12
`2021-08-31`
1. Layer.Feature增加getAllFeatures
2. Layer.Marker增加getAllMarkers
3. Layer.Text增加getAllTexts
4. Layer.Mask增加getAllActions

# 5.0.11
`2021-08-30`
1. 多段线选中bug修复

# 5.0.10
`2021-08-29`
1. Layer.Feature/Layer.Marker/Layer.Text增加获取指定对象方法
2. Text新增updatePosition方法
3. demo 新增标注demo[矩形为例]

# 5.0.9
`2021-08-29`
1. Map增加resize方法，支持大小重设

# 5.0.8
`2021-08-28`
1. 绘制样式优化

# 5.0.7
`2021-08-28`
1. Circle绘制提示tip位置bug
2. Marker拖拽坐标bug修复
3. Map对象增加getTargetFeatureWithPoint方法获取命中feature｜null
4. Layer.Image支持grid网格设置

# 5.0.6
`2021-08-27`
1. 鼠标滑轮缩放性能优化，MapOption增加refreshDelayWhenZooming配置，默认true
2. 涂抹擦除性能优化，不会存在卡顿现象
3. Map鼠标事件外放

# 5.0.5
`2021-08-27`
1. 矩形编辑时坐标显示bug修复
2. 文本text为空时不进行相关绘制【即不显示】
3. rect/polygon/circle支持IFeatureStyle stroke/fill配置

# 5.0.4
`2021-08-26`
1. 绘制线段完成修改为单击结束
2. 绘制过程中增加tip提示文字
3. 绘制编辑过程中可自由缩放/平移
4. mapOption增加zoomWhenDrawing绘制过程中是否可以自由缩放，默认false
4. mapOption增加panWhenDrawing绘制过程中是否可以自动平移，默认false
5. 增加mapMode='BAN' // 禁用浏览
6. ctrl+z撤销节点
7. 编辑圆bug修复
8. 增加绘制时ctrl+z撤销
9. Map支持自定义坐标轴方向【修改为默认x右，y下】

# 5.0.0
`2021-08-25`
1. 重构版正式开源发布
