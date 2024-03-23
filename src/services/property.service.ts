import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Property } from "src/models/property.model";

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property) private propertyRepository: typeof Property
  ) {}
}
