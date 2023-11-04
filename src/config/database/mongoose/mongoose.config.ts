import { SchemaOptions } from '@nestjs/mongoose';

export const dbSchemaOptions: SchemaOptions = {
  id: true,
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  toJSON: {
    virtuals: true,
    transform: (_, doc) => {
      delete doc._id;
      return doc;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, doc) => {
      delete doc._id;
      return doc;
    },
  },
};
