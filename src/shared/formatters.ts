const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const formatCurrency = (value: number) => rupeeFormatter.format(value);

const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "long",
};

export const formatDateTime = (date: Date) => new Intl.DateTimeFormat("en-IN", FORMAT_OPTIONS).format(date);
