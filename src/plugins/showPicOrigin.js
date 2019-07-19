const zoomPicture = {
  imgCover: null,
  hiddenImg: null,
  init: function() {
    if(this.hiddenImg != null&&this.imgCover != null) {
      return this
    }
    this.imgCover = document.createElement('div')
    this.hiddenImg = document.createElement('img')

    this.imgCover.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #181818cc;
      transition: transform .5s, opacity .5s;
      opacity: 0;
      transform: scale(0) translateY(120vh);
      transform-origin: bottom center;
      overflow: auto;
      z-index: 9999;
    `
    this.hiddenImg.style.cssText = `
      width: 80%;
      height: 80%;
      object-fit: contain;
    `

    this.hiddenImg.src = 'https://s2.ax1x.com/2019/07/11/ZRMj74.gif'
    this.imgCover.appendChild(this.hiddenImg)
    document.body.appendChild(this.imgCover)

    return this
  },

  watch: function(imgs) {
    for(const img of imgs) {
      img.onclick=()=>{
        if(img.dataset['imgBig']) {
          this.hiddenImg.src = img.dataset['imgBig']
        } else {
          console.warn('No data-img-big url find')
          this.hiddenImg.src = img.src
        }
        this.imgCover.style.transform = 'scale(1) translateY(0px)'
        this.imgCover.style.opacity = '1'
      }
    }

    this.imgCover.onclick=()=>{
      this.imgCover.style.transform = 'scale(0) translateY(120vh)'
      this.imgCover.style.opacity = '0'
      setTimeout(() => {
        this.hiddenImg.src = 'https://s2.ax1x.com/2019/07/11/ZRMj74.gif'
      }, 200);
    }
    return this
  },
  unwatch: function(imgs) {
    for(const el of imgs) {
      el.onclick = null
    }
    return this
  },

  watchError: function(imgs) {
    for(const el of imgs) {
      el.onerror=()=>{
        el.src = "https://s2.ax1x.com/2019/07/11/ZRMj74.gif"
      }
    }
    return this
  },
  unwatchError: function(imgs) {
    for(const el of imgs) {
      el.onerror = null
    }
    return this
  },

  discard: function() {
    if(this.hiddenImg && this.hiddenImg.onclick != null) {
      this.hiddenImg.onclick = null
    }
    document.body.removeChild(this.imgCover)
    if(this.hiddenImg != null||this.imgCover != null) {
      this.hiddenImg = this.imgCover = null
    }
  }

}

export default zoomPicture