export interface ChinaTotal {
  suspect: number;
  local_acc_confirm: number;
  mtime: string;
  localConfirmAdd: number;
  mRiskTime: string;
  confirm: number;
  dead: number;
  noInfect: number;
  highRiskAreaNum: number;
  nowConfirm: number;
  heal: number;
  localWzzAdd: number;
  confirmAdd: number;
  deadAdd: number;
  mediumRiskAreaNum: number;
  nowSevere: number;
  showLocalConfirm: number;
  showlocalinfeciton: number;
  noInfectH5: number;
  localConfirmH5: number;
  nowLocalWzz: number;
  localConfirm: number;
  importedCase: number;
}

export interface ChinaAdd {
  noInfect: number;
  localConfirmH5: number;
  confirm: number;
  dead: number;
  nowConfirm: number;
  importedCase: number;
  localConfirm: number;
  noInfectH5: number;
  heal: number;
  suspect: number;
  nowSevere: number;
}

export interface ShowAddSwitch {
  confirm: boolean;
  suspect: boolean;
  dead: boolean;
  heal: boolean;
  nowConfirm: boolean;
  nowSevere: boolean;
  importedCase: boolean;
  all: boolean;
  noInfect: boolean;
  localConfirm: boolean;
  localinfeciton: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  nowConfirm: number;
  highRiskAreaNum: number;
  dead: number;
  mtime: string;
  showRate: boolean;
  showHeal: boolean;
  mediumRiskAreaNum: number;
  adcode: string;
  continueDayZeroLocalConfirmAdd: number;
  continueDayZeroLocalConfirm: number;
  confirm: number;
  heal: number;
  wzz: number;
  provinceLocalConfirm: number;
}

export interface Today {
  dead_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
  wzz_add: number;
  local_confirm_add: number;
  abroad_confirm_add: number;
}

export interface Total {
  nowConfirm: number;
  confirm: number;
  dead: number;
  adcode: string;
  wzz: number;
  mtime: string;
  heal: number;
  showHeal: boolean;
  provinceLocalConfirm: number;
  highRiskAreaNum: number;
  continueDayZeroConfirmAdd: number;
  showRate: boolean;
  mediumRiskAreaNum: number;
  continueDayZeroConfirm: number;
  continueDayZeroLocalConfirmAdd: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  // wzz_add: string;
  local_confirm_add: number;
}

export interface Total {
  nowConfirm: number;
  dead: number;
  continueDayZeroLocalConfirmAdd: number;
  continueDayZeroLocalConfirm: number;
  adcode: string;
  showHeal: boolean;
  mtime: string;
  confirm: number;
  heal: number;
  wzz: number;
  showRate: boolean;
  provinceLocalConfirm: number;
  mediumRiskAreaNum: number;
  highRiskAreaNum: number;
}

export interface Children {
  name: string;
  adcode: string;
  date: string;
  today: Today;
  total: Total;
}

export interface Children {
  adcode: string;
  date: string;
  today: Today;
  total: Total;
  children: Children[];
  name: string;
}

export interface AreaTree {
  today: Today;
  total: Total;
  children: Children[];
  name: string;
}

export interface Diseaseh5Shelf {
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
}

export interface LocalCityNCOVDataList {
  adcode: string;
  isUpdated: boolean;
  mtime: string;
  local_wzz_add: string;
  isSpecialCity: boolean;
  province: string;
  city: string;
  date: string;
  local_confirm_add: number;
  mediumRiskAreaNum: number;
  highRiskAreaNum: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  localCityNCOVDataList: LocalCityNCOVDataList[];
}
