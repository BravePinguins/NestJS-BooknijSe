import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePropertyAmenityDto } from "src/models/dto/create/create-property-amenity.dto";
import { PropertyAmenity } from "src/models/property-amenity.model";

@Injectable()
export class PropertyAmenityService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(PropertyAmenity)
    private propertyAmenityRepository: typeof PropertyAmenity
  ) {}

  async gePropertyAmenityById(id: string) {
    const propertyAmenity = await this.propertyAmenityRepository.findOne({
      where: { id },
    });

    if (!propertyAmenity)
      throw new HttpException(
        `Property amenity with the given id ${id} does not exist`,
        HttpStatus.NOT_FOUND
      );

    return propertyAmenity;
  }

  async getAllPropertyAmenities() {
    return await this.propertyAmenityRepository.findAll();
  }

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async create(dto: CreatePropertyAmenityDto) {
    return await this.propertyAmenityRepository.create(dto);
  }

  private async seed() {
    const propertyAmenity = await this.propertyAmenityRepository.findOne();

    if (!propertyAmenity) {
      const propertyAmenities = [
        { value: "Wifi" },
        { value: "Kitchen" },
        { value: "Air Conditioning" },
        { value: "Heating" },
        { value: "Free Parking" },
        { value: "Pool" },
        { value: "Pet Friendly" },
        { value: "Gym" },
        { value: "Hot Tub" },
        { value: "Washer" },
        { value: "Dryer" },
        { value: "TV" },
        { value: "Essentials" },
        { value: "Shampoo" },
        { value: "Hangers" },
        { value: "Hair Dryer" },
        { value: "Iron" },
        { value: "Laptop Friendly Workspace" },
        { value: "Fireplace" },
        { value: "Elevator" },
        { value: "Buzzer/Wireless Intercom" },
        { value: "Doorman" },
        { value: "Smoke Detector" },
        { value: "Carbon Monoxide Detector" },
        { value: "First Aid Kit" },
        { value: "Safety Card" },
        { value: "Fire Extinguisher" },
        { value: "Lock on Bedroom Door" },
        { value: "Other" },
      ];

      propertyAmenities.map(async (amenity) => {
        return await this.create(amenity);
      });
    }
  }
}
