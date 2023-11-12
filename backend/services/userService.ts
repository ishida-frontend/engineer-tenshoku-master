import { UserRepository } from '../repositories/userRepository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async updateEmail(username: string, newEmail: string): Promise<void> {
    await this.userRepository.updateEmail(username, newEmail)
  }
}
