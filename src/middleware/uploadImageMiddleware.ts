import koaBody from 'koa-body';

const upload = koaBody({multipart: true, formidable: {uploadDir: './uploads'}});

export default upload;
