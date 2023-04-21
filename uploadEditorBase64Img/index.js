import {
  changeBase64ToFileOrBlob,
  getAllBase64Str,
  replaceBase64WithSpecialChar,
  arrCrossMerge,
} from './utils.js';

let regg = /<img [^="">]*src=['"]data:image([^'"]+)[^>]*>/gi;

/**
 *
 * @param {*} base64Str
 * @param {*} uploadApi
 * @param {*} limitNum
 * @returns
 */
export function matchBase64ThenUpload(base64Str, uploadApi, limitNum=0) {
  let replacedStr = replaceBase64WithSpecialChar(base64Str, regg, '{b64}');
  let matchedImgBase64Arr = getAllBase64Str(base64Str, regg);
  let handleStep1Data = matchedImgBase64Arr.map((item, i) => {

    let base = 'data:image' + item;
    if(base.length<limitNum){
      return {
        id: i,
        imgTag:`<img src="${base}" >`,
        imgUrl: base,
      }
    }else{
      let baseFile = changeBase64ToFileOrBlob(base);
      return new Promise((resolve, reject) => {
        var data = { file: baseFile };
        uploadApi(data)
          .then(
            (res) => {
              resolve({
                id: i,
                res,
                imgTag:`<img src="${res.data}" >`,
                imgUrl: res.data,
              });
            },
            (err) => {
              resolve({
                id: i,
                res: err,
                imgTag:`<img src="${err.data}" >`,
                imgUrl: err.data,
              });
              reject(err);
            }
          )
          .catch((er) => {
            reject(er);
          });
      });
    }
  });

  return new Promise((resolve, reject) => {
    return Promise.all([...handleStep1Data])
      .then((values) => {
        let replacedArr = replacedStr.split('{b64}')
        let imgTags = values.map(item=>item.imgTag)
        let handledHtmlStr = arrCrossMerge(replacedArr,imgTags)
        // let placeReg = /\{b64\}/g;
        // let matchedPlaceholders = replacedStr.match(placeReg);
        resolve(handledHtmlStr.join(''));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
