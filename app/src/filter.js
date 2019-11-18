import Vue from 'vue';
import moment from 'moment';
Vue.filter('timeUnix', function(value, format) {
	return value ? moment.unix(value).format(format || 'YYYY-MM-DD HH:mm:ss') : '';
});
