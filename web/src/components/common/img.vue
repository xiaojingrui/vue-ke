<template>
  <div :class="{'customer-image flex-end-center': !params.isService, 'customer-service-image': params.isService}">
    <img :src="params.data.url" alt="" width="100" @click="showFullImage = true">
    <div v-if="showFullImage" class="fullImage-container center-center" @click="showFullImage = false">
      <img :src="params.data.url" alt="" :width="fullImageWidth">
    </div>
  </div>
</template>
<script>
import { preloadImg } from '@js/utils'
export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showFullImage: false,
      fullImageWidth: 300
    }
  },
  async created() {
    let image = await preloadImg(this.params.data.url)
    if (image.width < 300) {
      this.fullImageWidth = image.width
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-image {
  margin-top: 30px;
  margin-right: 30px;
}
.customer-service-image {
  margin-left: 26px;
  margin-top: 33px;
}
.fullImage-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 100;
}
</style>
