<template>
  <div class="n-empty">
    <div
      class="n-empty-image"
      :style="imageStyle"
    >
      <img
        v-if="image"
        :src="image"
        ondragstart="return false"
      >
      <slot
        v-else
        name="image"
      >
        <img-empty />
      </slot>
    </div>
    <div class="n-empty-description">
      <slot
        v-if="$slots.description"
        name="description"
      />
      <p v-else>
        {{ emptyDescription }}
      </p>
    </div>
    <div
      v-if="$slots.default"
      class="n-empty-bottom"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import ImgEmpty from './ImgEmpty.vue'

export default {
  name: 'NEmpty',
  components: {
    [ImgEmpty.name]: ImgEmpty,
  },
  props: {
    image: {
      type: String,
      default: '',
    },
    imageSize: {
      type: Number,
      default: undefined,
    },
    description: {
      type: String,
      default: '',
    },
  },
  computed: {
    emptyDescription() {
      return this.description || '暂无数据'
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : '',
      }
    },
  },
}
</script>

<style>
.n-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding: 40px 0;
}

.n-empty-image {
  width: 160px;
}

.n-empty-image img,
.n-empty-image svg {
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.n-empty-image img {
  user-select: none;
  object-fit: contain;
}

.n-empty-image svg {
  fill: #dcdde0;
}

.n-empty-description {
  margin-top: 20px;
}

.n-empty-description p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.n-empty-bottom {
  margin-top: 20px;
}
</style>
