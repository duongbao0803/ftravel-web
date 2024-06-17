export const renderStatusTag = (status: string | boolean) => {
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
    case true:
      statusText = "ĐANG HOẠT ĐỘNG";
      tagColor = "green";
      break;
    case false:
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
