<template>
  <div class="home">
    <imooc-loading v-if="loading">
      <div class="loading-text">
        数据大屏加载中...
      </div>
    </imooc-loading>
    <imooc-container :options="{width: 3840, height: 2160}" v-else>
      <div class="header">
        <top-header/>
      </div>
      <div class="separator-wrapper"/>
      <div class="center">
        <div class="left">
          <div class="left1">
            <total-user
              :today-user="todayUser"
              :growth-last-day="growthLastDay"
              :growth-last-month="growthLastMonth"
            />
          </div>
          <div class="left2">
            <average-age
              :data="ageData"
              :avg-age="averageAge"
            />
          </div>
          <div class="left3">
            <total-device
              :data="deviceData"
            />
          </div>
          <div class="left4">
            <total-gender
              :data="genderData"
            />
          </div>
          <div class="left5">
            <total-rider
              :data="riderData"
            />
          </div>
          <div class="left6">
            <hot-category
              :data="hotCategoryData"
            />
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <center-header
              :data="headerData"
            />
          </div>
          <div class="right-top2">
            <transform-category
              :data="['ALL','北京','上海','深圳','杭州','南京','武汉']"
            />
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <!--                <gdp-timeline-chart/>-->
                <!--                <jiangsu-map-warning/>-->
                <order-map/>
              </div>
              <div class="right-left2">
                <transform-category
                  :data="['订单量','销售额','用户数','退单量']"
                  :color="['rgb(178,209,126)','rgb(116,166,49)']"
                />
              </div>
              <div class="right-left3">
                <real-time-order :data="realTimeOrderData"/>
              </div>
              <div class="right-left4">
                <schedule-view :data="scheduleViewData"/>
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <sales-list :data="salesListData"/>
              </div>
              <div class="right-right2">
                <sales-rank :data="salesRankData"/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </imooc-container>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import useScreenData from '../hooks/useScreenData'
import ImoocLoading from '../components/ImoocLoading'
import ImoocContainer from '../components/Container'
import TopHeader from '../components/TopHeader/index'
import TotalUser from '../components/TotalUser/index'
import AverageAge from '../components/AverageAge/index'
import 'echarts/lib/chart/bar'
import TotalDevice from '../components/TotalDevice/index'
import TotalGender from '../components/TotalGender/index'
import TotalRider from '../components/TotalRider/index'
import HotCategory from '../components/HotCategoryData/index'
import CenterHeader from '../components/CenterHeader/index'
import TransformCategory from '../components/TransformCategory/index'
import SalesList from '../components/SalesList/index'
import OrderMap from '../components/OrderMap/index'
import RealTimeOrder from '../components/RealTimeOrder/index'
import ScheduleView from '../components/ScheduleView/index'
import SalesRank from '../components/SalesRank/index'

export default {
  name: 'Home',
  components: {
    SalesList,
    TransformCategory,
    CenterHeader,
    HotCategory,
    TotalRider,
    TotalDevice,
    AverageAge,
    TotalUser,
    TopHeader,
    ImoocContainer,
    ImoocLoading,
    TotalGender,
    OrderMap,
    RealTimeOrder,
    ScheduleView,
    SalesRank
  },
    setup () {
      const loading = ref(true)

      onMounted(() => {
        // 默认展示loading状态，2.5s后展示容器界面
        setTimeout(() => {
          loading.value = false
        }, 1000)
      })

      const screenData = useScreenData()

      return {
        loading,
        // 统一通过hook拿到业务数据
        ...screenData
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
        background: rgb(92, 88, 89);
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
            width: 100%;
            height: 48px;
            background: gray;
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
              margin-right: 20px;

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
