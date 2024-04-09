import { ApiProperty } from "@nestjs/swagger";
import { EPropertyType } from "src/models/property-type.model";

export class CreatePropertyTypeDto {
  @ApiProperty({
    example: EPropertyType.APARTMENT,
    description: "Property type value",
  })
  readonly value: EPropertyType;

  @ApiProperty({ example: "Dom", description: "Property type text" })
  readonly text: string;
}
