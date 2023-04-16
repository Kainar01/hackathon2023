import { BadRequestException, Injectable } from '@nestjs/common';
import { Address, Carrier, Delivery, Request } from '@prisma/client';
import _ from 'lodash';

import { PrismaService } from '@/prisma';

import { DeliveryStatus } from './delivery.enum';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findDelivery(
    deliveryId: number,
  ): Promise<{ delivery: Delivery & { address: Address }; carrier: Carrier | null; request: Request }> {
    const delivery = await this.prisma.delivery.findFirst({
      where: { id: deliveryId },
      include: { carrier: true, address: true, userRequest: { include: { request: true } } },
    });

    if (!delivery) {
      throw new BadRequestException('Доставка не существует');
    }

    const { userRequest, carrier } = delivery;
    return {
      delivery: _.omit(delivery, 'userRequest', 'carrier'),
      request: userRequest.request,
      carrier,
    };
  }

  public async findCarrier(deliveryId: number): Promise<Carrier> {
    const carrier = await this.prisma.carrier.findFirst({ where: { id: deliveryId } });

    if (!carrier) {
      throw new BadRequestException('Курьер не существует');
    }

    return carrier;
  }

  public async create(data: CreateDeliveryDto): Promise<Delivery> {
    return this.prisma.delivery.create({
      data: {
        ...data,
        status: DeliveryStatus.PENDING,
        operatorCode: this.generateVerificationCode(),
        clientCode: this.generateVerificationCode(),
      },
    });
  }

  public async assignDeliveryFor(carrierId: number, deliveryId: number): Promise<void> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId, status: DeliveryStatus.PENDING } });

    if (!delivery) {
      throw new BadRequestException('Заказ уже не актуален');
    }

    await this.prisma.delivery.update({
      where: { id: delivery.id },
      data: { status: DeliveryStatus.ASSIGNED_CARRIER, carrierId },
    });
  }

  public async handDocsForDelivery(deliveryId: number, operatorCode: string): Promise<void> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId, status: DeliveryStatus.ASSIGNED_CARRIER } });

    if (!delivery) {
      throw new BadRequestException('Не актуальный заказ');
    }

    if (delivery.operatorCode !== operatorCode) {
      throw new BadRequestException('Не правильный код');
    }

    await this.prisma.delivery.update({ where: { id: delivery.id }, data: { status: DeliveryStatus.ON_DELIVERY } });
  }

  public async completeDelivery(deliveryId: number, clientCode: string): Promise<void> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId, status: DeliveryStatus.ON_DELIVERY } });

    if (!delivery) {
      throw new BadRequestException('Не актуальный заказ');
    }

    if (delivery.clientCode !== clientCode) {
      throw new BadRequestException('Не правильный код');
    }

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status: DeliveryStatus.COMPLETED, deliveredAt: new Date() },
    });
  }

  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
