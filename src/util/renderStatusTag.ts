export const renderStatusTag = (status: string) => {
  let tagColor = "";
  let statusText = "";

  switch (status) {
    case "ACTIVE":
      statusText = "ĐANG HOẠT ĐỘNG";
      tagColor = "green";
      break;
    case "INACTIVE":
      statusText = "KHÔNG HOẠT ĐỘNG";
      tagColor = "red";
      break;
    default:
      statusText = "UNKNOWN";
      tagColor = "gray";
      break;
  }

  return {
    statusText: statusText,
    tagColor: tagColor,
  };
};
