// 防抖
// 在每次触发时设定定时器，若在定时器期间内再次触发，则重新计时
function debounce(fn, delay = 500) {
  let timer = null
  return function() {
      if(timer) {
          clearTimeout(timer)
          timer = setTimeout(fn, delay)
      } else {
          timer = setTimeout(fn, delay)
      }
  }
}

// 节流
// 设定一个触发间隔，若多次触发，则间隔时间内的触发不会触发函数
function throttle(fn, delay = 500) {
  let valid = true
  return function() {
      if(!valid) {
          return false
      }
      valid = false
      setTimeout(() => {
          fn()
          valid = true
      }, delay)
  }
}

export default {
  debounce, throttle
}