import { UserRepository } from '../repositories/userRepository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async updateEmail(username: string, newEmail: string): Promise<void> {
    // ここでバリデーションロジックやビジネスロジックを実装する
    // 例えば、新しいメールが既存のものと異なるかのチェックなど

    await this.userRepository.updateEmail(username, newEmail)
  }
}
