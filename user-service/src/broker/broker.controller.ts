import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BrokerService } from './broker.service';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}
}
