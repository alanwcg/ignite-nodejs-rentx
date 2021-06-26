import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private message: ISendMailDTO[] = [];

  async sendMail(data: ISendMailDTO): Promise<void> {
    this.message.push(data);
  }
}

export default MailProviderInMemory;
