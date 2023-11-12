import { UserRepository } from '../repositories/userRepository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async updateEmail(username: string, newEmail: string): Promise<void> {
    console.log('username:', username)
    console.log('newEmail:', newEmail)
    await this.userRepository.updateEmail(username, newEmail)
  }
}
