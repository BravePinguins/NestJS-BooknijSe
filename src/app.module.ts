import { Property } from "src/models/property.model";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { PropertyAmenity } from "./models/property-amenity.model";
import { PropertyAmenityMapper } from "./models/property-amenity-mapper.model";
import { PropertyModule } from "./modules/property.module";
import { UserModule } from "./modules/user.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Property, PropertyAmenity, PropertyAmenityMapper],
      autoLoadModels: true,
    }),
    PropertyModule,
    UserModule,
  ],
})
export class AppModule {}
