import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from '../repository/repository';
import { Decimal } from 'decimal.js';
import { camelCase } from "typeorm/util/StringUtils";

@Injectable()
export class SettingService {
  constructor(private readonly repository: Repository) { }

  throwError(msg: string) {
    return {
      status: 'ERROR',
      message: msg
    }
  }

  // settingCluster:any;
  // settingReferral :any;

  // async getReferralRate(){
  //   if(!this.settingReferral){
  //     this.settingReferral = await this.getFirstByCode('REFERRAL');
  //   }
  //   return this.settingReferral;
  // }

  // async getClusterLevel(userActive: number) {
  //   // const settingInfo = await this.taskRepo.findSettingInfo('CLUSTER');
  //   if(!this.settingCluster){
  //     this.settingCluster = await this.getListByCode('CLUSTER');
  //   }
  //   const clusterLv = this.settingCluster.filter((obj:any) => obj.number <= userActive).map((obj:any) => obj.number);
  //   clusterLv.push(0);
  //   return Math.max(...clusterLv);
  // }

  // async getRewardBonusRate(clusterLevel: number) {
  //   // const settingInfo = await this.taskRepo.findSettingInfo('CLUSTER');
  //   if(!this.settingCluster){
  //     this.settingCluster = await this.getListByCode('CLUSTER');
  //   }
  //   const cluster = this.settingCluster.find((item: any) => {
  //     // const value = JSON.parse(item.value);
  //     if (item.number === Number(clusterLevel)) {
  //       return item;
  //     }
  //   });
  //   if (cluster) {
  //     return cluster.rate;
  //   }
  // }

  async getFirstByCode(code: string) {
    let list = await this.repository.getSetting(code);
    if (list && list.length) {
      let setting = list[0];
      let value = JSON.parse(setting.value);
      return value;
    }
  }
  async getListByCode(code: string) {
    let list = await this.repository.getSetting(code);
    if (list) {
      return list.map((obj: any) => (JSON.parse(obj.value)))
    }
  }


  getPaginate(totalPages: number, totalItems: number, currentPage: number) {
    return {
      totalPages,
      totalItems,
      currentPage
    }
  }

  getPage(min: number, max: number, page: number) {
    return Math.max(min, Math.min(max, page));
  }

  getSize(min: number, max: number, size: number) {
    return Math.max(min, Math.min(max, size));
  }

  toObj(obj: any) {
    const objWithCamelCaseKey = {};
    for (const key of Object.keys(obj)) {
      objWithCamelCaseKey[camelCase(key)] = obj[key];
    }
    return objWithCamelCaseKey;
  }

  toAcc(obj: any) {
    let amount = obj.balance ? obj.balance : 0;
    obj.id = Number(obj.id);
    obj.account_id = Number(obj.id);
    obj.balance = amount !== null ? new Decimal(amount).toNumber() : 0;
    obj.cluster = Number(obj.cluster);
    obj.referralF1 = Number(obj.referralf1);
    obj.referral_id = Number(obj.referral_id);
    // obj.referral_path = Number(obj.referral_path);
    obj.referral_total = Number(obj.referral_total);
    delete obj.referralf1;
    return obj;
  }
}
