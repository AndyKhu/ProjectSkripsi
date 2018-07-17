<template>
  <div>tes</div>
</template>
<script>
import Algorithm from '@/api/algorithm.js'
export default {
  mounted () {
    Algorithm.test(this).then(res => {
      console.log(res.data)
    })
  }
}
</script>
