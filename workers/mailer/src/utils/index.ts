import * as ejs from 'ejs';
import * as path from 'path';
export const generateMailContent = (
  data: any,
  templateFileName: string,
): string =>
  ejs.renderFile(
    path.join(__dirname, `../templates/${templateFileName}.ejs`),
    data,
  );
