import {endOfDay, format, startOfDay,isSameDay,} from 'date-fns'

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:MM';
export const DATE_DISPLAY_FORMAT = 'd MMMM yyyy';

export function dateTime2dateStr(dateTime) {
  return format(dateTime, DATE_FORMAT)
}

export function dateStr2dateTime(dateStr) {
  return Date.parse(dateStr)
}

export function dateTime2dateTimeStr(dateTime) {
  return format(dateTime, DATE_TIME_FORMAT)
}

export function dateTime2date(dateTime) {
  return startOfDay(dateTime);
}

export function dateTime2dateDomain(dateTime) {
  return [startOfDay(dateTime), endOfDay(dateTime)];
}

export function dateTimeSpan2str(dateTimeSpan) {
  if (dateTimeSpan == null) {return ''}
  if (isSameDay(dateTimeSpan[0], dateTimeSpan[1])) {
    return dateTime2dateStr(dateTimeSpan[0])
  } else {
    return dateTime2dateStr(dateTimeSpan[0])+' - '+ dateTime2dateStr(dateTimeSpan[1])
  }

}

export function clean_date_field_in_request(request, field) {
  let datetime = request[field];
  let date = dateTime2date(datetime);

  request[field] = dateTime2dateStr(date);

  return request;
}

export function str2FloatTuple(string) {
  string = string.replace('[', '');
  string = string.replace(']', '');
  let string_values = string.split(',');
  let res = [];
  string_values.forEach(function (str) {
    res.push(parseFloat(str))
  });
  return res;
}

export function hour_format(value1, value2) {
  // convert float to nice time display
  var hours1 = Math.floor(value1);
  var minutes1 = (value1 - hours1) * 60;
  var hours2 = Math.floor(value2);
  var minutes2 = (value2 - hours2) * 60;

  var res = hours1.toString() + ':';
  if (minutes1 < 10) {
    res += '0'
  }
  res += minutes1.toString() + '-' + hours2.toString() + ':';
  if (minutes2 < 10) {
    res += '0'
  }
  res += minutes2.toString();
  return res
}

export function remove_element_from_array(array, value) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array
}

export function format_plone_date(date_string) {
  return date_string.split('T')[0]
}

export function removeSelfClosingTags(html) {
  // this is ugly but we need it to clean plone html
  var split = html.split("/>");
  var newHtml = "";
  for (var i = 0; i < split.length - 1;i++) {
    var edsplit = split[i].split("<");
    newHtml += split[i] + "></" + edsplit[edsplit.length - 1].split(" ")[0] + ">";
  }
  return newHtml + split[split.length-1];
}
