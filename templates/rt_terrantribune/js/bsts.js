(function($){
 var doc = $(document);
 doc.ready(function(){
	 var page = $('#page-bg');
	 var overlay = $('#agreement_overlay');
	 var container = $('#agreement_container');
	 var warning = $('#warning');
	 var terms = $('#agreement_content');
	 var path = '/templates/rt_terrantribune_j15/bsts/terms.html #';
	 //var main = $('#main-section');
	 
	 // Reorganize overlay divs
	 layoutSetup();

	 // Activate popup if user clicks a link on the BSTS page and
	 // does not have cookie
	 $('#bsts a').each(function(){
	   $(this).click(function(){
			 if(cookieExists()) {
				 return true;
			 }
			 else{
				 overlay.removeClass('hidden');
				 container.removeClass('hidden');
				 if(warning.length > 0){
					 warning.empty();
					 warning.addClass('hidden');
				 }
				 terms.load(path + 'english');
				 return false;
			 }
	   });
	 });

	 $('#language input').click(function(){
		 loadLanguage($(this).val());
		 });

	 // Popup close button
	 $('#close_button').click(function(){
		 overlay.addClass('hidden');
		 container.addClass('hidden');
		 return false;
	 });

	 // Clicking button to accept the terms
	 $('#accept_button').click(function(){
		 var textInputs = $('#accept_terms :text');
		 var checked = $('#accept_terms :checkbox:checked').length;
		 var empty = emptyVals(textInputs);

		 // Check to make sure there aren't already error messages
		 if(warning.length > 0){
		   warning.empty();
		 }
     // Check if there are empty fields or checkbox not checked
		 if(empty || checked === 0){
		   if(empty){
			   displayError('text');
			 }
		   if(checked === 0){
			   displayError('check');
			 }
		 }
		 else{
			 var formInfo = {};
			 var labels = ['name', 'institution', 'country'];
			 textInputs.each(function(i){
				 formInfo[labels[i]] = ($(this).val());
			 });
			 uploadValues(formInfo);
			 setCookie();
			 overlay.addClass('hidden');
			 container.addClass('hidden');
		 }
	 });

	 function cookieExists() {
		 var exists = false;
		 var cookies = document.cookie.split(';');
		 for(var i = 0; i < cookies.length; i++) {
			 if(cookies[i].trim() == "agreed=yes") {
				 exists = true;
				 break;
			 }
			 //console.log(cookies[i]);
		 }
		 return exists;
	 }

	 function setCookie() {
		 var today = new Date();
		 var oneYear = new Date();
		 oneYear.setFullYear(today.getFullYear() + 1);
		 var expires = "expires=" + oneYear;
		 document.cookie = "agreed=yes; " + expires;
	 }

	 function loadLanguage(lang){
		 terms.empty();
		 terms.load(path + lang);
	 }

	 // Check for empty text input
	 function emptyVals(text){
		 var flag = false;
		 text.each(function(){
		   if($(this).val() === null || $(this).val() ==""){
			   flag = true;
			 }
		 });
		 return flag;
	 }

	 // Display an error pertaining to text input or checkbox
	 function displayError(type){
		 warning.removeClass('hidden');
		 switch(type){
			 case 'text':
			   warning.append('<p>You must fill in all fields!</p>');
			   break;
			 case 'check':
			   warning.append("<p>You must click <strong>I accept the terms</strong> to proceed</p>");
			   break;
		 }
	 }

	 // Use XHR to upload input values to database
	 function uploadValues(values){
		 $.ajax({
				url: '/templates/rt_terrantribune_j15/bsts/bsts.php',
				data: values,
				complete: function(jqxhr, xhrStatus){
					console.log(xhrStatus);
				}
			});
	 }


	 function layoutSetup(){
		 var containerPos = (doc.width() / 2) - (container.width() / 2);
		 overlay.remove();
		 container.remove();
		 page.append(overlay);
		 page.append(container);
		 overlay.height(doc.height());
		 container.css({'left':containerPos});
	 }
 });
})(jQuery);
