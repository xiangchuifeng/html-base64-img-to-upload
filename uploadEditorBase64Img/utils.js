export function changeBase64ToFileOrBlob(base64String, type = "file") {
  let arr = base64String.split(",");
  let mime = arr[0].match(/:(.*?);/)[1]; // 此处得到的为文件类型
  let bstr = window.atob(arr[1]); // 此处将base64解码
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (type === "blob") {
    let blob = new Blob([u8arr], { type: mime });
    return blob;
  } else {
    // 通过以下方式将以上变量生成文件对象，三个参数分别为文件内容、文件名、文件类型
    let file = new File([u8arr], "filename."+mime.split('/')[1], { type: mime });
    return file;
  }
}

export function checkPastePicLength(editorStr, limitNum){
  let str = editorStr;
  if (editorStr.indexOf('<img') > -1) {
    let a = str.split('<img src="');
    let flag = true;
    a.forEach((item) => {
      if (item.indexOf('data:image') > -1) {
        let l = item.split('"')[0];
        let flagNum = limitNum || 70000;
        if (l.length > flagNum) {
          flag = false;
        }
      }
    });
    return flag;
  } else {
    return true;
  }
};


export function getAllBase64Str(str,reg){
  const ans = [];
  let str0 = str;
  let matched = null;
  while ((matched = reg.exec(str0)) !== null) {
      console.log(matched);
      ans.push(matched[1]);
  }
  console.log(ans)
  return ans;
}


export function replaceBase64WithSpecialChar(base,reg,replaceStr){
  return base.replace(reg,replaceStr)
}

export function arrCrossMerge(arr1,arr2){
  if(arr1&&arr2&&(arr1.length>arr2.length)){
    let ar = [];
    arr1.forEach((item,i)=>{
      ar.push(item);
      if(arr2[i]){
        ar.push(arr2[i])
      }
    })
    console.log(ar,'ar--->')
    return ar;
  }
}