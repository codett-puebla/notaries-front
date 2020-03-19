export class TransactionModel {
  id: number;
  // tslint:disable-next-line:variable-name
  writing_number: string;
  volume: string;
  date: Date;
  folio: string;
  granters: any[];
  documents: any[];
  // tslint:disable-next-line:variable-name
  first_notification_certificate: string;
  // tslint:disable-next-line:variable-name
  transfer_membership_payment_fees: string;
  // tslint:disable-next-line:variable-name
  expedition_testimony: string;
  registry: string;
  // tslint:disable-next-line:variable-name
  name_testimony: string;
  // tslint:disable-next-line:variable-name
  firm_testimony: string;
  // tslint:disable-next-line:variable-name
  date_testimony: string;
  // tslint:disable-next-line:variable-name
  name_antecedent: string;
  // tslint:disable-next-line:variable-name
  firm_antecedent: string;
  // tslint:disable-next-line:variable-name
  date_antecedent: string;
  // tslint:disable-next-line:variable-name
  contract_id: number;
  // tslint:disable-next-line:variable-name
  quotation_id: number;
  idUser: number;
  idCompany: number;
  status: number;
}

