import { ApiProperty } from "@nestjs/swagger";

export class CreatePropertyTypeDto {
  @ApiProperty({ example: "Flat", description: "Property type" })
  readonly value: string;
}
