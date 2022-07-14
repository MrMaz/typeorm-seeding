import { PetSeeder } from './pet.seeder'
import { Seeder } from '../../../src/seeder'
import { User } from '../entities/User.entity'
import { UserFactory } from '../factories/user.factory'

export class UserSeeder extends Seeder<{ user: User }> {
  protected options = {
    factories: { user: UserFactory },
    seeders: [PetSeeder],
  }

  async run() {
    const userFactory = this.factory('user')
    await userFactory.createMany(10)
    await this.call()
  }
}
