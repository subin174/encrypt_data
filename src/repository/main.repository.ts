import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  Calculation,
  RewardType,
  TaskStatus,
  TransactionStatus,
  TransactionType,
} from '../config/enum';
import { Decimal } from 'decimal.js';

export class Repository {
  constructor(@InjectDataSource() readonly connection: DataSource) { }

  async findTaskByIdAndOwnerIdAndStatus(id: number) {
    return this.connection.query(`SELECT * FROM task where id = ${id}`);
  }

  async findTaskById(id: number) {
    return this.connection.query(`SELECT * FROM task where id = ${id}`);
  }

  // async completeTask(
  //   id: number,
  //   body: any,
  //   ownerId: number,
  //   queryRunner: QueryRunner,
  // ) {
  //   const result = JSON.stringify(body).replace(/"/g,"\\"');
  //   // console.log('completeTask",id,body,ownerId);
  //   return queryRunner.manager.query(
  //     `UPDATE task SET status ="${
  //       TaskStatus.SUCCESS
  //     }",owner_id = ${ownerId},result = "${result}" WHERE id = ${Number(id)}`,
  //   );
  // }

  async completeTask(
    id: number,
    body: any,
    ownerId: number
  ) {
    const result = JSON.stringify(body).replace(/"/g, '\\"');
    return this.connection.query(
      `UPDATE task SET status ="${TaskStatus.SUCCESS}",owner_id = ${ownerId},result = "${result}" WHERE id = ${Number(id)}`,
    );
  }

  // async createTx(
  //   amount: Decimal,
  //   calculation: Calculation,
  //   note: string,
  //   owner_id: number,
  //   reward_type: RewardType,
  //   status: TransactionStatus,
  //   type: TransactionType,
  //   updated_at: any,
  //   queryRunner: QueryRunner,
  // ) {
  //   return queryRunner.manager.query(`
  //     INSERT INTO transaction(amount, calculation, note, owner_id, reward_type, status, type, created_at) VALUES (
  //       ${amount}, "${calculation}", "${note}", ${owner_id}, "${reward_type}", "${status}", "${type}", STR_TO_DATE(REPLACE("${updated_at}","Z", ""),"%Y-%m-%dT%H:%i:%s.%f')
  //     )
  //   `);
  // }

  async createTx(
    amount: Decimal,
    calculation: Calculation,
    note: string,
    owner_id: number,
    reward_type: RewardType,
    status: TransactionStatus,
    type: TransactionType,
    updated_at: any
  ) {
    return this.connection.query(`
      INSERT INTO transaction(amount, calculation, note, owner_id, reward_type, status, type, created_at) VALUES (
        ${amount}, "${calculation}", "${note}", ${owner_id}, "${reward_type}", "${status}", "${type}", STR_TO_DATE(REPLACE("${updated_at}","Z", ""),"%Y-%m-%dT%H:%i:%s.%f")
      )
    `);
  }

  async findSettingInfo(type: string) {
    return this.connection.query(`
      SELECT * FROM setting where code = "${type}"
    `);
  }

  async findUserBalance(ownerId: number) {
    return this.connection.query(`SELECT * FROM balance where id = ${ownerId}`);
  }

  async countUserActive(userId: number) {
    return this.connection.query(`SELECT count(*) AS num FROM balance WHERE referral_id = ${userId} AND referral_reward_status = "COMPLETED"`);
  }

  // async updateBalance(
  //   ownerId: number,
  //   cluster: Decimal,
  //   pool: Decimal,
  //   referral: Decimal,
  //   share: Decimal,
  //   total: Decimal,
  //   train: Decimal,
  //   status: string,
  //   queryRunner: QueryRunner,
  // ) {
  //   // console.log('updateBalance",ownerId,cluster,pool,referral,share,total,train,status);
  //   return queryRunner.manager.query(`
  //     UPDATE balance SET cluster = ${cluster}, pool = ${pool}, referral=${referral}, share=${share}, total=${total}, train=${train}, referral_reward_status = "${status}"  WHERE id = ${ownerId}
  //   `);
  // }

  async updateBalance(
    ownerId: number,
    cluster: Decimal,
    pool: Decimal,
    referral: Decimal,
    share: Decimal,
    total: Decimal,
    train: Decimal,
    status: string
  ) {
    return this.connection.query(
      `UPDATE balance SET cluster = ${cluster}, pool = ${pool}, referral=${referral}, share=${share}, total=${total}, train=${train}, referral_reward_status = "${status}"  WHERE id = ${ownerId}`);
  }

  async updateTotalReferralBalance(total_referral: Decimal, referralF1: number, ownerId: number) {
    return this.connection.query(
      `UPDATE balance SET total_referral = ${total_referral} , total = cluster + pool + referral + train + ${total_referral} ,referralf1 = ${referralF1} WHERE id = ${ownerId}`,
    );
  }

  async updateTotalReferralBalanceNew(total_referral: Decimal, ownerId: number) {
    return this.connection.query(
      `UPDATE balance SET total_referral = ${total_referral} , total = cluster + pool + referral + train + ${total_referral} WHERE id = ${ownerId}`,
    );
  }

  async updateTypeBalance(total_referral: Decimal, clusterLevel: number, referralActive: number, ownerId: number) {
    return this.connection.query(
      `UPDATE balance SET cluster_level = ${clusterLevel}, referralf1 =  ${referralActive}, total_referral = ${total_referral} , total = cluster + pool + referral + train + ${total_referral} WHERE id = ${ownerId}`,
    );
  }

  async sumF1Balance(ownerId: number) {
    return this.connection.query(
      `SELECT sum(share) FROM balance where referral_id = ${ownerId}`
    );
  }

  async createBalance(ownerId: number, referralId: number, referralF1: number, createAt: any,) {
    return this.connection.query(
      `INSERT INTO balance (id,created_at,cluster,cluster_level,pool,referral,referral_id,referral_reward_status,share,total,train,wallet,referralf1,total_referral) VALUES (${ownerId},STR_TO_DATE(REPLACE("${createAt}","Z", ""),"%Y-%m-%dT%H:%i:%s.%f"),0,0,0,0, ${referralId},"APPROVED",0,0,0,"",${referralF1},0)`
    );
  }

  async accountInfor(ownerId: number) {
    return this.connection.query(
      `SELECT * FROM account WHERE id = ${ownerId}`
    );
  }

  async countReferral(referralPath: string) {
    return this.connection.query(
      `SELECT count(*) AS num FROM account WHERE referral_path LIKE "${referralPath}"`
    );
  }

  async countReferralId(userId: number) {
    return this.connection.query(
      `SELECT count(*) AS num FROM account WHERE referral_id = "${userId}"`
    );
  }

  async countReferralTotal(referralPath: string) {
    return this.connection.query(
      `SELECT count(*) AS num FROM account WHERE referral_path LIKE "${referralPath}%"`
    );
  }

  async countReferralTotalNew(referralPath: string) {
    return this.connection.query(
      `SELECT count(*) AS num FROM account WHERE referral_path REGEXP "${referralPath}"`
    );
  }

  async updateReferral(referral: number, referralTotal: number, cluster: number, userId: number) {
    return this.connection.query(
      `UPDATE account SET referralf1 = ${referral} ,referral_total = ${referralTotal} , cluster = ${cluster} WHERE id = ${userId}`
    );
  }

  async getByDate(ownerId: number, date: string) {
    return this.connection.query(
      `SELECT * FROM background_mode WHERE owner_id = ${ownerId} AND date = "${date}"`
    );
  }

  async getSetting(code: string) {
    return this.connection.query(
      `SELECT * FROM setting WHERE code = "${code}"`
    );
  }

  async createBgMode(ownerId: number, start: number, date: string) {
    return this.connection.query(
      `INSERT INTO background_mode (owner_id,reward,status,time,start,date) VALUES (${ownerId},0,"PENDING",0,${start},"${date}")`
    );
  }

  async saveAccount(obj: any) {
    return this.connection.query(
      `INSERT INTO account 
        (id, account_id, account_role, avatar, balance, cluster, created_at, email, first_name, hyra_wallet_address, kyc_status, last_name,
          phone, referral_code, referralf1, referral_id, referral_path, referral_total, status, referral_reward_status)
        VALUES (${obj.id}, ${obj.id}, "${obj.accountRole}", "${obj.avatar}", 0, 0, STR_TO_DATE( "${obj.createdAt}", "%Y-%m-%dT%H:%i:%s.%f"),
          "${obj.email}","${obj.firstName}", "${obj.hyraWalletAddress}", "${obj.kycStatus}", "${obj.lastName}", "${obj.phone}",
          "${obj.referralCode}", ${obj.referralF1}, ${obj.presenterId}, "${obj.referralPath}",  ${obj.referralTotal}, "ACTIVE","NONE")`
    );
  }

  async checkAccount(userId: number) {
    return this.connection.query(`SELECT count(*) AS user FROM account WHERE id = ${userId}`);
  }

  async completeBgMode(id: number, reward: number, time: number) {
    return this.connection.query(
      `UPDATE background_mode SET reward = ${reward} ,time = ${time},status = "COMPLETE" WHERE id = ${id}`
    );
  }

  async getBgById(id: number) {
    return this.connection.query(`SELECT * FROM background_mode WHERE id = ${id}`);
  }

  async totalBalance() {
    return this.connection.query(`SELECT sum(total) FROM balance`);
  }

  async totalUser() {
    return this.connection.query(`SELECT count(id) FROM balance`);
  }

  async queryRewardLimitOffset(
    id: number,
    rewardType: string,
    limit: number,
    offset: number,
  ) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT * FROM transaction WHERE owner_id = ${id} AND reward_type = "${rewardType}" ORDER BY id DESC LIMIT ${limit} OFFSET ${newOffset}`);
  }

  async queryToLimitOffset(id: number, limit: number, offset: number) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT * FROM transaction WHERE owner_id = ${id} ORDER BY id DESC LIMIT ${limit} OFFSET ${newOffset}`);
  }

  async queryTransTypeLimitOffset(
    id: number,
    rewardType: string,
    limit: number,
    offset: number,
  ) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT t1.* 
      FROM transaction AS t1
      JOIN ( 
        SELECT id FROM transaction
        WHERE owner_id = ${id} AND reward_type = "${rewardType}" 
        ORDER BY id DESC LIMIT ${limit} OFFSET ${newOffset}
      ) AS t2 ON t1.id = t2.id `
    );
  }

  async queryTransLimitOffset(id: number, limit: number, offset: number) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT t1.* 
      FROM transaction AS t1
      JOIN (
          SELECT id FROM transaction
          WHERE owner_id = ${id}
          ORDER BY id DESC  LIMIT ${limit} OFFSET ${newOffset}
      ) AS t2 ON t1.id = t2.id `);
  }

  async queryEvenReward(limit: number, offset: number) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT b.*,a.first_name,a.last_name,a.email,a.phone,a.avatar FROM balance b left join account a ON b.id = a.id ORDER BY b.total DESC LIMIT ${limit} OFFSET ${newOffset}`
    );
  }

  async queryEvenReferral(limit: number, offset: number) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT a.* FROM  account a  ORDER BY a.referralf1 DESC , id  LIMIT ${limit} OFFSET ${newOffset}`
    );
  }

  async queryAllByUserId(id: number) {
    return this.connection.query(
      `SELECT * FROM transaction where owner_id = ${id} limit 20`
    );
  }

  async getById(userId: number, id: number) {
    return this.connection.query(
      `SELECT * FROM transaction where owner_id = ${userId} and id = ${id}`,
    );
  }

  async getRewardRank(total: Decimal) {
    return this.connection.query(`SELECT count(id) AS myRank FROM balance where total > ${total}`);
  }

  async getRewardInfor(userId: number) {
    return this.connection.query(
      `SELECT b.*,a.first_name,a.last_name,a.email,a.phone,a.avatar FROM balance b left join account a ON b.id = a.id WHERE b.id = ${userId}`
    );
  }

  async checkPrize(event: number, userId: number) {
    return this.connection.query(`SELECT * FROM prize WHERE  event =  ${event} AND owner_id = ${userId} `);
  }

  async queryPrizeReward(limit: number, offset: number, event: number) {
    const newOffset = (offset - 1) * limit;
    return this.connection.query(
      `SELECT b.*,a.first_name,a.last_name,a.email,a.phone,a.avatar FROM prize b left join account a ON b.owner_id = a.id WHERE b.event = ${event} ORDER BY b.rank LIMIT ${limit} OFFSET ${newOffset}`
    );
  }

  async findAccountsPhoneReg(phoneNumbers: string) {
    return this.connection.query(
      `SELECT count(*) as num FROM account where phone REGEXP '${phoneNumbers}'`
    );
  }

  async getListUserEn() {
    console.log('encryptUser rp');
    return await this.connection.query(
      `SELECT * FROM account`
    );
  }

  async encryptEmail(userId: number, encryptedEmail: string) {
    return await this.connection.query(
      `UPDATE account SET email = ? WHERE id = ?`,
      [encryptedEmail, userId]
    );
  }

}

