export enum TaskStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export enum JobStatus {
  ACTIVE,
  INACTIVE,
  NEW,
}

export enum JobType {
  TRAIN,
  TEST,
  PREDICT,
}

export enum TransactionType {
  REWARD = 'REWARD',
  WITHDRAW = 'WITHDRAW',
  REFUND = 'REFUND',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'SUCCESS',
  DELETE = 'DELETE',
}

export enum RewardType {
  TRAIN = 'TRAIN',
  REFERRAL = 'REFERRAL',
  CLUSTER = 'CLUSTER',
  POOL = 'POOL',
}
export enum Calculation {
  PLUS = 'PLUS',
  SUBTRACTION = 'SUBTRACTION',
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum BannerStatus {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE'
}

export enum NotificationLevel{
  NONE = 'NONE',
  IMPORTANT = 'IMPORTANT' ,
  URGENT = 'URGENT'
}

export enum NotificationType{
  EVENT = 'EVENT',
  SYSTEM = 'SYSTEM',
  NEWS  = 'NEWS',
  ORTHER = 'ORTHER'
}

export enum NotificationName{
  AIEARNHUB = 'AIEARNHUB',
  HYPERASCHAIN = 'HYPERASCHAIN',
  ACTOVIST = 'ACTOVIST'
}

export enum NotificationStatus{
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum AccountStatus{
  active = 'active',
  inactive = 'inactive'
}
