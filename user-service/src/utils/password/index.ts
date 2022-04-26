import * as bcrypt from 'bcrypt';

const saltOrRound = 10;
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltOrRound);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
