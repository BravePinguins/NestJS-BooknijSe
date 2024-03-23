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
    example: "Duży dom",
    description: "Tytuł oferty",
  })
  @Column({
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: "Duży dom z trzema łóżkami i mikrofalą",
    description: "Opis oferty",
  })
  @Column({
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: "Kraków",
    description: "Nazwa miasta",
  })
  @Column({
    allowNull: false,
  })
  city: string;

  @ApiProperty({
    example: "Polska",
    description: "Nazwa państwa",
  })
  @Column({
    allowNull: false,
  })
  country: string;

  @ApiProperty({
    example: "30-800",
    description: "Kod pocztowy",
  })
  @Column({
    allowNull: false,
  })
  post_code: string;

  @ApiProperty({
    example: "os. Ptaka 17",
    description: "Nazwa ulicy/osiedla",
  })
  @Column({
    allowNull: false,
  })
  street: string;

  @ApiProperty({
    example: "30.15",
    description: "Szerokość geograficzna",
  })
  @Column({
    allowNull: false,
  })
  latitude: string;

  @ApiProperty({
    example: "40.8",
    description: "Długość geograficzna",
  })
  @Column({
    allowNull: false,
  })
  longitude: string;

  @ApiProperty({
    example: "true",
    description: "Czy jest dostępna oferta do wynajęcia",
  })
  @Column({
    allowNull: false,
  })
  is_available: boolean;

  @ApiProperty({
    example: "false",
    description: "Czy oferta jest aktywna",
  })
  @Column({
    allowNull: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: "300zł",
    description: "Koszt za jedną noc",
  })
  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  price_per_night: number;

  @ApiProperty({
    example: "4",
    description: "Ilość dostępnych łóżek",
  })
  @Column({
    allowNull: false,
    defaultValue: 1,
  })
  beds: number;

  @ApiProperty({
    example: "40m^2",
    description: "Wielkość nieruchomości",
  })
  @Column({
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
