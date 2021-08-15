<template>
  <div class="home">
    <imooc-loading v-if="loading">
      <div class="loading-text">
        数据大屏加载中...
      </div>
    </imooc-loading>
    <imooc-container :options="{width: 3840, height: 2160}" v-else>
      <div class="header">
        111
      </div>
      <div class="separator">
        222
      </div>
      <div class="center">
        <div class="left">
          <div class="left1">333</div>
          <div class="left2">444</div>
          <div class="left3">555</div>
          <div class="left4">666</div>
          <div class="left5">777</div>
          <div class="left6">888</div>
        </div>
        <div class="right">
          <div class="right-top1">999</div>
          <div class="right-top2">000</div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">111</div>
              <div class="right-left2">222</div>
              <div class="right-left3">333</div>
              <div class="right-left3">444</div>
            </div>
            <div class="right-right">
              <div class="right-right1">555</div>
              <div class="right-right2">666</div>
            </div>
          </div>
        </div>

      </div>
    </imooc-container>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import ImoocLoading from '../components/ImoocLoading'
  import ImoocContainer from '../components/Container'

  export default {
    name: 'Home',
    components: {
      ImoocContainer,
      ImoocLoading
    },
    setup () {
      const loading = ref(true)

      onMounted(() => {
        // 默认展示loading状态，2.5s后展示容器界面
        setTimeout(() => {
          loading.value = false
        }, 1000)
      })

      return {
        loading
      }
    }
  }
</script>

<style lang="scss">
  .home {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(29, 29, 29);
    color: #fff;
    font-size: 48px;

    #imooc-container {
      display: flex;
      flex-direction: column;

      .header {
        height: 167px;
        margin-top: 10px;
      }

      .separator-wrapper {
        height: 10px;
      }

      .center {
        flex: 1;
        display: flex;

        .left {
          flex: 0 0 860px;
          display: flex;
          flex-direction: column;
          width: 860px;
          height: 100%;
          margin: 0 10px;
          box-sizing: border-box;
          background: rgb(60, 61, 64);

          .left1, .left2, .left3, .left4, .left5, .left6 {
            padding-bottom: 20px;
          }

          .left1 {
            height: 300px;
          }

          .left2 {
            height: 320px;
          }

          .left3 {
            height: 280px;
          }

          .left4 {
            height: 230px;
          }

          .left5 {
            height: 360px;
          }

          .left6 {
            height: 360px;
          }
        }

        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 0 10px;
          max-width: 2960px;
          overflow: hidden;

          .right-top1 {
            height: 206px;
            margin-bottom: 20px;
          }

          .right-top2 {
            height: 48px;
            margin-bottom: 20px;
          }

          .right-bottom {
            flex: 1;
            display: flex;

            .right-left {
              display: flex;
              flex-direction: column;
              width: 1917px;

              .right-left1 {
                height: 999px;
                background: #42b983;
              }

              .right-left2 {
                height: 80px;
                padding-top: 20px;
                box-sizing: border-box;
                background: green;
              }

              .right-left3 {
                height: 350px;
                margin-top: 10px;
                background: red;

                .dv-border-box-8 {
                  width: 100%;
                  height: 100%;
                  padding: 5px;
                  box-sizing: border-box;
                  background: rgb(66, 68, 70);
                  border-radius: 10px;
                  box-shadow: 10px 10px 10px rgba(0, 0, 0, .3);
                }
              }

              .right-left4 {
                height: 220px;
                margin-top: 10px;
              }
            }

            .right-right {
              flex: 1;
              display: flex;
              flex-direction: column;
              margin-left: 10px;

              .right-right1 {
                width: 100%;
                height: 999px;
                padding-right: 10px;
                box-sizing: border-box;
                background: antiquewhite;
              }

              .right-right2 {
                width: 100%;
                height: 650px;
                margin-top: 20px;
                background: rebeccapurple;
              }
            }
          }
        }
      }
    }

  }

  .loading-text {
    font-size: 20px;
  }
</style>
