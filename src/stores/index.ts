import { defineStore } from "pinia";
import { getApiList } from "../api/index";
import type { Children, RootObject, ChinaAdd, ChinaTotal } from "./types";

export const useStore = defineStore("store1", {
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
  }),
  getters: {
    diseaseh5Shelf(state) {
      return state.list.diseaseh5Shelf;
    },
    localCityNCOVDataList(state) {
      return state.list.localCityNCOVDataList;
    },
  },
  actions: {
    async getList() {
      const result = await getApiList();
      this.list = result;
    },
  },
});
