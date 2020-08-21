<template>
  <div class="home">
    <Nav :activeIndex=activeIndex />
    <div>
      <br>dfdsfdsfdsf<br>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
export default {
  name: 'Home',
  data() {
    return {
      activeIndex: '1'
    }
  },
  components: {
    Nav,
    Footer
  }
}
</script>

<style>

</style>