import {endOfDay, format, startOfDay, isSameDay,} from 'date-fns'
import {EV} from "../configs/events";

export const DATE_FORMAT = 'YYYY-MM-DD';

// Datepicker has different mapping of uppercase and lowercase letters for dates
export const DATE_DISPLAY_FORMAT = 'yyyy-MM-dd';

export function datetoUTC(dateTime) {
  var utc = new Date(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(),
    dateTime.getUTCHours(), dateTime.getUTCMinutes(), dateTime.getUTCSeconds());

  return utc;
}

export function dateTime2dateStr(dateTime) {
  return format(dateTime, DATE_FORMAT)
}

export function dateStr2dateTime(dateStr) {
  return Date.parse(dateStr)
}

export function dateTime2date(dateTime) {
  return startOfDay(dateTime);
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
  for (var i = 0; i < split.length - 1; i++) {
    var edsplit = split[i].split("<");
    newHtml += split[i] + "></" + edsplit[edsplit.length - 1].split(" ")[0] + ">";
  }
  return newHtml + split[split.length - 1];
}

export function get_tag_for_namespace(obj) {
  let tag = obj.$vnode.tag;
  if (tag === undefined) {
    return ''
  }
  tag = tag.replace('-', '');
  return tag
}

export function set_error_message(obj, message) {
  obj.$store.ep_commit('GlobalState', 'error_message', message);
}
