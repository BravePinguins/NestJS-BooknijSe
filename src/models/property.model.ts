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

  @ApiProperty({
    example: "Big house",
    description: "Offer title",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: "Large house with three beds and a microwave",
    description: "Property description",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: "Kraków",
    description: "City name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({
    example: "Polska",
    description: "Country name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({
    example: "30-800",
    description: "Post code",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postCode: string;

  @ApiProperty({
    example: "os. Ptaka 17",
    description: "Street/neighbourhood name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({
    example: "30.15",
    description: "Latitude",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  latitude: string;

  @ApiProperty({
    example: "40.8",
    description: "Longitude",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  longitude: string;

  @ApiProperty({
    example: "true",
    description: "Is the property available for rent?",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isAvailable: boolean;

  @ApiProperty({
    example: "false",
    description: "Is the offer active?",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: boolean;

  @ApiProperty({
    example: "300",
    description: "Cost per night",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  pricePerNight: number;

  @ApiProperty({
    example: "4",
    description: "Number of available beds",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  beds: number;

  @ApiProperty({
    example: "40",
    description: "Size of the property.",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  size: number;

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
