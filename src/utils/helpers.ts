import { BaseResponse } from './base-response';

import { codeMapping } from './code-mapping';
export const baseResponse = (data: any, options?: any) => {
  return new BaseResponse(data, options);
};

export const baseResponseCreate = (data: any, module?: string) => {
  const message = `success create ${module || ''}`.trim();
  const code = codeMapping.SUCCESS.SUCCESS_CREATE;
  return new BaseResponse(data, { code, message });
};

export const baseResponseList = (data: any, module?: string) => {
  const message = `list ${module || ''}`.trim();
  const code = codeMapping.SUCCESS.SUCCESS_LIST;
  return new BaseResponse(data, { code, message });
};

export const baseResponseRead = (data: any, module?: string) => {
  const message = `read ${module || ''}`.trim();
  const code = codeMapping.SUCCESS.SUCCESS_READ;
  return new BaseResponse(data, { code, message });
};

export const baseResponseUpdate = (data: any, module?: string) => {
  const message = `success update ${module || ''}`.trim();
  const code = codeMapping.SUCCESS.SUCCESS_UPDATE;
  return new BaseResponse(data, { code, message });
};

export const baseResponseDelete = (data: any, module?: string) => {
  const message = `success delete ${module || ''}`.trim();
  const code = codeMapping.SUCCESS.SUCCESS_DELETE;
  return new BaseResponse(data, { code, message });
};
