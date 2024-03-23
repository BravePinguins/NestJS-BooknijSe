import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as cors from "cors";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle("Booknij SE")
    .setDescription("REST Api Documentation")
    .addBearerAuth()
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      maxAge: 63158411826,
      cookie: { secure: false, maxAge: 63158411826 },
    })
  );

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
