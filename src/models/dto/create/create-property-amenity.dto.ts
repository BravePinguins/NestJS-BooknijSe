import { ApiProperty } from "@nestjs/swagger";

export class CreatePropertyAmenityDto {
  @ApiProperty({ example: "Parking", description: "Property amenity" })
  readonly value: string;
}
