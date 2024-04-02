import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({ type: 'number', example: 200 })
  public status: number;

  @ApiProperty()
  public data: T;

  @ApiProperty({ type: 'string', example: 'OK' })
  public message = 'OK';

  constructor(partial: Partial<BaseResponse<T>>) {
    Object.assign(this, partial);
  }
}
