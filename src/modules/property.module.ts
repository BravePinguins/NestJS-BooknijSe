import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PropertyController } from "src/controllers/property.controller";
import { PropertyAmenityMapper } from "src/models/property-amenity-mapper.model";
import { PropertyAmenity } from "src/models/property-amenity.model";
import { Property } from "src/models/property.model";
import { PropertyAmenityService } from "src/services/property-amenity.service";
import { PropertyService } from "src/services/property.service";
import { PropertyTypeService } from "../services/property-type.service";
import { PropertyType } from "../models/property-type.model";
import { PropertyTypeController } from "src/controllers/property-type.controller";

@Module({
  providers: [PropertyService, PropertyAmenityService, PropertyTypeService],
  controllers: [PropertyController, PropertyTypeController],
  imports: [
    SequelizeModule.forFeature([
      Property,
      PropertyAmenity,
      PropertyAmenityMapper,
      PropertyType,
    ]),
  ],
  exports: [PropertyService],
})
export class PropertyModule {}
