import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PropertyType } from "../models/property-type.model";
import { CreatePropertyTypeDto } from "../models/dto/create/create-property-type.dto";

@Injectable()
export class PropertyTypeService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(PropertyType)
    private propertyTypeRepository: typeof PropertyType
  ) {}
  async getPropertyType(id: string) {
    const propertyType = await this.propertyTypeRepository.findOne({
      where: { id },
    });

    if (!propertyType)
      throw new HttpException(
        `Property type with the given id ${id} does not exist`,
        HttpStatus.NOT_FOUND
      );

    return propertyType;
  }
  async getAllPropertyTypes() {
    return await this.propertyTypeRepository.findAll();
  }

  async onApplicationBootstrap() {
    await this.seed();
  }
  private async create(dto: CreatePropertyTypeDto) {
    return await this.propertyTypeRepository.create(dto);
  }

  private async seed() {
    const propertyType = await this.propertyTypeRepository.findOne();
    if (!propertyType) {
      const propertyTypes = [
        { value: "Apartment" },
        { value: "House" },
        { value: "Villa" },
        { value: "Condo" },
        { value: "Cottage" },
        { value: "Bed & Breakfast" },
        { value: "Loft" },
        { value: "Townhouse" },
        { value: "Guesthouse" },
        { value: "Bungalow" },
        { value: "Chalet" },
        { value: "Farmstay" },
        { value: "Boat" },
        { value: "Tent" },
        { value: "Treehouse" },
        { value: "Camper/RV" },
        { value: "Other" },
      ];
      propertyTypes.map(async (type) => {
        return await this.create(type);
      });
    }
  }
}
