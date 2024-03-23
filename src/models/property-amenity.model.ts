import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Property } from "./property.model";
import { PropertyAmenityMapper } from "./property-amenity-mapper.model";

interface CreatePropertyAmenityAttr {
  value: string;
}

@Table({ tableName: "property_amenity", createdAt: false, updatedAt: false })
export class PropertyAmenity extends Model<
  PropertyAmenity,
  CreatePropertyAmenityAttr
> {
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

  @ApiProperty({ example: "Parking", description: "Property amenity" })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @BelongsToMany(() => Property, () => PropertyAmenityMapper)
  properties: Property[];
}
