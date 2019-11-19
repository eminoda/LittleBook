import Vue from 'vue';

Vue.directive('href', {
	bind: function(el, binding) {
		el.addEventListener('click', function() {
			window.location.href = binding.value;
		});
	}
});

Vue.directive('view-height', {
	inserted(el){
		console.log(el);
		const viewHeight = document.documentElement.clientHeight - el.getBoundingClientRect().top - 46;
		el.style.height = viewHeight + 'px';
	}
});
