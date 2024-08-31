import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Applications {
  @Prop({
    required: true,
  })
  companyId: string;
  
  @Prop({
    required: true,
  })
  userId: string;
}

export type ApplicationsDocument = Applications & Document;
export const ApplicationsSchema = SchemaFactory.createForClass(Applications);
