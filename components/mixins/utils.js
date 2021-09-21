import {format, startOfDay,} from 'date-fns'
import Vue from 'vue';
import {FLASK_UNREACHABLE_MESSAGE, PLONE_UNREACHABLE_MESSAGE} from '../configs/plone_keywords';
import {server_settings} from '../configs/server_settings'
import {VUEX_NAMESPACE} from '../../store/globalstate';

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
  obj.$store.set('globalstate/error_message', message);
}

export function write_aria_polite(that, message) {
  if (Vue.prototype.$isServer) {
  } else {
    that.$store.ep_set(VUEX_NAMESPACE, 'aria_polite', message)
  }
}

export function write_aria_assertive(that, message) {
  if (Vue.prototype.$isServer) {
  } else {
    that.$store.ep_set(VUEX_NAMESPACE, 'aria_assertive', message)
  }
}

export async function get_plone_data(that, url) {
  that.$axios.setHeader('Content-Type', 'application/json', ['get']);
  that.$axios.setHeader('Accept', 'application/json', ['get']);
  that.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
  that.$axios.setHeader('Access-Control-Request-Method', 'GET', ['get'])
  try {
    return await that.$axios.$get(url);
  } catch (e) {
    console.log(e.message);
    console.log(e.stack);
    set_error_message(that, PLONE_UNREACHABLE_MESSAGE);
  }
}


export async function get_flask_data(that, channel, params) {
  that.$axios.setHeader('Content-Type', 'application/json', ['get']);
  that.$axios.setHeader('Accept', 'application/json', ['get']);
  that.$axios.setHeader('Access-Control-Allow-Origin', '*', ['get']);
  try {
    var url = server_settings.FLASK_URL + '/' + channel;
    return await that.$axios.$post(url, params);
  } catch (e) {
    console.log(e.message);
    console.log(e.stack);
    set_error_message(that, FLASK_UNREACHABLE_MESSAGE);
  }
}


export function Box() {
    var length = 0;
    var items = {};
    this.add = function(k, v) {
        if (!(k in items))
            length++; // don't count twice
        items[k] = v;
    }
    this.get = function(k) {
        return items[k];
    }
    this.delete = function(k) {
        if (k in items)
            length--;
        delete items[k];
    }
    this.__defineGetter__("length", function() {
        return length;
    });
}
