<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left">
      <ul class="panel">
        <li>
          <h5>较上日 {{ store.chinaAdd.localConfirmH5 }}</h5>
          <h5>{{ store.chinaAdd.localConfirm }}</h5>
          <h5>本土现有确诊</h5>
        </li>
        <li>
          <h5>较上日{{ store.chinaTotal.confirmAdd }}</h5>
          <h5>{{ store.chinaTotal.nowConfirm }}</h5>
          <h5>现有确诊</h5>
        </li>
        <li>
          <h5>较上日{{ store.chinaAdd.confirm }}</h5>
          <h5>{{ store.chinaTotal.confirm }}</h5>
          <h5>累计确诊</h5>
        </li>
        <li>
          <h5>较上日{{ store.chinaAdd.noInfect }}</h5>
          <h5>{{ store.chinaTotal.noInfect }}</h5>
          <h5>无症状感染者</h5>
        </li>
        <li>
          <h5>较上日{{ store.chinaAdd.importedCase }}</h5>
          <h5>{{ store.chinaTotal.importedCase }}</h5>
          <h5>境外输入</h5>
        </li>
        <li>
          <h5>较上日{{ store.chinaAdd.dead }}</h5>
          <h5>{{ store.chinaTotal.dead }}</h5>
          <h5>累计死亡</h5>
        </li>
      </ul>
      <div class="pie" id="pie"></div>
    </div>
    <div class="box-center" id="china-map"></div>
    <div class="box-right">
      <table>
        <thead>
          <tr>
            <td>日期</td>
            <td>地区</td>
            <td>今日累计</td>
            <td>总共累计</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.item" :key="item.name">
            <td>{{ item.date }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isReactive, onMounted, onUpdated, reactive } from "vue";
import { useStore } from "./stores/index";
import * as echarts from "echarts";
import "./assets/china.js";
import { geoCoordMap } from "./stores/geomap";
import bg from "./assets/bg.jpg";
import { isTemplateNode } from "@vue/compiler-core";
let flag = false;
const store = useStore();
onMounted(async () => {
  await store.getList();
  InitChart();
  InitCovid();
  InitPie();
});

const InitChart = () => {
  let chart = echarts.init(document.querySelector("#china-map") as HTMLElement);
  let city = store.diseaseh5Shelf.areaTree[0].children;
  store.item = city[10].children;

  let data = city.map((v) => {
    // console.log(v.name, geoCoordMap[v.name].concat(v.total.nowConfirm));
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    };
  });
  // console.log(data);

  let option = {
    tooltip: {
      trigger: "item",
      show: true,
      formatter(params: any) {
        return `${params.name}: ${params.data.value[2]}`;
      },
      backgroundColor: "rgba(50,50,50,0.7)",
    },
    geo: {
      map: "china",
      roam: false, // 一定要关闭拖拽
      zoom: 1.23,
      center: [105, 36], // 调整地图位置
      label: {
        show: false, //关闭省份名展示
        fontSize: "10",
        color: "rgba(0,0,0,0.7)",
        distance: 10,
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: "#0d0059",
          borderColor: "#389dff",
          borderWidth: 1, //设置外层边框
          shadowBlur: 5,
          shadowOffsetY: 8,
          shadowOffsetX: 0,
          shadowColor: "#01012a",
        },
        emphasis: {
          areaColor: "#184cff",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        opacity: 0.5,
      },
    },
    series: [
      {
        name: "china-map",
        type: "map",
        map: "china",
        roam: false,
        zoom: 1.23,
        center: [105, 36],
        // geoIndex: 1,
        // aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          show: false,
          color: "rgba(255,255,255,.6)",
          emphasis: {
            show: false,
            textStyle: {
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            areaColor: "#0d0059",
            borderColor: "#389dff",
            borderWidth: 0.5,
          },
          emphasis: {
            areaColor: "#17008d",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 5,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        data: data,
      },
      {
        name: "Top 5",
        type: "scatter",
        symbol: "pin",
        symbolSize: [35, 35],
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        label: {
          show: true,
          color: "#fff",
          formatter(params: any) {
            return params.data.value[2];
          },
        },
        itemStyle: {
          normal: {
            show: false,
            color: "#00ffff", //标志颜色
          },
        },
        data: data,
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        hoverAnimation: true,
        zlevel: 1,
      },
    ],
  };
  chart.on("click", (params: any) => {
    store.item = params.data.children;
    console.log(store.item);
  });
  chart.setOption(option);
};
const InitCovid = () => {
  store.chinaAdd = store.diseaseh5Shelf.chinaAdd;
  store.chinaTotal = store.diseaseh5Shelf.chinaTotal;
};

const InitPie = () => {
  let pie = echarts.init(document.querySelector("#pie") as HTMLElement);
  let data = store.diseaseh5Shelf.areaTree[0].children
    .map((v) => ({
      name: v.name,
      value: v.total.confirm,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  // console.log(data);
  let option = {
    title: {
      text: "省top10新冠总计感染人数",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: `{b} : {c} ({d}%)`,
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 0,
      top: 20,
      bottom: 5,
      textStyle: {
        color: "#fff",
      },
      data: data,
    },
    series: [
      {
        name: "省份",
        type: "pie",
        data: data,
        radius: "50%",
        label: {},
        center: ["50%", "50%"],
      },
    ],
  };
  pie.setOption(option);
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
body,
#app,
.box {
  height: 100vh;
}
.box {
  display: flex;
  align-items: stretch;
  &-left,
  &-center,
  &-right {
    flex-grow: 1;
    display: flex;
  }
  &-left {
    // background-color: green;
    display: block;
    .panel {
      display: flex;
      flex-wrap: wrap;
      height: 40%;
      width: 100%;
      color: white;
      list-style: none;
      background-color: rgba(128, 128, 128, 0.3);
      li {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 33%;
        height: 50%;
      }
    }
    .pie {
      height: 60%;
      widows: 100%;
    }
  }
  &-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 2;
    // background-color: white;
    align-items: stretch;
  }
  &-right {
    // background-color: red;
  }
}
table {
  width: 100%;
  height: 100%;
  color: white;
}
</style>
