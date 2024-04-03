import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  DefaultScope,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Property } from "./property.model";

export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

@DefaultScope(() => ({
  attributes: { exclude: ["password"] },
}))
@Table({ tableName: "user" })
export class User extends Model<User> {
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

  @ApiProperty({ example: "Kacper", description: "User first name" })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: "Kowalski", description: "User last name" })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: "test@gmail.com", description: "User email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "+48123123123", description: "User phone number" })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @ApiProperty({ example: "kot12345678", description: "User password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: "dsaafaf21yg218gd81bdyduabdha",
    description: "User salt",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  salt: string;

  @ApiProperty({
    example: "Mam piękne domki nad wodą",
    description: "User description",
  })
  @Column({ type: DataType.STRING(5000), allowNull: true })
  description: string;

  @ApiProperty({ example: ROLE.USER, description: "Unique name of role" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  role: ROLE;

  @ApiProperty({ example: "dsad23321kdask21", description: "Unique Token" })
  @Column({ type: DataType.STRING, allowNull: true })
  currentTokenId: string | null;

  @HasMany(() => Property, { onDelete: "cascade" })
  properties: Property[];
}
