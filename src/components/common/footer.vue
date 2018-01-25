<template>
  <section class="footer">
    <div class="mid-box">
      <router-link class="logo-box" to="/business"><img src="../../assets/images/logo.png"></router-link>
      <p>
        营销精英 Copyright © 2017-2018  All Rights Reserved 上海竣钧科技信息有限公司<br>
        <a href="http://socialmarketingcloud.com">socialmarketingcloud.com</a>
        沪ICP备17053300号
      </p>
    </div>
  </section>
</template>
<script>
export default {
}
</script>
<style lang="scss">
  .footer {
    width: 100%;
    height: 90px;
    background: #000000;
    z-index: 99;

    .mid-box {
      width: 1160px;
      margin: auto;
      overflow: hidden;

      p {
        float: left;
        font-size: 12px;
        color: #ffffff;
        line-height: 24px;
        margin-top: 21px;

        a {
          color: #ffffff;
        }
      }
    }

    .logo-box {
      float: left;
      width: 80px;
      height: 50px;
      margin: 20px 0 0 0;

      img {
        height: 50px;
      }
    }
  }
</style>
