import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PropertyType } from "src/models/property-type.model";
import { PropertyTypeService } from "src/services/property-type.service";

@ApiTags("Property types")
@Controller("property-types")
export class PropertyTypeController {
  constructor(private propertyTypeService: PropertyTypeService) {}

  @Get("/")
  @ApiOperation({ summary: "Get all property types" })
  @ApiResponse({ status: 200, type: [PropertyType] })
  getAllPropertyTypes() {
    return this.propertyTypeService.getAllPropertyTypes();
  }
}
