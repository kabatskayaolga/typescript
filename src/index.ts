interface ISeasonsPrice {
  lowSeason: number;
  highSeason: number;
}

enum RoomTypeEnum {
  STANDART = 'Standart',
  LUX = 'Lux',
}

interface IPrice {
  [RoomTypeEnum.STANDART]: ISeasonsPrice;
  [RoomTypeEnum.LUX]: ISeasonsPrice;
}

enum PaymentServiceEnum {
  PAYPAL = 'PayPal',
  VISA = 'Visa',
}

enum CurrencyEnum {
  UAH = 'UAH',
  USD = '$',
  EUR = '€',
}

interface IRoom {
  readonly roomNummer: number;
  readonly type: RoomTypeEnum;
}

class Room implements IRoom {
  get roomNummer(): number {
    return this._roomNumber;
  }

  get type(): RoomTypeEnum {
    return this._type;
  }

  constructor(
    private readonly _roomNumber: number,
    private readonly _type: RoomTypeEnum
  ) { }
}

interface IClient {
  firstName: string;
  lastname: string;
  birthYear: number;
}

class Client implements IClient {
  private uuid: number;

  get birthYear(): number {
    return this._birthYear;
  }

  constructor(
    public readonly firstName: string,
    public readonly lastname: string,
    private readonly _birthYear: number
  ) {
    this.uuid = generateUUID();
  }
}

const generateUUID = (): number => Math.floor(Math.random() / 1000000000000000000);

class Reservation {
  private uuid: number;

  constructor(
    public readonly checkinDate: string,
    public readonly numberOfDays: number,
    public readonly client: Client,
    public readonly room: Room,
    public readonly price: number,
    public readonly currency: CurrencyEnum
  ) {
    this.uuid = generateUUID();
  }
}

class PayPal {
  payment(amount: number): boolean {
    return true;
  }
}

class Visa {
  payment(amount: number): boolean {
    return true;
  }
}

class Hotel {
  private clients: Client[] = [];
  private rooms: Room[] = [];
  private reservations: Reservation[] = [];

  payPalPaymentService: PayPal;
  visaPaymentService: Visa;

  constructor(private price: IPrice) { }

  private payForStay(method: PaymentServiceEnum, amount: number): boolean {
    if (method === PaymentServiceEnum.PAYPAL) {
      return this.payPalPaymentService.payment(amount);
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (method === PaymentServiceEnum.VISA) {
      return this.visaPaymentService.payment(amount);
    }
  }

  private checkRoomAvailability(type: IRoom['type'], checkInDate: string, numberOfDays: number): boolean {
    //// some code;

    return true;
  }

  private addClient(
    firstName: IClient['firstName'],
    lastname: IClient['lastname'],
    birthYear: IClient['birthYear']
  ): Client {
    const client = new Client(firstName, lastname, birthYear);
    this.clients.push(client);
    return client;
  }

  addRoom(roomNumber: IRoom['roomNummer'], type: IRoom['type']): void {
    const room = new Room(roomNumber, type);
    this.rooms.push(room);
  }

  getActualPrice(type: RoomTypeEnum): number {
    const date = new Date();
    const monthNumber = date.getMonth();
    if (monthNumber >= 4 && monthNumber <= 10) {
      return this.price[type].highSeason;
    } else {
      return this.price[type].lowSeason;
    }
  }

  addReservation(
    // roomData
    type: RoomTypeEnum,
    checkInDate: string,
    numberOfDays: number,

    // clientData
    firstName: IClient['firstName'],
    lastname: IClient['lastname'],
    birthYear: IClient['birthYear'],

    // payment
    method: PaymentServiceEnum,
    currency: CurrencyEnum
  ): string {
    const isAvailableRoom = this.checkRoomAvailability(type, checkInDate, numberOfDays);
    const client = this.addClient(firstName, lastname, birthYear);
    const isClientCreated = !!client;

    const price = this.getActualPrice(type);
    const isPayed = this.payForStay(method, price);

    if (isAvailableRoom && isClientCreated && isPayed) {
      const room = this.rooms.find(room => room.type === type);
      const reservation = new Reservation(checkInDate, numberOfDays, client, room, price, currency);

      this.reservations.push(reservation);
      return 'Your reservation was successful';
    }

    return 'Your reservation failed';
  }
}
