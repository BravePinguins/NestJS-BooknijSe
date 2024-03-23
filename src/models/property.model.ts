import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { PropertyAmenity } from "./property-amenity.model";
import { PropertyAmenityMapper } from "./property-amenity-mapper.model";

@Table({ tableName: "property" })
export class Property extends Model<Property> {
  @ApiProperty({
    example: "0e631cae-9a35-4f86-b198-c0dbb762d808",
    description: "Unique uuid",
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @BelongsToMany(() => PropertyAmenity, () => PropertyAmenityMapper)
  propertyAmenities: PropertyAmenity[];

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
