export let judgeOS = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return 'ios'
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return 'android'
  } else {
    return 'pc'
  }
}

export let judgeIsWx = () => {
  return navigator.userAgent.includes('MicroMessenger')
}

export const preloadImg = url => {
  return new Promise(resolve => {
    let image = new Image()
    image.src = url
    image.onload = () => {
      resolve(image)
    }
  })
}
