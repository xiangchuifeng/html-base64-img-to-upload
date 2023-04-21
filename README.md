
#### if a html string contain IMG tags which url is base64 ，is to large to post api，before we do that, we can find the base64 IMG tags.and replace their url with the uploaded url.

#### 一种常用的场景：
在大多数情况下，在我们前端的 富文本提交时候，如果html字符串中的tag img,如果没有特殊处理的，图片有可能是base64形式的，相当于把整个图片文件大小 放入了html片段中，这样在表单提交的时候，文件会很大，而且在数据回显访问的时候，接口响应会很慢
我们需要的解决方法，是把base64图片在表单提交之前 替换为 上传到云服务上之后的图片url，  
    一种解决方法是对我们的富文本编辑器做处理，使其配置为base64图片上传到服务器，获取到url,再替换到富文本im标签上。但是这种富文本编辑器的插件 可能不是很完美，有的地方转换可能会有出入，图片，文本复制有偏差。
    另一种解决方法是，我们再提交表单的时候，对富文本中的 html片段识别处理，将其中的base64图片上传之后替换为绝对url,然后再提交，<span style="color:blueviolet;">这个就是我们当前这个插件实现的功能，省去了大家重复的劳动力</span>
  
#### usage:
  npm i 'html-base64-img-to-upload';

  ``` js

    import { matchBase64ThenUpload } from 'html-base64-img-to-upload';

    ...

    /**
     * editorStr: html String
     * uploadApi: return uploaded pic url, data structor: {code,messge,data}  res.data
     * limitNum: if base64 string length less than this,nothing todo,else upload; default:0
     */
    matchBase64ThenUpload(editorStr, uploadApi,limitNum).then(handledHtmlStr=>{
      // do something
    })
 
  ```