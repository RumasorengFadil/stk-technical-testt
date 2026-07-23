import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import appConfig from '@config/app.config';

describe('MailService', () => {
  let service: MailService;

  const mailerMock = {
    sendMail: jest.fn(),
  };

  const configMock = {
    appUrl: 'http://localhost:3000',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,

        // Mock MailerService
        {
          provide: MailerService,
          useValue: mailerMock,
        },

        // Mock appConfig injection
        {
          provide: appConfig.KEY,
          useValue: configMock,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
