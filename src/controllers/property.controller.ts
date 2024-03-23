import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PropertyService } from "src/services/property.service";

@ApiTags("Property")
@Controller("property")
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
}
