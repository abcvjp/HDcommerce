import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { BORKER_PROVIDER } from './broker.provider';

@Injectable()
export class BrokerService {
  constructor(
    @Inject(BORKER_PROVIDER) private readonly brokerClient: ClientKafka,
  ) {}
}
