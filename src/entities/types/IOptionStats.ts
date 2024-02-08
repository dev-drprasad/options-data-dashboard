type DateString = string;

interface IOptionStats {
  quotedate: DateString;
  symbol: string;
  volume_call: number;
  volume_put: number;
  volume_total: number;
  putcallratio: number;
  DNID: string;
}
