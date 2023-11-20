exports.getTimeStamp = function() {

	let d = new Date();
	let s =
		this.leadingZeros(d.getFullYear(), 4) + '-' +
		this.leadingZeros(d.getMonth() + 1, 2) + '-' +
		this.leadingZeros(d.getDate(), 2) + ' 00:00:00';

	return s;
}

exports.getTimeStampEnd = function() {

	let d = new Date();
	let s =
		this.leadingZeros(d.getFullYear(), 4) + '-' +
		this.leadingZeros(d.getMonth() + 1, 2) + '-' +
		this.leadingZeros(d.getDate(), 2) + ' 23:59:59';

	return s;
}

exports.getYesterday = function() {
	let d = new Date();
	let s =
		this.leadingZeros(d.getFullYear(), 4) + '-' +
		this.leadingZeros(d.getMonth() + 1, 2) + '-' +
		this.leadingZeros(d.getDate() - 1, 2) + ' 00:00:00';

	return s;
}

exports.getWeekday = function() {
	let d = new Date();

	const year = d.getFullYear(); // 년
	const month = d.getMonth();   // 월
	const day = d.getDate();      // 일

	// 일주일 전
	// let re = new Date(new Date().setDate(day - 7)).getMonth() + 1;

	let s =
		this.leadingZeros(new Date(new Date().setDate(day - 7)).getFullYear(), 4) + '-' +
		this.leadingZeros(new Date(new Date().setDate(day - 7)).getMonth() + 1, 2) + '-' +
		this.leadingZeros(new Date(new Date().setDate(day - 7)).getDate(), 2) + ' 00:00:00';

	// console.log(s, 's')

	// console.log(year, month, day, 'Today')
	// console.log(re, 're')


	return s;
}

exports.getMonthday = function() {
	let d = new Date();

	const year = d.getFullYear(); // 년
	const month = d.getMonth();   // 월
	const day = d.getDate();      // 일

	let s =
		this.leadingZeros(new Date(new Date().setMonth(month - 1)).getFullYear(), 4) + '-' +
		this.leadingZeros(new Date(new Date().setMonth(month - 1)).getMonth() + 1, 2) + '-' +
		this.leadingZeros(new Date(new Date().setMonth(month - 1)).getDate(), 2) + ' 00:00:00';

	console.log(s, 's')

	return s;
}

exports.get3Monthday = function() {
  let d = new Date();

  const year = d.getFullYear(); // 년
  const month = d.getMonth();   // 월
  const day = d.getDate();      // 일

  let s =
    this.leadingZeros(new Date(new Date().setMonth(month - 1)).getFullYear(), 4) + '-' +
    this.leadingZeros(new Date(new Date().setMonth(month - 3)).getMonth() + 1, 2) + '-' +
    this.leadingZeros(new Date(new Date().setMonth(month - 1)).getDate(), 2) + ' 00:00:00';

  console.log(s, 's')

  return s;
}

exports.get6Monthday = function() {
  let d = new Date();

  const year = d.getFullYear(); // 년
  const month = d.getMonth();   // 월
  const day = d.getDate();      // 일

  let s =
    this.leadingZeros(new Date(new Date().setMonth(month - 1)).getFullYear(), 4) + '-' +
    this.leadingZeros(new Date(new Date().setMonth(month - 6)).getMonth() + 1, 2) + '-' +
    this.leadingZeros(new Date(new Date().setMonth(month - 1)).getDate(), 2) + ' 00:00:00';

  console.log(s, 's')

  return s;
}

exports.getFirstDayOfMonth = function() {
	let d = new Date();

	const year = d.getFullYear(); // 년
	const month = d.getMonth();   // 월

	// 이번달 첫날
	let s =
		this.leadingZeros(year, 4) + '-' +
		this.leadingZeros(month + 1, 2) + '-01 00:00:00';

	console.log(s, 's')

	return s;
}

exports.getYearday = function () {
  let d = new Date();

  const year = d.getFullYear(); // 년
  const month = d.getMonth();   // 월
  const day = d.getDate();      // 일

  let s =
      this.leadingZeros(d.getFullYear() - 1, 4) + '-' +
      this.leadingZeros(d.getMonth() + 1, 2) + '-' +
      this.leadingZeros(d.getDate(), 2) + ' 00:00:00';

  return s;

}

exports.leadingZeros = function(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (let i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

exports.getDate = function(){
	let eDate = this.getTimeStampEnd()
	let sDate = this.getYesterday()

	return [sDate, eDate]
}

exports.setTodayDate = function() {
	return [this.getTimeStamp(), this.getTimeStampEnd()]
}

exports.setWeekDate = function() {
	return [this.getWeekday(), this.getTimeStampEnd()]
}

exports.setMonthDate = function() {
	return [this.getMonthday(), this.getTimeStampEnd()]
}

exports.setYearDate = function () {
  return [this.getYearday(), this.getTimeStampEnd()]
}

exports.set3MonthDate = function() {
  return [this.get3Monthday(), this.getTimeStampEnd()]
}

exports.set6MonthDate = function () {
  return [this.get6Monthday(), this.getTimeStampEnd()]
}

exports.setThisMonthDate = function () {
	return [this.getFirstDayOfMonth(), this.getTimeStamp()]
}
