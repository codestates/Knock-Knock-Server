/** @format */

import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection()
  .then(() => {
    console.log(`it's done!`);
  })
  .catch((error) => console.log(error));
