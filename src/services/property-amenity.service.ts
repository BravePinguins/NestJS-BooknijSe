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
        { value: "WiFi" },
        { value: "Kuchnia" },
        { value: "Klimatyzacja" },
        { value: "Ogrzewanie" },
        { value: "Darmowy parking" },
        { value: "Basen" },
        { value: "Zwierzęta akceptowane" },
        { value: "Siłownia" },
        { value: "Jacuzzi" },
        { value: "Pralka" },
        { value: "Suszarka" },
        { value: "Telewizor" },
        { value: "Podstawowe artykuły higieniczne" },
        { value: "Szampon" },
        { value: "Wieszaki" },
        { value: "Suszarka do włosów" },
        { value: "Żelazko" },
        { value: "Przyjazne miejsce do pracy na laptopie" },
        { value: "Kominek" },
        { value: "Winda" },
        { value: "Domofon/Interkom bezprzewodowy" },
        { value: "Czujnik dymu" },
        { value: "Czujnik tlenku węgla" },
        { value: "Apteczka" },
        { value: "Karta bezpieczeństwa" },
        { value: "Gaśnica" },
        { value: "Zamek w drzwiach sypialni" },
        { value: "Inne" },
      ];

      propertyAmenities.map(async (amenity) => {
        return await this.create(amenity);
      });
    }
  }
}
