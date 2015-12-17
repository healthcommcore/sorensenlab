(function($){
 var doc = $(document);
 doc.ready(function(){
	 var page = $('#page-bg');
	 var overlay = $('#agreement_overlay');
	 var container = $('#agreement_container');
	 var warning = $('#warning');
	 var content = $('#agreement_content');
	 var terms = $('#accept_terms');
	 var path = '/templates/rt_terrantribune_new/bsts/terms.html #';
	 var language;
			 
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
			   content.empty();
			   language = getLanguage($(this));
			   setPopupText(language);
				 overlay.removeClass('hidden');
				 container.removeClass('hidden');
				 if(warning.length > 0){
					 warning.empty();
					 warning.addClass('hidden');
				 }
				 return false;
			 }
	   });
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
			   displayError('text', language);
			 }
		   if(checked === 0){
			   displayError('check', language);
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
		 var pText = popupText(language);
		 warning.removeClass('hidden');
		 if(warning.hasClass('hindi')){
		   warning.removeClass('hindi');
		 }
		 if(language == 'hindi'){
			 warning.addClass('hindi');
		 }
		 switch(type){
			 case 'text':
			   warning.append(pText.alerts.text);
			   break;
			 case 'check':
			   warning.append(pText.alerts.check);
			   break;
		 }
	 }

	 // Use XHR to upload input values to database
	 function uploadValues(values){
		 $.ajax({
				url: '/templates/rt_terrantribune_new/bsts/bsts.php',
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

	 function getLanguage(link){
		 return (link.hasClass('hindi') ? 'hindi' : 'english');
	 }

	 function setPopupText(language){
		 var termsText;
		 var allInputs = {};
		 allInputs.title = $('#terms_of_use');
		 allInputs.name = $('#name');
		 allInputs.institution = $('#institution');
		 allInputs.country = $('#country');
		 allInputs.accept = $('#check');
		 allInputs.cont = $('#accept_button');
		 termsText = popupText(language);
		 $.each(allInputs, function(key, value){
		   allInputs[key].removeClass('hindi');
			 allInputs[key].empty();
			 if(language == 'hindi'){
			   allInputs[key].addClass('hindi');
			 }
		   allInputs[key].append(termsText[key]);
		 });
     content.load(path + language);
	 }

	 function popupText(language){
		 var english = {
			 title: 'Terms of Use',
			 name: 'Name: ',
			 institution: 'Institution: ',
			 country: 'Country: ',
			 accept: 'I accept ',
			 cont: 'Continue ',
			 alerts: {
         text: '<p>You must fill in all fields!</p>',
				 check: '<p>You must click <strong>I accept the terms</strong> to proceed</p>'
			 }
		 };

    var hindi = {
			 title: ']pyaaoga kI Sato-',
			 name: 'naama: ',
			 institution: 'saMsqaa: ',
			 country: 'doSa: ',
			 accept: 'maOM [na Sata-oM kao svaIkar krtaÀkrtI hU^M È',
			 cont: 'jaarI',
			 alerts: {
         text: '<p>saBaI sqaana Àxao~ Barnaa Aapko ilae Ainavaaya- hOM È</p>',
				 check: '<p>Aapakao Aagao baZnao ko ilae <strong>maOM [na Sata-oM kao svaIkar krtaÀkrtI hU^M</strong> Par i@lak krnaa Ainavaaya- hOM È</p>'
			 }
		 };
		 return (language == 'hindi' ? hindi : english);
  }


 });
})(jQuery);
