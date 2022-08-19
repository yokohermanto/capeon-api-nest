import { BaseResponse } from 'src/utils/base-response';
// import { baseResponse } from 'src/utils/helpers';
export const baseResponse = (data: any, options?: any) => {
  return new BaseResponse(data, options);
};
