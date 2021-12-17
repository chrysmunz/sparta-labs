import moment from "moment";

export const getNameDay = (index: any) => {
  if (index === 0) {
    return 'Hoje'
  }

  if (index === 1) {
    return 'Amanhã'
  }

  const date = new Date();
  const numberDay = (date.getDay() + index) > 6
    ? date.getDay() + index - 7
    : date.getDay() + index;

  switch (numberDay) {
    case 0: return 'Domingo'
    case 1: return 'Segunda'
    case 2: return 'Terça'
    case 3: return 'Quarta'
    case 4: return 'Quinta'
    case 5: return 'Sexta'
    case 6: return 'Sábado'
  }
}

export const getDayMonth = (index: number) => {
  const date = new Date();

  date.setDate(date.getDate() + index);

  const day = moment(new Date(date)).format('D');
  let month = moment(new Date(date)).format('MM');

  switch (month) {
    case '01':
      month = 'janeiro';
      break;
    case '02':
      month = 'fevereiro';
      break;
    case '03':
      month = 'março';
      break;
    case '04':
      month = 'abril';
      break;
    case '05':
      month = 'maio';
      break;
    case '06':
      month = 'junho';
      break;
    case '07':
      month = 'julho';
      break;
    case '08':
      month = 'agosto';
      break;
    case '09':
      month = 'setembro';
      break;
    case '10':
      month = 'outubro';
      break;
    case '11':
      month = 'novembro';
      break;
    case '12':
      month = 'dezembro';
      break;
  }

  return `${day} de ${month}`;
}