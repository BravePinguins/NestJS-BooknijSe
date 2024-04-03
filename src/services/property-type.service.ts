import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EPropertyType, PropertyType } from "../models/property-type.model";
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
        { value: EPropertyType.APARTMENT, text: "Apartament" },
        { value: EPropertyType.HOUSE, text: "Dom" },
        { value: EPropertyType.BOAT, text: "Łódź" },
        { value: EPropertyType.TENT, text: "Namiot" },
        { value: EPropertyType.TREE_HOUSE, text: "Dom na drzewie" },
        {
          value: EPropertyType.CAMPER_TRAILER,
          text: "Kemping",
        },
        { value: EPropertyType.TOWER, text: "Wieża" },
        { value: EPropertyType.PALACE, text: "Pałac" },
        {
          value: EPropertyType.APARTMENT_WITH_SEA_VIEW,
          text: "Widok na morze",
        },
        { value: EPropertyType.FARM, text: "Farma" },
        { value: EPropertyType.ISLAND_CABIN, text: "Domek na wyspie" },
        { value: EPropertyType.MOUNTAIN_HOSTEL, text: "Schronisko górskie" },
        { value: EPropertyType.OTHER, text: "Inny" },
      ];

      propertyTypes.map(async (type) => {
        return await this.create(type);
      });
    }
  }
}
