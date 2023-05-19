import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../domain/user/entity/user.entity";

export const userRepositoryMock = { provide: getRepositoryToken(UserEntity),
    useValue: {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  }