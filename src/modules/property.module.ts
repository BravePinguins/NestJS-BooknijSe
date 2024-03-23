import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PropertyController } from "src/controllers/property.controller";
import { PropertyAmenityMapper } from "src/models/property-amenity-mapper.model";
import { PropertyAmenity } from "src/models/property-amenity.model";
import { Property } from "src/models/property.model";
import { PropertyAmenityService } from "src/services/property-amenity.service";
import { PropertyService } from "src/services/property.service";

@Module({
  providers: [PropertyService, PropertyAmenityService],
  controllers: [PropertyController],
  imports: [
    SequelizeModule.forFeature([
      Property,
      PropertyAmenity,
      PropertyAmenityMapper,
    ]),
  ],
  exports: [PropertyService],
})
export class PropertyModule {}
