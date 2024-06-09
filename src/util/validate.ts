export const validatePhoneNumber = (_: unknown, value: string) => {
  const phoneNumberPattern = /^[0-9]{10}$/;
  if (value && !phoneNumberPattern.test(value)) {
    return Promise.reject(new Error("Số điện thoại phải có 10 số"));
  }
  return Promise.resolve();
};

export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}

export function formatDate2(dateString: string | number | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
