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
import { PropertyType } from "./property-type.model";

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

  @ForeignKey(() => PropertyType)
  @Column({ type: DataType.UUID })
  propertyTypeId: string;

  @BelongsTo(() => PropertyType)
  propertyType: PropertyType;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
