export class AccountDto {
  id!: number;
  referralF1!: number;
  accountId!: number;
  accountRole!: string;
  avatar!: string;
  balance!: number;
  cluster!: number;
  createdAt!: string;
  deviceId!: string;
  email!: string;
  firstName!: string;
  hyraWalletAddress!: string;
  kycStatus!: string;
  lastName!: string;
  nickName!: string;
  parentReferralCode!: string;
  phone!: string;
  referralCode!: string;
  referralId!: number;
  referralPath!: string;
  referralTotal!: number;
  status!: string;
  subscriptionId!: string;
  referralRewardStatus!: string;
  detail: any;

  constructor(obj: any) {
    for (const key of Object.keys(obj)) {
      (this as any)[key] = obj[key];
    }
    this.detail = {
      job: "",
      dateOfBirth: "",
      gender: "",
      socialLink: {
        facebook: "",
        linkedIn: "",
        zalo: "",
        instagram: "",
        tiktok: "",
        twitter: ""
      }
    }
  }
}




