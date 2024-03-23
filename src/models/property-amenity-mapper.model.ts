import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Property } from "./property.model";
import { PropertyAmenity } from "./property-amenity.model";

@Table({
  tableName: "property_amenity_mapper",
  createdAt: false,
  updatedAt: false,
})
export class PropertyAmenityMapper extends Model<PropertyAmenityMapper> {
  @ApiProperty({
    example: "4714b63e-d984-11eb-b8bc-0242ac130003",
    description: "Unique Id",
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Property)
  @Column({ type: DataType.UUID })
  propertyId: string;

  @ForeignKey(() => PropertyAmenity)
  @Column({ type: DataType.UUID })
  propertyAmenityId: string;
}
