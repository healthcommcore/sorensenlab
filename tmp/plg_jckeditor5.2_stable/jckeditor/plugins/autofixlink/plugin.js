CKEDITOR.plugins.add("autofixlink",{init:function(a){},afterInit:function(a){var b=a.dataProcessor,c=b&&b.htmlFilter;if(c){c.addRules({elements:{a:function(a){if(a.attributes._cke_saved_href){var b=a.attributes._cke_saved_href;if(b.indexOf("www.")!=-1&&!b.match(/^http/)){a.attributes._cke_saved_href="http://"+b}}return a}}})}}})