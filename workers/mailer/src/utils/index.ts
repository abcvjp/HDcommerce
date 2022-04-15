import * as ejs from 'ejs';
import * as path from 'path';
export const generateMailContent = (data, templateFileName) =>
  ejs.renderFile(path.join(__dirname, `../templates/${templateFileName}.ejs`), {
    data,
  });
