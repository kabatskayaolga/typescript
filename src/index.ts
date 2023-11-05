/* eslint-disable no-console */
interface IBankClient {
  readonly firstName: string;
  readonly lastName: string;
}

enum CurrencyTypesEnum {
  USD = 'usd',
  EUR = 'eur',
  UAH = 'uah',
}

interface ICurrencyConversationStrategy {
  convert(amount: number, currency: CurrencyTypesEnum): number;
}

interface IObserver {
  update(account: IObservable): void;
}

interface IObservable {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(account: BankAccount): void;
}

enum StatusEnum {
  OPEN = 'open',
  CLOSED = 'closed',
}

const exchangeRates = {
  [CurrencyTypesEnum.USD]: 1.1,
  [CurrencyTypesEnum.EUR]: 0.9,
  [CurrencyTypesEnum.UAH]: 38,
};

class CurrentRateConversationStrategy implements ICurrencyConversationStrategy {
  constructor(private exchangeRates: Record<CurrencyTypesEnum, number>) { }

  public convert(amount: number, currency: CurrencyTypesEnum): number {
    const rate = this.exchangeRates[currency];

    if (!rate) throw new Error(`Exchange rate not available for currency ${currency}`);

    return amount * rate;
  }
}

class FixedRateConversationStrategy implements ICurrencyConversationStrategy {
  private fixedRate!: number;

  constructor(fixedRate: number) {
    this.fixedRate = fixedRate;
  }

  public convert(amount: number, currency: CurrencyTypesEnum): number {
    return amount * this.fixedRate;
  }
}

abstract class Observable implements IObservable {
  private readonly observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) this.observers.push(observer);
  }

  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (!~observerIndex) this.observers.splice(observerIndex, 1);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

abstract class Command {
  constructor(protected bankAccount: BankAccount) { }

  abstract execute(): void;
  abstract undo(): void;
}

class Deposite extends Command {
  constructor(
    private amount: number,
    private currency: CurrencyTypesEnum,
    bankAccount: BankAccount
  ) {
    super(bankAccount);
    this.bankAccount = bankAccount;
  }

  execute(): void {
    this.bankAccount.deposite(this.amount, this.currency);
  }

  undo(): void {
    this.bankAccount.withdraw(this.amount, this.currency);
  }
}

class Withdraw extends Command {
  constructor(
    private amount: number,
    private currency: CurrencyTypesEnum,
    bankAccount: BankAccount
  ) {
    super(bankAccount);
    this.bankAccount = bankAccount;
  }

  execute(): void {
    this.bankAccount.withdraw(this.amount, this.currency);
  }

  undo(): void {
    this.bankAccount.deposite(this.amount, this.currency);
  }
}

class Transactions {
  private history: Command[] = [];

  executeCommand(command: Command): void {
    this.history.push(command);
    command.execute();
  }

  undoLastCommand(): void {
    if (this.history.length > 0) {
      const lastCommand = this.history.pop();
      lastCommand.undo();
    }
  }
}

class BankAccount extends Observable {
  private readonly _currency: CurrencyTypesEnum;
  private readonly _number: number;
  private status: StatusEnum = StatusEnum.OPEN;
  private _balance = 0;
  private _holder: IBankClient;
  private _conversionStrategy: ICurrencyConversationStrategy;

  public get number(): number {
    return this._number;
  }

  public get balance(): number {
    return this._balance;
  }

  public set conversionStrategy(conversionStrategy: ICurrencyConversationStrategy) {
    this._conversionStrategy = conversionStrategy;
  }

  public get currency(): CurrencyTypesEnum {
    return this._currency;
  }

  constructor(client: IBankClient, currency: CurrencyTypesEnum, conversionStrategy: ICurrencyConversationStrategy) {
    super();
    this._currency = currency;
    this._holder = client;
    this._number = 123213213;
    this._conversionStrategy = conversionStrategy;
  }

  public holder(): IBankClient {
    return this._holder;
  }

  public deposite(amount: number, currency: CurrencyTypesEnum): void {
    const convertedAmount = this._conversionStrategy.convert(amount, currency);
    this._balance += convertedAmount;
    this.notify();
  }

  public withdraw(amount: number, currency: CurrencyTypesEnum): void {
    const convertedAmount = this._conversionStrategy.convert(amount, currency);
    this._balance -= convertedAmount;
    this.notify();
  }

  public closeBankAccount(): void {
    this.status = StatusEnum.CLOSED;
  }
}

class SMSNOtification implements IObserver {
  update(account: BankAccount): void {
    console.log(`notification: Ypur account balance has changed. Current balance: ${account.balance}`);
  }
}
class EmailNOtification implements IObserver {
  update(account: BankAccount): void {
    console.log(`notification: Ypur account balance has changed. Current balance: ${account.balance}`);
  }
}
class PushNOtification implements IObserver {
  update(account: BankAccount): void {
    console.log(`notification: Ypur account balance has changed. Current balance: ${account.balance}`);
  }
}

class Bank {
  private static instance: Bank;
  private accounts: BankAccount[] = [];

  private constructor() { }

  public static getInstance(): Bank {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  private isAlreadyCreatedBankAccountWithSameCurrency(client: IBankClient, currency: CurrencyTypesEnum): boolean {
    return this.accounts.some(account => {
      const { firstName, lastName } = account.holder();
      return firstName === client.firstName && lastName === client.lastName && account.currency === currency;
    });
  }

  public createBankAccount(
    client: IBankClient,
    currency: CurrencyTypesEnum,
    conversionStrategy: ICurrencyConversationStrategy
  ): BankAccount | string {
    if (this.isAlreadyCreatedBankAccountWithSameCurrency(client, currency)) {
      return `Bank Account for ${client.firstName} ${client.lastName} in ${currency} currency has already been created`;
    }

    const account = new BankAccount(client, currency, conversionStrategy);
    this.accounts.push(account);
    return account;
  }

  public closeBankAccount(client: IBankClient, currency: CurrencyTypesEnum): string {
    const account = this.accounts.find(account => {
      const { firstName, lastName } = account.holder();
      return firstName === client.firstName && lastName === client.lastName && account.currency === currency;
    });

    account.closeBankAccount();
    return `Bank Account for ${client.firstName} ${client.lastName} in ${currency} has been closed`;
  }
}

/* const currentRatesStrategy = new CurrentRateConversationStrategy(exchangeRates);

const client = { firstName: 'John', lastName: 'Doe' };
const bank = Bank.getInstance();
const account1 = bank.createBankAccount(client, CurrencyTypesEnum.USD, currentRatesStrategy);
const account2 = bank.createBankAccount(client, CurrencyTypesEnum.USD, currentRatesStrategy);
const account3 = bank.createBankAccount(client, CurrencyTypesEnum.UAH, currentRatesStrategy);

bank.closeBankAccount(client, CurrencyTypesEnum.USD);
const transactions = new Transactions();

if (account1 instanceof BankAccount) {
  const deposit1CommandForAccount1 = new Deposite(20, CurrencyTypesEnum.EUR, account1);
  const deposit2CommandForAccount1 = new Deposite(20, CurrencyTypesEnum.EUR, account1);
  transactions.executeCommand(deposit1CommandForAccount1);
  transactions.executeCommand(deposit2CommandForAccount1);
}

transactions.undoLastCommand();
 */
