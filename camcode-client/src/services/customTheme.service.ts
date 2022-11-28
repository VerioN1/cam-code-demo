import VarCodeAPI from './axios.config';
export const getCustomTheme = async (id: string) => {
  return await VarCodeAPI.get(`/customTheme/${id}`);
};
