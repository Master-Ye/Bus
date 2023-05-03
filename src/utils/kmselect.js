 const kmselect = (arr,km) => {
    return arr.filter((item) => {
      return item[item.length - 1] > (km*1000);
    });
  };
  export   default kmselect;