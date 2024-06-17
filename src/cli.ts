import { CommandFactory } from "nest-commander";
import { AppModule } from "./app.module";

async function bootstrap() {
  console.log("Starting migration...");
  try {
    await CommandFactory.run(AppModule);
    console.log("Migration command executed.");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

bootstrap();
