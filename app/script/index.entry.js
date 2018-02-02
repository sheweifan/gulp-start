import $ from '$'
import '../style/base/reset.styl'
import imgBase64 from '../image/1.png'
import tpl from '../view/test/text.pug'
$('body').append(`<img src="${imgBase64}"/>`)
  .append(tpl({hehe: 'fuck'}))
