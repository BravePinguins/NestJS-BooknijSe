import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Property } from "./property.model";

interface CreatePropertyTypeAttr {
  value: string;
}

@Table({ tableName: "property_type", createdAt: false, updatedAt: false })
export class PropertyType extends Model<PropertyType, CreatePropertyTypeAttr> {
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

  @ApiProperty({ example: "Flat", description: "Property type" })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @HasMany(() => Property)
  property: Property[];
}
