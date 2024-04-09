import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Property } from "./property.model";

export enum EPropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  VILLA = "VILLA",
  BOAT = "BOAT",
  TENT = "TENT",
  TREE_HOUSE = "TREE_HOUSE",
  CAMPER_TRAILER = "CAMPER_TRAILER",
  TOWER = "TOWER",
  PALACE = "PALACE",
  APARTMENT_WITH_SEA_VIEW = "APARTMENT_WITH_SEA_VIEW",
  FARM = "FARM",
  ISLAND_CABIN = "ISLAND_CABIN",
  MOUNTAIN_HOSTEL = "MOUNTAIN_HOSTEL",
  OTHER = "OTHER",
}

interface CreatePropertyTypeAttr {
  value: EPropertyType;
  text: string;
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

  @ApiProperty({
    example: EPropertyType.APARTMENT,
    description: "Property type value",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  value: EPropertyType;

  @ApiProperty({ example: "Dom", description: "Property type text" })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @HasMany(() => Property)
  property: Property[];
}
