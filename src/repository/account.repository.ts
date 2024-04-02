import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityRepository } from 'typeorm';

export class AccountRepository {
  constructor(@InjectDataSource() readonly connection: DataSource) { }

  async findAccountF1(userId: number, status: string, search: string) {
    // console.log('findAccountF1');
    return this.connection.query(
      `SELECT count(*) AS num FROM account a 
      LEFT JOIN balance b ON a.id = b.id 
      WHERE a.referral_id = ${userId} 
      AND IF("${status}" = 'active' ,  b.referral_reward_status = 'COMPLETED' , true) 
      AND IF("${status}" = 'inactive' ,  b.referral_reward_status != 'COMPLETED' , true) 
      AND IF("${search}" != '' , a.email LIKE '%${search}%' OR  a.phone LIKE '%${search}%', true)`);

  }

  async queryAccountByReferral(
    id: number,
    limit: number,
    page: number,
    status: string,
    search: string
  ) {
    const offset = (page - 1) * limit;
    return this.connection.query(
      `WITH ids AS (
        SELECT a.id,b.referral_reward_status AS referral_status 
        FROM account a 
        LEFT JOIN balance b ON a.id = b.id 
        WHERE a.referral_id = ${id} 
          AND IF("${status}" = 'active' ,  b.referral_reward_status = 'COMPLETED' , true) 
          AND IF("${status}" = 'inactive' ,  b.referral_reward_status != 'COMPLETED' , true) 
          AND IF("${search}" != '' , a.email LIKE '%${search}%' OR  a.phone LIKE '%${search}%', true) 
        ORDER BY id DESC 
        LIMIT ${limit} OFFSET ${offset} 
      )
      SELECT a.*,ids.referral_status 
      FROM account a 
      JOIN ids ON a.id = ids.id `
    );

    // return this.connection.query(
    //   `WITH ids AS (
    //     SELECT id FROM account
    //     WHERE referral_id = ${id}
    //     ORDER BY id DESC
    //     LIMIT ${limit} OFFSET ${offset}
    //   )
    //   SELECT a.*,b.referral_reward_status AS referral_status
    //   FROM account a JOIN ids ON a.id = ids.id
    //   LEFT JOIN balance b ON ids.id = b.id`
    // );
  }
  // async queryPhoneJoin(phoneNumbers: string[]): Promise<any> {
  //   const sqlQuery = `
  //     SELECT 
  //       phone_num,
  //       IF(account.phone IS NOT NULL, 'YES', 'NO') AS fr
  //     FROM 
  //       (SELECT ? AS phone_num) AS phone_numbers
  //     LEFT JOIN 
  //       account ON phone_numbers.phone_num = account.phone;
  //   `;
  //  await this.connection.query(sqlQuery, [phoneNumbers]);
  // }

  // async fetchPhoneStatus(phone: string[]): Promise<any> {
  //   const placeholders = phone.map(() => '?').join(', ');

  //   const sqlQuery = `
  //     SELECT 
  //       phone_num,
  //       IF(account.phone IS NOT NULL, 'YES', 'NO') AS fr
  //     FROM 
  //       (SELECT ${placeholders} AS phone_num) AS phone_numbers
  //     LEFT JOIN 
  //       account ON phone_numbers.phone_num = account.phone;
  //   `;

  //   return await this.connection.query(sqlQuery, phone);
  // }

}
